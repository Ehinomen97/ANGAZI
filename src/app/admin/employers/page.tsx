"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Employer } from "@/types/database";

export default function AdminEmployersPage() {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from("employers")
        .select("*")
        .order("created_at", { ascending: false });
      setEmployers(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  async function updateStatus(id: string, status: "approved" | "rejected") {
    const supabase = createClient();
    await supabase.from("employers").update({ status }).eq("id", id);
    setEmployers((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Employers</h1>
      <p className="mt-1 text-sm text-ink/55">Manage registered employer accounts.</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-ink/[0.06] bg-white shadow-card">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-ink/[0.06] text-xs uppercase tracking-wide text-ink/45">
            <tr>
              <th className="px-5 py-3.5">Company</th>
              <th className="px-5 py-3.5">Location</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/[0.05]">
            {loading ? (
              <tr><td colSpan={4} className="px-5 py-8 text-center text-ink/40">Loading…</td></tr>
            ) : employers.length === 0 ? (
              <tr><td colSpan={4} className="px-5 py-8 text-center text-ink/40">No employers yet.</td></tr>
            ) : (
              employers.map((e) => (
                <tr key={e.id}>
                  <td className="px-5 py-3.5 font-medium text-ink">{e.company_name || "—"}</td>
                  <td className="px-5 py-3.5 text-ink/70">{e.lga}, {e.state}</td>
                  <td className="px-5 py-3.5">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                      e.status === "approved" ? "bg-lime/20 text-forest" : e.status === "rejected" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => updateStatus(e.id, "approved")} disabled={e.status === "approved"} className="focus-ring rounded-lg bg-forest px-2.5 py-1.5 text-xs font-semibold text-white disabled:opacity-40">Approve</button>
                      <button onClick={() => updateStatus(e.id, "rejected")} disabled={e.status === "rejected"} className="focus-ring rounded-lg border border-ink/15 px-2.5 py-1.5 text-xs font-semibold text-ink disabled:opacity-40">Reject</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
