"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Hammer, Briefcase } from "lucide-react";

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = query.trim() ? `?q=${encodeURIComponent(query.trim())}` : "";
    router.push(`/find-workers${params}`);
  }

  return (
    <section className="relative overflow-hidden bg-forest">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-lime/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-20 h-[24rem] w-[24rem] rounded-full bg-lime/5 blur-3xl"
      />

      <div className="container-page relative py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="animate-fadeUp inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-lime">
            Nigeria&rsquo;s Trusted Workforce Platform
          </span>

          <h1 className="animate-fadeUp mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white [animation-delay:80ms] sm:text-5xl md:text-6xl">
            Find Trusted <span className="text-lime">Workers.</span>
            <br />
            Find Meaningful <span className="text-lime">Work.</span>
          </h1>

          <p className="animate-fadeUp mx-auto mt-6 max-w-xl text-balance text-base text-white/70 [animation-delay:160ms] sm:text-lg">
            Angazi connects skilled and unskilled workers with individuals,
            businesses and organizations across Nigeria.
          </p>

          <div className="animate-fadeUp mt-9 flex flex-col items-center justify-center gap-4 [animation-delay:240ms] sm:flex-row">
            <a
              href="/find-workers"
              className="focus-ring flex w-full items-center justify-center gap-2.5 rounded-2xl bg-lime px-8 py-5 text-base font-bold text-forest shadow-soft transition hover:brightness-95 sm:w-auto"
            >
              <Hammer size={20} strokeWidth={2.5} />
              FIND WORKERS
            </a>
            <a
              href="/find-work"
              className="focus-ring flex w-full items-center justify-center gap-2.5 rounded-2xl bg-lime px-8 py-5 text-base font-bold text-forest shadow-soft transition hover:brightness-95 sm:w-auto"
            >
              <Briefcase size={20} strokeWidth={2.5} />
              FIND WORK
            </a>
          </div>

          <form
            onSubmit={handleSearch}
            className="animate-fadeUp mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-2xl bg-white p-2 shadow-2xl [animation-delay:320ms]"
          >
            <Search className="ml-3 shrink-0 text-ink/40" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for Carpenter, Plumber, Mason…"
              aria-label="Search for a worker by trade"
              className="focus-ring h-11 w-full rounded-xl border-0 bg-transparent text-sm text-ink placeholder:text-ink/40 focus-visible:ring-0"
            />
            <button
              type="submit"
              className="focus-ring shrink-0 rounded-xl bg-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-forest-dark"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
