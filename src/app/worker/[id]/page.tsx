import { notFound } from "next/navigation";
import { BadgeCheck, MapPin, Briefcase, Calendar } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import WorkerContactPanel from "@/components/WorkerContactPanel";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

async function getWorker(id: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("workers")
    .select(
      "id, full_name, trade, experience_years, state, lga, bio, photo_url, availability, verified, rating, created_at, status"
    )
    .eq("id", id)
    .eq("status", "approved")
    .single();
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const worker = await getWorker(id);
  if (!worker) return { title: "Worker not found" };
  return {
    title: `${worker.full_name} — ${worker.trade} in ${worker.state}`,
    description: worker.bio ?? `${worker.full_name} is a verified ${worker.trade} on Angazi Concepts, based in ${worker.lga}, ${worker.state}.`,
  };
}

export default async function WorkerProfilePage({ params }: Props) {
  const { id } = await params;
  const worker = await getWorker(id);
  if (!worker) notFound();

  return (
    <div className="bg-mist/40 py-14">
      <div className="container-page grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-ink/[0.06] bg-white p-8 shadow-card">
            <div className="flex flex-col items-start gap-5 sm:flex-row">
              <div className="relative shrink-0">
                <img
                  src={
                    worker.photo_url ||
                    `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
                      worker.full_name
                    )}&backgroundColor=143D2C&textColor=B9F44F`
                  }
                  alt={worker.full_name}
                  className="h-24 w-24 rounded-2xl object-cover"
                />
                {worker.verified && (
                  <span className="absolute -bottom-1 -right-1 rounded-full bg-white p-0.5">
                    <BadgeCheck size={22} className="fill-forest text-white" />
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-ink">{worker.full_name}</h1>
                <p className="mt-1 font-medium text-forest">{worker.trade}</p>
                <div className="mt-3 flex flex-wrap gap-3 text-sm text-ink/60">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={15} /> {worker.lga}, {worker.state}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase size={15} /> {worker.experience_years}{" "}
                    {worker.experience_years === 1 ? "year" : "years"} experience
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={15} /> Joined{" "}
                    {new Date(worker.created_at).toLocaleDateString("en-NG", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <span className="mt-3 inline-block rounded-full bg-lime/20 px-3 py-1 text-xs font-semibold capitalize text-forest">
                  {worker.availability}
                </span>
              </div>
            </div>

            {worker.bio && (
              <div className="mt-8 border-t border-ink/[0.06] pt-6">
                <h2 className="font-semibold text-ink">About</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{worker.bio}</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <WorkerContactPanel workerId={worker.id} workerName={worker.full_name} />
        </div>
      </div>
    </div>
  );
}
