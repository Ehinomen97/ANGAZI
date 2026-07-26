"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { ContactSubmission } from "@/types/database";

export default function AdminContactsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const supabase = createClient();
    const { data } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    setSubmissions(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function markRead(id: string) {
    const supabase = createClient();
    await supabase.from("contact_submissions").update({ read: true }).eq("id", id);
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, read: true } : s)));
  }

  async function remove(id: string) {
    const supabase = createClient();
    await supabase.from("contact_submissions").delete().eq("id", id);
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Contact Submissions</h1>
      <p className="mt-1 text-sm text-ink/55">Messages sent through the public contact form.</p>

      <div className="mt-6 space-y-4">
        {loading ? (
          <p className="text-sm text-ink/40">Loading…</p>
        ) : submissions.length === 0 ? (
          <p className="text-sm text-ink/40">No messages yet.</p>
        ) : (
          submissions.map((s) => (
            <div
              key={s.id}
              onClick={() => !s.read && markRead(s.id)}
              className={`cursor-pointer rounded-2xl border p-6 shadow-card transition ${
                s.read ? "border-ink/[0.06] bg-white" : "border-lime bg-lime/5"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-ink">
                    {s.name}{" "}
                    {!s.read && (
                      <span className="ml-1 rounded-full bg-lime px-2 py-0.5 text-[0.65rem] font-bold uppercase text-forest">
                        New
                      </span>
                    )}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-ink/50">
                    <span className="flex items-center gap-1">
                      <Mail size={12} /> {s.email}
                    </span>
                    {s.phone && (
                      <span className="flex items-center gap-1">
                        <Phone size={12} /> {s.phone}
                      </span>
                    )}
                    <span>{new Date(s.created_at).toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(s.id);
                  }}
                  aria-label="Delete message"
                  className="focus-ring rounded-lg p-2 text-ink/40 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="mt-3 text-sm text-ink/70">{s.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
