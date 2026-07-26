export type UserRole = "worker" | "employer" | "agent" | "admin";
export type ApprovalStatus = "pending" | "approved" | "rejected";
export type AvailabilityStatus = "available" | "busy" | "unavailable";

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  phone: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Worker {
  id: string;
  full_name: string;
  trade: string;
  experience_years: number;
  state: string;
  lga: string;
  bio: string | null;
  photo_url: string | null;
  availability: AvailabilityStatus;
  status: ApprovalStatus;
  verified: boolean;
  rating: number;
  created_at: string;
}

// Kept as an alias so components can be upgraded later without a rename.
export type WorkerWithProfile = Worker;

export interface WorkerContact {
  phone: string;
  email: string;
}

export interface Employer {
  id: string;
  company_name: string | null;
  state: string;
  lga: string;
  status: ApprovalStatus;
  created_at: string;
}

export interface Agent {
  id: string;
  state: string;
  lga: string;
  motivation: string | null;
  status: ApprovalStatus;
  created_at: string;
}

export interface Job {
  id: string;
  employer_id: string;
  title: string;
  trade: string;
  description: string;
  state: string;
  lga: string;
  budget: string | null;
  status: ApprovalStatus;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
  read: boolean;
}

export interface JobApplication {
  id: string;
  job_id: string;
  worker_id: string;
  message: string | null;
  created_at: string;
}

export const WORKER_CATEGORIES = [
  "Carpenter",
  "Mason",
  "Electrician",
  "Plumber",
  "Welder",
  "Painter",
  "Tiler",
  "POP Installer",
  "Iron Bender",
  "General Labour",
  "Cleaner",
  "Apprentice",
] as const;

export type WorkerCategory = (typeof WORKER_CATEGORIES)[number];

// Minimal Database type so the Supabase client stays strongly typed
// without hand-writing the full generated schema.
export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Partial<Profile> & { id: string; role: UserRole; full_name: string; phone: string; email: string }; Update: Partial<Profile> };
      workers: { Row: Worker; Insert: Partial<Worker> & { id: string; full_name: string; trade: string; state: string; lga: string }; Update: Partial<Worker> };
      employers: { Row: Employer; Insert: Partial<Employer> & { id: string; state: string; lga: string }; Update: Partial<Employer> };
      agents: { Row: Agent; Insert: Partial<Agent> & { id: string; state: string; lga: string }; Update: Partial<Agent> };
      jobs: { Row: Job; Insert: Partial<Job> & { employer_id: string; title: string; trade: string; description: string; state: string; lga: string }; Update: Partial<Job> };
      contact_submissions: { Row: ContactSubmission; Insert: Partial<ContactSubmission> & { name: string; email: string; message: string }; Update: Partial<ContactSubmission> };
      job_applications: { Row: JobApplication; Insert: Partial<JobApplication> & { job_id: string; worker_id: string }; Update: Partial<JobApplication> };
    };
    Functions: {
      get_worker_contact: {
        Args: { p_worker_id: string };
        Returns: WorkerContact[];
      };
    };
  };
}
