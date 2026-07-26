"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Logo from "@/components/Logo";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setReady(true);
    });
    // If the recovery session is already established by the time this mounts.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setDone(true);
    setTimeout(() => router.push("/login"), 2000);
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-mist/40 px-4 py-14">
      <div className="w-full max-w-md rounded-2xl border border-ink/[0.06] bg-white p-8 shadow-card">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center text-xl font-semibold text-ink">Reset Password</h1>

        {done ? (
          <div className="mt-6 flex flex-col items-center gap-2 text-center">
            <CheckCircle2 size={32} className="text-forest" />
            <p className="text-sm text-ink/60">Password updated. Redirecting to login…</p>
          </div>
        ) : !ready ? (
          <p className="mt-6 text-center text-sm text-ink/55">
            Open the reset link from your email to continue.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-ink">New Password</label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus-ring mt-1.5 w-full rounded-xl border border-ink/15 p-3 text-sm"
                placeholder="At least 8 characters"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="focus-ring flex w-full items-center justify-center gap-2 rounded-xl bg-forest py-3.5 text-sm font-semibold text-white transition hover:bg-forest-dark disabled:opacity-60"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
