"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { TextField } from "./SharedFields";
import { useRegister } from "@/hooks/useRegister";
import { WORKER_CATEGORIES } from "@/types/database";
import { NIGERIAN_STATES } from "@/lib/nigeria";

export default function WorkerSignupForm() {
  const { register, loading, error } = useRegister();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [trade, setTrade] = useState(WORKER_CATEGORIES[0]);
  const [experienceYears, setExperienceYears] = useState("0");
  const [state, setState] = useState(NIGERIAN_STATES[0]);
  const [lga, setLga] = useState("");
  const [agreed, setAgreed] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) return;
    register({
      role: "worker",
      fullName,
      phone,
      email,
      password,
      trade,
      experienceYears: Number(experienceYears) || 0,
      state,
      lga,
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
          <label className="text-sm font-medium text-ink">Trade / Profession</label>
          <select value={trade} onChange={(e) => setTrade(e.target.value)} className="focus-ring mt-1.5 w-full rounded-xl border border-ink/15 p-3 text-sm">
            {WORKER_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <TextField
          label="Years of Experience"
          type="number"
          min={0}
          value={experienceYears}
          onChange={(e) => setExperienceYears(e.target.value)}
        />
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

      <TextField label="Password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" />

      <label className="flex items-start gap-2 text-sm text-ink/70">
        <input type="checkbox" required checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-ink/25 text-forest focus:ring-forest" />
        I agree to the Terms &amp; Conditions
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={loading} className="focus-ring flex w-full items-center justify-center gap-2 rounded-xl bg-lime py-3.5 text-sm font-semibold text-forest transition hover:brightness-95 disabled:opacity-60">
        {loading && <Loader2 size={16} className="animate-spin" />}
        Sign Up as Worker
      </button>
      <p className="text-center text-xs text-ink/45">
        Your profile is reviewed by our team before it appears publicly.
      </p>
    </form>
  );
}
