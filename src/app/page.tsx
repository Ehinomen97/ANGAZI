import Hero from "@/components/Hero";
import TrustSection from "@/components/TrustSection";
import CategoriesGrid from "@/components/CategoriesGrid";
import ComingSoonSection from "@/components/ComingSoonSection";
import Link from "next/link";
import { Target, Eye } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustSection />
      <CategoriesGrid />

      <section className="py-20">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-forest/70">
              About Angazi
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Born on the roadside, built for Nigeria
            </h2>
            <p className="mt-4 text-ink/65">
              While travelling across Nigeria, our founder repeatedly saw
              skilled and unskilled workers standing by the roadside from
              morning until evening, hoping someone would hire them.
            </p>
            <p className="mt-4 text-ink/65">
              Angazi was created to bridge that gap and ensure that every
              willing worker has the opportunity to be discovered.
            </p>
            <Link
              href="/about"
              className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-forest-dark"
            >
              Learn About Us
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-ink/[0.06] bg-white p-7 shadow-card">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest">
                <Target size={20} className="text-lime" />
              </div>
              <h3 className="mt-4 font-semibold text-ink">Our Mission</h3>
              <p className="mt-2 text-sm text-ink/60">
                To connect skilled and unskilled workers with people who need
                their services through a trusted, accessible and
                technology-driven platform.
              </p>
            </div>
            <div className="rounded-2xl border border-ink/[0.06] bg-white p-7 shadow-card">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest">
                <Eye size={20} className="text-lime" />
              </div>
              <h3 className="mt-4 font-semibold text-ink">Our Vision</h3>
              <p className="mt-2 text-sm text-ink/60">
                To become Africa&rsquo;s most trusted workforce platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ComingSoonSection />

      <section className="bg-forest py-20">
        <div className="container-page text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-white/70">
            Join thousands of workers and employers already building trust on
            Angazi.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="focus-ring w-full rounded-2xl bg-lime px-8 py-4 text-sm font-bold text-forest transition hover:brightness-95 sm:w-auto"
            >
              Create Free Account
            </Link>
            <Link
              href="/become-agent"
              className="focus-ring w-full rounded-2xl border border-white/25 px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10 sm:w-auto"
            >
              Become an Agent
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
