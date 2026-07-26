"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { TextField } from "./SharedFields";
import { useRegister } from "@/hooks/useRegister";
import { NIGERIAN_STATES } from "@/lib/nigeria";

export default function AgentSignupForm() {
  const { register, loading, error } = useRegister();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState(NIGERIAN_STATES[0]);
  const [lga, setLga] = useState("");
  const [motivation, setMotivation] = useState("");
  const [agreed, setAgreed] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) return;
    register({
      role: "agent",
      fullName,
      phone,
      email,
      password,
      state,
      lga,
      motivation,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField label="Full Name" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" />

      <div className="grid grid-cols-2 gap-3">
        <TextField label="Phone Number" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="080…" />
        <TextField label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-ink">State</label>
          <select value={state} onChange={(e) => setState(e.target.value)} className="focus-ring mt-1.5 w-full rounded-xl border border-ink/15 p-3 text-sm">
            {NIGERIAN_STATES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <TextField label="LGA / Area" required value={lga} onChange={(e) => setLga(e.target.value)} placeholder="e.g. Ikeja" />
      </div>

      <div>
        <label className="text-sm font-medium text-ink">Why do you want to become an Agent?</label>
        <textarea
          rows={3}
          value={motivation}
          onChange={(e) => setMotivation(e.target.value)}
          className="focus-ring mt-1.5 w-full rounded-xl border border-ink/15 p-3 text-sm"
          placeholder="Tell us briefly about your community and why you'd be a great fit…"
        />
      </div>

      <TextField label="Password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" />

      <label className="flex items-start gap-2 text-sm text-ink/70">
        <input type="checkbox" required checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-ink/25 text-forest focus:ring-forest" />
        I agree to the Terms &amp; Conditions
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={loading} className="focus-ring flex w-full items-center justify-center gap-2 rounded-xl bg-lime py-3.5 text-sm font-semibold text-forest transition hover:brightness-95 disabled:opacity-60">
        {loading && <Loader2 size={16} className="animate-spin" />}
        Apply as Agent
      </button>
      <p className="text-center text-xs text-ink/45">
        Agent applications are reviewed by our team before approval.
      </p>
    </form>
  );
}
