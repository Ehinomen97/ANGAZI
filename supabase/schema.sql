-- ============================================================
-- ANGAZI CONCEPTS — DATABASE SCHEMA
-- Run this in the Supabase SQL editor for a new project.
-- ============================================================

create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------
-- ENUM TYPES
-- ------------------------------------------------------------
create type user_role as enum ('worker', 'employer', 'agent', 'admin');
create type approval_status as enum ('pending', 'approved', 'rejected');
create type availability_status as enum ('available', 'busy', 'unavailable');

-- ------------------------------------------------------------
-- PROFILES (1:1 with auth.users)
-- ------------------------------------------------------------
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null,
  full_name text not null,
  phone text not null,
  email text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- WORKERS
-- ------------------------------------------------------------
create table workers (
  id uuid primary key references profiles(id) on delete cascade,
  full_name text not null,
  trade text not null,
  experience_years int not null default 0,
  state text not null,
  lga text not null,
  bio text,
  photo_url text,
  availability availability_status not null default 'available',
  status approval_status not null default 'pending',
  verified boolean not null default false,
  rating numeric(2,1) default 0,
  created_at timestamptz not null default now()
);

create index workers_trade_idx on workers (trade);
create index workers_state_idx on workers (state);
create index workers_status_idx on workers (status);

-- ------------------------------------------------------------
-- EMPLOYERS
-- ------------------------------------------------------------
create table employers (
  id uuid primary key references profiles(id) on delete cascade,
  company_name text,
  state text not null,
  lga text not null,
  status approval_status not null default 'approved',
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- AGENTS
-- ------------------------------------------------------------
create table agents (
  id uuid primary key references profiles(id) on delete cascade,
  state text not null,
  lga text not null,
  motivation text,
  status approval_status not null default 'pending',
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- JOBS (posted by employers)
-- ------------------------------------------------------------
create table jobs (
  id uuid primary key default uuid_generate_v4(),
  employer_id uuid not null references employers(id) on delete cascade,
  title text not null,
  trade text not null,
  description text not null,
  state text not null,
  lga text not null,
  budget text,
  status approval_status not null default 'approved',
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- JOB APPLICATIONS (worker applies to a job)
-- ------------------------------------------------------------
create table job_applications (
  id uuid primary key default uuid_generate_v4(),
  job_id uuid not null references jobs(id) on delete cascade,
  worker_id uuid not null references workers(id) on delete cascade,
  message text,
  created_at timestamptz not null default now(),
  unique (job_id, worker_id)
);

-- ------------------------------------------------------------
-- CONTACT SUBMISSIONS (public contact form)
-- ------------------------------------------------------------
create table contact_submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz not null default now(),
  read boolean not null default false
);

-- ------------------------------------------------------------
-- WORKER <-> HIRE REQUESTS (contact a worker / hire worker)
-- ------------------------------------------------------------
create table hire_requests (
  id uuid primary key default uuid_generate_v4(),
  worker_id uuid not null references workers(id) on delete cascade,
  employer_id uuid not null references employers(id) on delete cascade,
  message text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table profiles enable row level security;
alter table workers enable row level security;
alter table employers enable row level security;
alter table agents enable row level security;
alter table jobs enable row level security;
alter table job_applications enable row level security;
alter table contact_submissions enable row level security;
alter table hire_requests enable row level security;

-- Helper: is the current user an admin?
create or replace function is_admin()
returns boolean as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;

-- PROFILES: strictly private. The public worker directory reads workers.full_name
-- (denormalized) instead of joining profiles, so guests never touch this table.
create policy "profiles: self read" on profiles for select using (auth.uid() = id or is_admin());
create policy "profiles: self insert" on profiles for insert with check (auth.uid() = id);
create policy "profiles: self update" on profiles for update using (auth.uid() = id or is_admin());

-- WORKERS: anyone can read approved workers (public directory);
-- owner can read/update their own row regardless of status; admin has full access.
create policy "workers: public read approved" on workers for select using (status = 'approved' or auth.uid() = id or is_admin());
create policy "workers: self insert" on workers for insert with check (auth.uid() = id);
create policy "workers: self or admin update" on workers for update using (auth.uid() = id or is_admin());
create policy "workers: admin delete" on workers for delete using (is_admin());

-- EMPLOYERS
create policy "employers: self or admin read" on employers for select using (auth.uid() = id or is_admin());
create policy "employers: self insert" on employers for insert with check (auth.uid() = id);
create policy "employers: self or admin update" on employers for update using (auth.uid() = id or is_admin());

-- AGENTS
create policy "agents: self or admin read" on agents for select using (auth.uid() = id or is_admin());
create policy "agents: self insert" on agents for insert with check (auth.uid() = id);
create policy "agents: self or admin update" on agents for update using (auth.uid() = id or is_admin());

-- JOBS: public can read approved jobs; employer manages own; admin all
create policy "jobs: public read approved" on jobs for select using (status = 'approved' or auth.uid() = employer_id or is_admin());
create policy "jobs: employer insert" on jobs for insert with check (auth.uid() = employer_id);
create policy "jobs: owner or admin update" on jobs for update using (auth.uid() = employer_id or is_admin());
create policy "jobs: owner or admin delete" on jobs for delete using (auth.uid() = employer_id or is_admin());

-- JOB APPLICATIONS: worker applies to own name, worker/employer(job owner)/admin can read
create policy "job_applications: worker insert" on job_applications for insert with check (auth.uid() = worker_id);
create policy "job_applications: participant read" on job_applications for select using (
  auth.uid() = worker_id
  or is_admin()
  or exists (select 1 from jobs j where j.id = job_applications.job_id and j.employer_id = auth.uid())
);

-- CONTACT SUBMISSIONS: anyone can insert (public form); only admin can read
create policy "contact: public insert" on contact_submissions for insert with check (true);
create policy "contact: admin read" on contact_submissions for select using (is_admin());
create policy "contact: admin update" on contact_submissions for update using (is_admin());
create policy "contact: admin delete" on contact_submissions for delete using (is_admin());

-- HIRE REQUESTS: employer creates, worker + employer + admin can read
create policy "hire_requests: participant insert" on hire_requests for insert with check (auth.uid() = employer_id);
create policy "hire_requests: participant read" on hire_requests for select using (auth.uid() = worker_id or auth.uid() = employer_id or is_admin());

-- ============================================================
-- CONTACT REVEAL: any authenticated user may reveal an approved worker's
-- phone/email (the "must log in to contact a worker" rule). Anonymous
-- callers get no rows back, and profiles' phone/email are never exposed
-- through direct table access.
-- ============================================================
create or replace function get_worker_contact(p_worker_id uuid)
returns table(phone text, email text) as $$
  select pr.phone, pr.email
  from profiles pr
  join workers w on w.id = pr.id
  where w.id = p_worker_id
    and w.status = 'approved'
    and auth.uid() is not null;
$$ language sql security definer stable;

grant execute on function get_worker_contact(uuid) to authenticated, anon;

-- ============================================================
-- SEED: first admin (run manually after creating your own admin user)
-- update profiles set role = 'admin' where email = 'you@angaziconcepts.com';
-- ============================================================
