"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function BecomeAgentCta() {
  const { user, profile, requireAuth } = useAuth();

  function handleClick(e: React.MouseEvent) {
    if (!requireAuth("become an Angazi Agent")) {
      e.preventDefault();
    }
  }

  if (user && profile?.role === "agent") {
    return (
      <div className="rounded-2xl bg-lime/15 px-6 py-4 text-center text-sm font-medium text-forest">
        You&rsquo;re already registered as an Angazi Agent. Our team will reach out with next steps.
      </div>
    );
  }

  if (user && profile && profile.role !== "agent") {
    return (
      <div className="rounded-2xl bg-mist px-6 py-4 text-center text-sm text-ink/70">
        You&rsquo;re signed in as a {profile.role}. To add Agent access to your
        account,{" "}
        <Link href="/contact" className="focus-ring font-semibold text-forest hover:underline">
          contact our team
        </Link>
        .
      </div>
    );
  }

  return (
    <Link
      href="/signup?role=agent"
      onClick={handleClick}
      className="focus-ring inline-flex items-center gap-2 rounded-2xl bg-lime px-8 py-4 text-sm font-bold text-forest shadow-soft transition hover:brightness-95"
    >
      Apply to Become an Agent
    </Link>
  );
}
