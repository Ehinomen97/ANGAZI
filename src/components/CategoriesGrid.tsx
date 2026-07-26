import Link from "next/link";
import {
  Hammer,
  Construction,
  Zap,
  Wrench,
  Flame,
  Paintbrush,
  LayoutGrid,
  PaintBucket,
  Settings,
  HardHat,
  Sparkles,
  GraduationCap,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

import { WORKER_CATEGORIES } from "@/types/database";

const ICONS: Record<string, LucideIcon> = {
  Carpenter: Hammer,
  Mason: Construction,
  Electrician: Zap,
  Plumber: Wrench,
  Welder: Flame,
  Painter: Paintbrush,
  Tiler: LayoutGrid,
  "POP Installer": PaintBucket,
  "Iron Bender": Settings,
  "General Labour": HardHat,
  Cleaner: Sparkles,
  Apprentice: GraduationCap,
};

export default function CategoriesGrid() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-700">
            ANGAZI PROFESSIONS
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            Find Skilled Professionals Near You
          </h2>

          <p className="mt-4 text-gray-600">
            Hire trusted workers across different trades with just a few clicks.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {WORKER_CATEGORIES.map((category) => {
            const Icon = ICONS[category] ?? Hammer;

            return (
              <Link
                key={category}
                href={`/find-workers?category=${encodeURIComponent(category)}`}
                className="group rounded-3xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-700 transition-all group-hover:bg-green-700 group-hover:text-white">
                  <Icon size={40} />
                </div>

                <h3 className="mt-6 text-center text-lg font-bold text-gray-900">
                  {category}
                </h3>

                <p className="mt-2 text-center text-sm text-gray-500">
                  Trusted and verified professionals.
                </p>

                <div className="mt-5 flex items-center justify-center gap-2 font-semibold text-green-700">
                  View Workers
                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-2"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}