"use client";

import { useEffect, useState } from "react";
import { Briefcase, MapPin, Wallet, Plus, Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import PostJobForm from "@/components/PostJobForm";
import type { Job } from "@/types/database";

export default function FindWorkPage() {
  const { requireAuth } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPostForm, setShowPostForm] = useState(false);
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());

  async function fetchJobs() {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("jobs")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false });
    setJobs(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  function handlePostJobClick() {
    if (!requireAuth("post a job")) return;
    setShowPostForm(true);
  }

  async function handleApply(jobId: string) {
    if (!requireAuth("apply for this job")) return;
    setApplyingId(jobId);
    try {
      const res = await fetch("/api/job-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setAppliedIds((prev) => new Set(prev).add(jobId));
    } catch {
      // Non-worker accounts or duplicate applications fail silently here;
      // the button text communicates the outcome.
    } finally {
      setApplyingId(null);
    }
  }

  return (
    <div className="bg-mist/40 py-14">
      <div className="container-page">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Find Meaningful Work
            </h1>
            <p className="mt-3 text-ink/60">
              Browse jobs posted by employers across Nigeria.
            </p>
          </div>
          <button
            onClick={handlePostJobClick}
            className="focus-ring flex items-center gap-2 rounded-2xl bg-lime px-6 py-3.5 text-sm font-bold text-forest shadow-soft transition hover:brightness-95"
          >
            <Plus size={18} /> Post a Job
          </button>
        </div>

        <div className="mt-10">
          {loading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-44 animate-pulse rounded-2xl bg-white/70" />
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <p className="text-center text-sm text-ink/50">
              No jobs posted yet. Check back soon, or post one yourself.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="flex flex-col rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card"
                >
                  <span className="inline-flex w-fit items-center gap-1 rounded-full bg-mist px-2.5 py-1 text-xs font-medium text-forest">
                    <Briefcase size={12} /> {job.trade}
                  </span>
                  <h3 className="mt-3 font-semibold text-ink">{job.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-ink/60">{job.description}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-ink/50">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {job.lga}, {job.state}
                    </span>
                    {job.budget && (
                      <span className="flex items-center gap-1">
                        <Wallet size={12} /> {job.budget}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleApply(job.id)}
                    disabled={applyingId === job.id || appliedIds.has(job.id)}
                    className="focus-ring mt-5 flex items-center justify-center gap-2 rounded-xl bg-forest py-2.5 text-sm font-semibold text-white transition hover:bg-forest-dark disabled:opacity-60"
                  >
                    {applyingId === job.id && <Loader2 size={15} className="animate-spin" />}
                    {appliedIds.has(job.id) ? (
                      <>
                        <CheckCircle2 size={15} /> Applied
                      </>
                    ) : (
                      "Apply for Work"
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showPostForm && (
        <PostJobForm
          onClose={() => setShowPostForm(false)}
          onPosted={() => {
            setShowPostForm(false);
            fetchJobs();
          }}
        />
      )}
    </div>
  );
}
