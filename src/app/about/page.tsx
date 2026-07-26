import type { Metadata } from "next";
import { ShieldCheck, Award, Handshake, Rocket, Users2, Target, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story behind Angazi Concepts — why we exist, our mission, vision and values.",
};

const values = [
  { icon: ShieldCheck, title: "Trust", desc: "Every worker and employer on Angazi is here to build a relationship worth trusting." },
  { icon: Award, title: "Excellence", desc: "We hold ourselves and our community to a high standard of quality and reliability." },
  { icon: Handshake, title: "Integrity", desc: "We do what we say, honestly and transparently, every time." },
  { icon: Rocket, title: "Opportunity", desc: "We exist to open doors — for the worker on the roadside and the employer who needs them." },
  { icon: Users2, title: "Community", desc: "Angazi is stronger because of the people who show up for each other on it." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-forest py-20">
        <div className="container-page text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-lime">
            Our Story
          </span>
          <h1 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Born on the roadside, built for every Nigerian
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page mx-auto max-w-3xl">
          <p className="text-lg leading-relaxed text-ink/70">
            While travelling across Nigeria, our founder repeatedly saw
            skilled and unskilled workers standing beside the roadside from
            morning until evening, hoping someone would hire them.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            Many returned home without work — not because they lacked skill,
            but because the people who needed them simply could not find
            them.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            Angazi Concepts was created to bridge this gap, and to ensure
            that every willing worker has the opportunity to be discovered.
          </p>
        </div>
      </section>

      <section className="bg-mist/60 py-16">
        <div className="container-page grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-ink/[0.06] bg-white p-8 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest">
              <Target size={22} className="text-lime" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-ink">Mission</h2>
            <p className="mt-2 text-ink/65">
              To connect skilled and unskilled workers with individuals,
              businesses and organizations through a trusted technology
              platform.
            </p>
          </div>
          <div className="rounded-2xl border border-ink/[0.06] bg-white p-8 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest">
              <Eye size={22} className="text-lime" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-ink">Vision</h2>
            <p className="mt-2 text-ink/65">
              To become Africa&rsquo;s most trusted workforce platform, where
              finding workers and finding work is simple, secure and
              accessible.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <div className="mx-auto max-w-xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-forest/70">
              What We Stand For
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Our Values
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-ink/[0.06] bg-white p-6 text-center shadow-card">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-forest">
                  <Icon size={20} />
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
