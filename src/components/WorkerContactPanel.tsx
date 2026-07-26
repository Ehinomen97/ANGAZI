"use client";

import { useState } from "react";
import { Phone, Mail, Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { WorkerContact } from "@/types/database";

export default function WorkerContactPanel({
  workerId,
  workerName,
}: {
  workerId: string;
  workerName: string;
}) {
  const { requireAuth, user } = useAuth();
  const [contact, setContact] = useState<WorkerContact | null>(null);
  const [revealing, setRevealing] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleReveal() {
    if (!requireAuth(`view ${workerName}'s contact details`)) return;
    setRevealing(true);
    setError(null);
    const supabase = createClient();
    const { data, error } = await supabase.rpc("get_worker_contact", {
      p_worker_id: workerId,
    });
    setRevealing(false);
    if (error) {
      setError(error.message);
      return;
    }
    const row = Array.isArray(data) ? data[0] : data;
    if (row) setContact(row as WorkerContact);
  }

  async function handleHire(e: React.FormEvent) {
    e.preventDefault();
    if (!requireAuth(`hire ${workerName}`)) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/hire-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workerId, message }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setSent(true);
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div id="hire" className="rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card">
      <h2 className="font-semibold text-ink">Contact {workerName}</h2>

      <div className="mt-4">
        {contact ? (
          <div className="space-y-2 rounded-xl bg-mist p-4 text-sm">
            <a href={`tel:${contact.phone}`} className="focus-ring flex items-center gap-2 font-medium text-forest hover:underline">
              <Phone size={16} /> {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="focus-ring flex items-center gap-2 font-medium text-forest hover:underline">
              <Mail size={16} /> {contact.email}
            </a>
          </div>
        ) : (
          <button
            onClick={handleReveal}
            disabled={revealing}
            className="focus-ring flex w-full items-center justify-center gap-2 rounded-xl border border-ink/15 py-3 text-sm font-semibold text-ink transition hover:bg-mist disabled:opacity-60"
          >
            {revealing ? <Loader2 size={16} className="animate-spin" /> : <Phone size={16} />}
            Reveal Phone &amp; Email
          </button>
        )}
      </div>

      <div className="my-5 border-t border-ink/[0.06]" />

      {sent ? (
        <div className="flex items-center gap-2 rounded-xl bg-lime/15 p-4 text-sm font-medium text-forest">
          <CheckCircle2 size={18} /> Hire request sent — {workerName} will be notified.
        </div>
      ) : (
        <form onSubmit={handleHire} className="space-y-3">
          <label htmlFor="hire-message" className="text-sm font-medium text-ink">
            Send a hire request
          </label>
          <textarea
            id="hire-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Briefly describe the job you need help with…"
            rows={3}
            className="focus-ring w-full rounded-xl border border-ink/15 p-3 text-sm text-ink placeholder:text-ink/40"
          />
          <button
            type="submit"
            disabled={sending}
            className="focus-ring flex w-full items-center justify-center gap-2 rounded-xl bg-forest py-3 text-sm font-semibold text-white transition hover:bg-forest-dark disabled:opacity-60"
          >
            {sending && <Loader2 size={16} className="animate-spin" />}
            Hire Worker
          </button>
          {!user && (
            <p className="text-center text-xs text-ink/45">
              You&rsquo;ll be asked to sign in before this is sent.
            </p>
          )}
        </form>
      )}

      {error && <p className="mt-3 text-center text-sm text-red-600">{error}</p>}
    </div>
  );
}
