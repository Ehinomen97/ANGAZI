"use client";

import { useState } from "react";
import { Loader2, X } from "lucide-react";
import { WORKER_CATEGORIES } from "@/types/database";
import { NIGERIAN_STATES } from "@/lib/nigeria";

export default function PostJobForm({ onClose, onPosted }: { onClose: () => void; onPosted: () => void }) {
  const [title, setTitle] = useState("");
  const [trade, setTrade] = useState(WORKER_CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [state, setState] = useState(NIGERIAN_STATES[0]);
  const [lga, setLga] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, trade, description, state, lga, budget }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      onPosted();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/50 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-lg rounded-xl2 bg-white p-8 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="focus-ring absolute right-4 top-4 rounded-full p-1.5 text-ink/50 hover:bg-mist hover:text-ink"
        >
          <X size={18} />
        </button>
        <h2 className="text-xl font-semibold text-ink">Post a Job</h2>
        <p className="mt-1 text-sm text-ink/60">Describe the work you need done.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-ink">Job Title</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Fix leaking bathroom pipes"
              className="focus-ring mt-1.5 w-full rounded-xl border border-ink/15 p-3 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-ink">Trade Needed</label>
              <select
                value={trade}
                onChange={(e) => setTrade(e.target.value)}
                className="focus-ring mt-1.5 w-full rounded-xl border border-ink/15 p-3 text-sm"
              >
                {WORKER_CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-ink">Budget (optional)</label>
              <input
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. ₦15,000"
                className="focus-ring mt-1.5 w-full rounded-xl border border-ink/15 p-3 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-ink">State</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="focus-ring mt-1.5 w-full rounded-xl border border-ink/15 p-3 text-sm"
              >
                {NIGERIAN_STATES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-ink">LGA / Area</label>
              <input
                required
                value={lga}
                onChange={(e) => setLga(e.target.value)}
                placeholder="e.g. Ikeja"
                className="focus-ring mt-1.5 w-full rounded-xl border border-ink/15 p-3 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-ink">Description</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Give as much detail as you can…"
              className="focus-ring mt-1.5 w-full rounded-xl border border-ink/15 p-3 text-sm"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="focus-ring flex w-full items-center justify-center gap-2 rounded-xl bg-forest py-3 text-sm font-semibold text-white transition hover:bg-forest-dark disabled:opacity-60"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
}
