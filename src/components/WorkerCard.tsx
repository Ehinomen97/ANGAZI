"use client";

import Link from "next/link";
import { BadgeCheck, MapPin, Briefcase } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import type { WorkerWithProfile } from "@/types/database";

const AVAILABILITY_STYLES: Record<string, string> = {
  available: "bg-lime/20 text-forest",
  busy: "bg-amber-100 text-amber-700",
  unavailable: "bg-ink/10 text-ink/50",
};

export default function WorkerCard({ worker }: { worker: WorkerWithProfile }) {
  const { requireAuth } = useAuth();

  function handleHire(e: React.MouseEvent) {
    if (!requireAuth(`hire ${worker.full_name}`)) {
      e.preventDefault();
    }
  }

  return (
    <div className="group flex flex-col rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft">
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <img
            src={
              worker.photo_url ||
              `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
                worker.full_name
              )}&backgroundColor=143D2C&textColor=B9F44F`
            }
            alt={worker.full_name}
            className="h-16 w-16 rounded-2xl object-cover"
          />
          {worker.verified && (
            <span className="absolute -bottom-1 -right-1 rounded-full bg-white p-0.5">
              <BadgeCheck size={18} className="fill-forest text-white" />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-ink">
            {worker.full_name}
          </h3>
          <p className="text-sm font-medium text-forest">{worker.trade}</p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-ink/50">
            <MapPin size={12} /> {worker.lga}, {worker.state}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-mist px-2.5 py-1 text-xs font-medium text-ink/70">
          <Briefcase size={12} /> {worker.experience_years}{" "}
          {worker.experience_years === 1 ? "year" : "years"} exp.
        </span>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
            AVAILABILITY_STYLES[worker.availability]
          }`}
        >
          {worker.availability}
        </span>
      </div>

      {worker.bio && (
        <p className="mt-3 line-clamp-2 text-sm text-ink/60">{worker.bio}</p>
      )}

      <div className="mt-5 flex gap-2.5">
        <Link
          href={`/worker/${worker.id}`}
          className="focus-ring flex-1 rounded-xl border border-ink/15 py-2.5 text-center text-sm font-semibold text-ink transition hover:bg-mist"
        >
          View Profile
        </Link>
        <Link
          href={`/worker/${worker.id}#hire`}
          onClick={handleHire}
          className="focus-ring flex-1 rounded-xl bg-forest py-2.5 text-center text-sm font-semibold text-white transition hover:bg-forest-dark"
        >
          Hire Worker
        </Link>
      </div>
    </div>
  );
}
