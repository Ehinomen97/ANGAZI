"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Download, BadgeCheck, Check, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Worker } from "@/types/database";

const STATUS_TABS = ["all", "pending", "approved", "rejected"] as const;

export default function AdminWorkersPage() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_TABS)[number]>("all");

  async function fetchWorkers() {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("workers")
      .select("*")
      .order("created_at", { ascending: false });
    setWorkers(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    fetchWorkers();
  }, []);

  async function updateStatus(id: string, status: "approved" | "rejected") {
    const supabase = createClient();
    await supabase.from("workers").update({ status }).eq("id", id);
    setWorkers((prev) => prev.map((w) => (w.id === id ? { ...w, status } : w)));
  }

  async function toggleVerified(id: string, verified: boolean) {
    const supabase = createClient();
    await supabase.from("workers").update({ verified: !verified }).eq("id", id);
    setWorkers((prev) => prev.map((w) => (w.id === id ? { ...w, verified: !verified } : w)));
  }

  const filtered = useMemo(() => {
    return workers.filter((w) => {
      const matchesStatus = statusFilter === "all" || w.status === statusFilter;
      const matchesSearch =
        !search.trim() ||
        w.full_name.toLowerCase().includes(search.toLowerCase()) ||
        w.trade.toLowerCase().includes(search.toLowerCase()) ||
        w.state.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [workers, statusFilter, search]);

  function exportCsv() {
    const header = ["Name", "Trade", "Experience", "State", "LGA", "Status", "Verified", "Joined"];
    const rows = filtered.map((w) => [
      w.full_name,
      w.trade,
      String(w.experience_years),
      w.state,
      w.lga,
      w.status,
      w.verified ? "Yes" : "No",
      new Date(w.created_at).toLocaleDateString(),
    ]);
    const csv = [header, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "angazi-workers.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">Workers</h1>
          <p className="mt-1 text-sm text-ink/55">Approve, reject and verify worker profiles.</p>
        </div>
        <button
          onClick={exportCsv}
          className="focus-ring flex items-center gap-2 rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-mist"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 rounded-xl border border-ink/15 bg-white px-3 py-2.5 sm:w-72">
          <Search size={16} className="text-ink/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, trade, state…"
            className="focus-ring w-full border-0 bg-transparent text-sm focus-visible:ring-0"
          />
        </div>
        <div className="flex gap-2">
          {STATUS_TABS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`focus-ring rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition ${
                statusFilter === s ? "bg-forest text-white" : "bg-white text-ink/60 hover:bg-mist"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-ink/[0.06] bg-white shadow-card">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-ink/[0.06] text-xs uppercase tracking-wide text-ink/45">
            <tr>
              <th className="px-5 py-3.5">Name</th>
              <th className="px-5 py-3.5">Trade</th>
              <th className="px-5 py-3.5">Location</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5">Verified</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/[0.05]">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-ink/40">
                  Loading…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-ink/40">
                  No workers found.
                </td>
              </tr>
            ) : (
              filtered.map((w) => (
                <tr key={w.id}>
                  <td className="px-5 py-3.5 font-medium text-ink">{w.full_name}</td>
                  <td className="px-5 py-3.5 text-ink/70">{w.trade}</td>
                  <td className="px-5 py-3.5 text-ink/70">
                    {w.lga}, {w.state}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                        w.status === "approved"
                          ? "bg-lime/20 text-forest"
                          : w.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {w.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => toggleVerified(w.id, w.verified)}
                      className={`focus-ring flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                        w.verified ? "bg-forest text-white" : "bg-mist text-ink/50"
                      }`}
                    >
                      <BadgeCheck size={13} /> {w.verified ? "Verified" : "Unverified"}
                    </button>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => updateStatus(w.id, "approved")}
                        disabled={w.status === "approved"}
                        className="focus-ring flex items-center gap-1 rounded-lg bg-forest px-2.5 py-1.5 text-xs font-semibold text-white disabled:opacity-40"
                      >
                        <Check size={13} /> Approve
                      </button>
                      <button
                        onClick={() => updateStatus(w.id, "rejected")}
                        disabled={w.status === "rejected"}
                        className="focus-ring flex items-center gap-1 rounded-lg border border-ink/15 px-2.5 py-1.5 text-xs font-semibold text-ink disabled:opacity-40"
                      >
                        <X size={13} /> Reject
                      </button>
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
