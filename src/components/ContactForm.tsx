"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setSent(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-lime/15 p-10 text-center">
        <CheckCircle2 size={40} className="text-forest" />
        <h3 className="text-lg font-semibold text-ink">Message sent</h3>
        <p className="text-sm text-ink/60">
          Thanks for reaching out — our team will get back to you shortly.
        </p>
        <button
          onClick={() => setSent(false)}
          className="focus-ring mt-2 text-sm font-semibold text-forest hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-ink">
            Name
          </label>
          <input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="focus-ring mt-1.5 w-full rounded-xl border border-ink/15 p-3 text-sm"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-ink">
            Phone Number
          </label>
          <input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="focus-ring mt-1.5 w-full rounded-xl border border-ink/15 p-3 text-sm"
            placeholder="080…"
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="focus-ring mt-1.5 w-full rounded-xl border border-ink/15 p-3 text-sm"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="focus-ring mt-1.5 w-full rounded-xl border border-ink/15 p-3 text-sm"
          placeholder="How can we help?"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="focus-ring flex w-full items-center justify-center gap-2 rounded-xl bg-forest py-3.5 text-sm font-semibold text-white transition hover:bg-forest-dark disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        Send Message
      </button>
    </form>
  );
}
