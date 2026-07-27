"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Agent } from "@/types/database";

export default function AdminAgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from("agents")
        .select("*")
        .order("created_at", { ascending: false });
      setAgents(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  async function updateStatus(id: string, status: "approved" | "rejected") {
    const supabase = createClient();
await supabase
  .from("agents")
  .update({ status: status } as never)
  .eq("id", id);
    
   setAgents((prev) => 
     prev.map((a) => (a.id === id ? { ...a, status } : a))
     );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Agents</h1>
      <p className="mt-1 text-sm text-ink/55">Review and approve Field Agent applications.</p>

      <div className="mt-6 space-y-4">
        {loading ? (
          <p className="text-sm text-ink/40">Loading…</p>
        ) : agents.length === 0 ? (
          <p className="text-sm text-ink/40">No agent applications yet.</p>
        ) : (
          agents.map((a) => (
            <div key={a.id} className="rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-ink">{a.lga}, {a.state}</p>
                  <span className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                    a.status === "approved" ? "bg-lime/20 text-forest" : a.status === "rejected" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {a.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => updateStatus(a.id, "approved")} disabled={a.status === "approved"} className="focus-ring rounded-lg bg-forest px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-40">Approve</button>
                  <button onClick={() => updateStatus(a.id, "rejected")} disabled={a.status === "rejected"} className="focus-ring rounded-lg border border-ink/15 px-3 py-1.5 text-xs font-semibold text-ink disabled:opacity-40">Reject</button>
                </div>
              </div>
              {a.motivation && <p className="mt-3 text-sm text-ink/65">{a.motivation}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
