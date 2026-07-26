# Angazi Concepts

**Build Trust. Deliver Excellence.**
Connecting People. Creating Opportunities.

A production-ready Next.js 15 (App Router) web app for Angazi Concepts —
Nigeria's platform for finding trusted workers and finding meaningful work.

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Supabase (Auth + Postgres + Row Level Security)
- Deployed on Vercel

## 1. Install dependencies

```bash
npm install
```

## 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. In the SQL Editor, run the entire contents of `supabase/schema.sql`.
   This creates all tables, enums, RLS policies, and the
   `get_worker_contact` RPC used to gate contact-info reveals behind login.
3. In **Project Settings → API**, copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key (server-only — never expose to the client)

## 3. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in the three Supabase values:

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## 4. Create your first admin user

Sign up normally as any role from `/signup`, then in the Supabase SQL editor run:

```sql
update profiles set role = 'admin' where email = 'you@angaziconcepts.com';
```

Log in at `/admin-login` with that account's email + password.

## 5. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 6. Deploy to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add the same three environment variables in **Project Settings → Environment Variables**.
4. Deploy. Point `angaziconcepts.com` at the Vercel deployment as you already have it configured.

## How authentication gating works

Guests can browse everything — homepage, worker directory, job listings,
About, Contact — without an account. The moment they try to:

- Contact or hire a worker
- Apply for a job
- Post a job
- Become an Angazi Agent

the app calls `requireAuth()` (see `src/hooks/useAuth.tsx`), which opens the
**"Create your free Angazi account to continue"** modal instead of letting
the action through. Once they sign up or log in, the original action
naturally becomes available again.

Worker phone/email are never exposed through a direct public query — they're
only returned by the `get_worker_contact` Postgres function, which checks
`auth.uid() is not null` before returning anything.

## Admin dashboard

`/admin-login` → `/admin` (protected by a server-side role check in
`src/app/admin/layout.tsx`). From there you can:

- Approve / reject / verify workers, with search, filtering and CSV export
- Approve / reject employers and Field Agent applications
- Read and manage contact form submissions

## Project structure

```
src/
  app/                 Routes (App Router)
    admin/              Protected admin dashboard
    admin-login/        Public admin sign-in (kept outside admin/ to avoid a redirect loop)
    api/                 Route handlers (register, contact, jobs, hire/job requests)
    find-workers/ find-work/ become-agent/ about/ contact/
    login/ signup/ reset-password/
    worker/[id]/         Public worker profile
  components/           Reusable UI (Navbar, Footer, cards, forms, admin/, signup/)
  hooks/                useAuth (auth + gate modal), useRegister
  lib/supabase/         Browser, server and service-role Supabase clients
  types/database.ts     Shared TypeScript types + the 12 worker categories
supabase/schema.sql     Full DB schema, RLS policies, and the contact-reveal RPC
```

## Known follow-ups for a future version

- Email notifications (worker approved, job application received, etc.) — not wired up yet; Supabase Auth emails (confirmation/reset) work out of the box, but transactional notifications need a provider like Resend.
- Worker photo upload — `photo_url` exists on the schema; wiring up Supabase Storage is the next step.
- Ratings & reviews, the Marketplace, and payments are intentionally out of scope for V1 (see the roadmap in the Founder Bible).
