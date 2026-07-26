"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import Logo from "@/components/Logo";
import WorkerSignupForm from "@/components/signup/WorkerSignupForm";
import EmployerSignupForm from "@/components/signup/EmployerSignupForm";
import AgentSignupForm from "@/components/signup/AgentSignupForm";
import type { UserRole } from "@/types/database";

const TABS: { key: Extract<UserRole, "worker" | "employer" | "agent">; label: string }[] = [
  { key: "worker", label: "Worker" },
  { key: "employer", label: "Employer" },
  { key: "agent", label: "Agent" },
];

function SignupContent() {
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role");
  const [role, setRole] = useState<"worker" | "employer" | "agent">(
    initialRole === "employer" || initialRole === "agent" ? initialRole : "worker"
  );

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-mist/40 px-4 py-14">
      <div className="w-full max-w-lg rounded-2xl border border-ink/[0.06] bg-white p-8 shadow-card">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center text-xl font-semibold text-ink">Create Account</h1>
        <p className="mt-1 text-center text-sm text-ink/55">Join Angazi Concepts</p>

        <div className="mt-6">
          <p className="text-center text-xs font-medium uppercase tracking-wide text-ink/40">
            I want to register as
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2 rounded-xl bg-mist p-1.5">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setRole(tab.key)}
                className={clsx(
                  "focus-ring rounded-lg py-2 text-sm font-semibold transition",
                  role === tab.key ? "bg-forest text-white shadow-sm" : "text-ink/60 hover:text-ink"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          {role === "worker" && <WorkerSignupForm />}
          {role === "employer" && <EmployerSignupForm />}
          {role === "agent" && <AgentSignupForm />}
        </div>

        <p className="mt-6 text-center text-sm text-ink/60">
          Already have an account?{" "}
          <Link href="/login" className="focus-ring font-semibold text-forest hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupContent />
    </Suspense>
  );
}
