import { ShoppingCart, Truck, Building2, Package } from "lucide-react";

const items = [
  { icon: ShoppingCart, title: "Buy Building Materials" },
  { icon: Truck, title: "Rent Equipment" },
  { icon: Building2, title: "Construction Marketplace" },
  { icon: Package, title: "Bulk Orders" },
];

export default function ComingSoonSection() {
  return (
    <section className="bg-mist/60 py-20">
      <div className="container-page">
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-block rounded-full bg-forest px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-lime">
            Coming Soon
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Beyond workers &mdash; a full construction ecosystem
          </h2>
          <p className="mt-3 text-ink/60">
            We&rsquo;re building the tools to make every project easier, from
            hiring the right hands to sourcing the right materials.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map(({ icon: Icon, title }) => (
            <div
              key={title}
              className="relative overflow-hidden rounded-2xl border border-dashed border-ink/15 bg-white/60 p-6 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-mist text-forest/50">
                <Icon size={22} />
              </div>
              <p className="mt-4 text-sm font-medium text-ink/70">{title}</p>
              <span className="mt-2 inline-block rounded-full bg-lime/20 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-forest">
                Soon
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
