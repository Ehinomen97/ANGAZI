import { ShieldCheck, Zap, Users, MapPinned } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Verified Workers",
    desc: "Carefully verified for your peace of mind.",
  },
  {
    icon: Zap,
    title: "Fast Search",
    desc: "Find the right person in minutes.",
  },
  {
    icon: Users,
    title: "Trusted Community",
    desc: "Built on trust, backed by Angazi.",
  },
  {
    icon: MapPinned,
    title: "Nationwide Coverage",
    desc: "Connecting people across Nigeria.",
  },
];

export default function TrustSection() {
  return (
    <section className="border-b border-ink/[0.06] bg-mist/60 py-16">
      <div className="container-page grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-2xl bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest">
              <Icon size={20} className="text-lime" />
            </div>
            <h3 className="mt-4 font-semibold text-ink">{title}</h3>
            <p className="mt-1 text-sm text-ink/60">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
