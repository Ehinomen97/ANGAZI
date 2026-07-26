"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import WorkerCard from "@/components/WorkerCard";
import { WORKER_CATEGORIES } from "@/types/database";
import type { WorkerWithProfile } from "@/types/database";

function FindWorkersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [workers, setWorkers] = useState<WorkerWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const [query, setQuery] = useState(q);

  useEffect(() => {
    setQuery(q);
  }, [q]);

  useEffect(() => {
    let active = true;
    async function fetchWorkers() {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      let request = supabase
        .from("workers")
        .select(
          "id, full_name, trade, experience_years, state, lga, bio, photo_url, availability, status, verified, rating, created_at"
        )
        .eq("status", "approved")
        .order("verified", { ascending: false })
        .order("created_at", { ascending: false });

      if (category) request = request.eq("trade", category);
      if (q) request = request.or(`trade.ilike.%${q}%,state.ilike.%${q}%,lga.ilike.%${q}%,full_name.ilike.%${q}%`);

      const { data, error } = await request;
      if (!active) return;
      if (error) {
        setError(error.message);
      } else {
        setWorkers((data ?? []) as unknown as WorkerWithProfile[]);
      }
      setLoading(false);
    }
    fetchWorkers();
    return () => {
      active = false;
    };
  }, [q, category]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (category) params.set("category", category);
    router.push(`/find-workers${params.toString() ? `?${params}` : ""}`);
  }

  function setCategory(next: string) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (next) params.set("category", next);
    router.push(`/find-workers${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <div className="bg-mist/40 py-14">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Find Trusted Workers
          </h1>
          <p className="mt-3 text-ink/60">
            Browse verified skilled and unskilled workers across Nigeria.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-2xl bg-white p-2 shadow-card"
        >
          <Search className="ml-3 shrink-0 text-ink/40" size={20} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for Carpenter, Plumber, Mason…"
            aria-label="Search workers"
            className="focus-ring h-11 w-full rounded-xl border-0 bg-transparent text-sm text-ink placeholder:text-ink/40 focus-visible:ring-0"
          />
          <button
            type="submit"
            className="focus-ring shrink-0 rounded-xl bg-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-forest-dark"
          >
            Search
          </button>
        </form>

        <div className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-2">
          <span className="flex items-center gap-1 text-xs font-medium text-ink/50">
            <SlidersHorizontal size={14} /> Filter:
          </span>
          <button
            onClick={() => setCategory("")}
            className={`focus-ring rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
              !category ? "bg-forest text-white" : "bg-white text-ink/70 hover:bg-mist"
            }`}
          >
            All Trades
          </button>
          {WORKER_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`focus-ring rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                category === c ? "bg-forest text-white" : "bg-white text-ink/70 hover:bg-mist"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {loading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-48 animate-pulse rounded-2xl bg-white/70" />
              ))}
            </div>
          ) : error ? (
            <p className="text-center text-sm text-red-600">
              Couldn&rsquo;t load workers: {error}
            </p>
          ) : workers.length === 0 ? (
            <p className="text-center text-sm text-ink/50">
              No workers match your search yet. Try a different trade or
              location.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {workers.map((worker) => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FindWorkersPage() {
  return (
    <Suspense fallback={null}>
      <FindWorkersContent />
    </Suspense>
  );
}
