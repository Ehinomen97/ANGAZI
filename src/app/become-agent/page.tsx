import type { Metadata } from "next";
import { MapPin, Users, Wallet, ShieldCheck } from "lucide-react";
import BecomeAgentCta from "@/components/BecomeAgentCta";

export const metadata: Metadata = {
  title: "Become an Agent",
  description:
    "Join Angazi Concepts as a Field Agent — register and verify workers, and onboard businesses in your community.",
};

const perks = [
  { icon: MapPin, title: "Work in Your Community", desc: "Register and verify workers right where you live." },
  { icon: Users, title: "Grow the Network", desc: "Help skilled and unskilled workers get discovered by real employers." },
  { icon: Wallet, title: "Earn as You Onboard", desc: "Agents are core to how Angazi grows — your effort builds real value." },
  { icon: ShieldCheck, title: "Be Part of Something Trusted", desc: "You help build the verification layer Nigeria's workforce platform runs on." },
];

export default function BecomeAgentPage() {
  return (
    <div>
      <section className="bg-forest py-20">
        <div className="container-page text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-lime">
            Angazi Agents
          </span>
          <h1 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Help build Nigeria&rsquo;s most trusted workforce platform
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Angazi Agents register and verify workers and onboard businesses
            in their local community — becoming the trusted face of Angazi on
            the ground.
          </p>
          <div className="mt-8">
            <BecomeAgentCta />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest">
                  <Icon size={20} className="text-lime" />
                </div>
                <h3 className="mt-4 font-semibold text-ink">{title}</h3>
                <p className="mt-1.5 text-sm text-ink/60">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
