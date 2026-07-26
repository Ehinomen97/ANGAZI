import Link from "next/link";
import clsx from "clsx";

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      className="focus-ring flex items-center gap-2.5 rounded-lg"
      aria-label="Angazi Concepts home"
    >
      <img src="/logo-mark.png" alt="" className="h-8 w-8 sm:h-9 sm:w-9" />
      <span
        className={clsx(
          "flex flex-col leading-none",
          dark ? "text-white" : "text-ink"
        )}
      >
        <span className="text-[1.05rem] font-bold tracking-tight sm:text-lg">
          ANGAZI
        </span>
        <span
          className={clsx(
            "text-[0.55rem] font-semibold tracking-[0.25em]",
            dark ? "text-lime" : "text-forest"
          )}
        >
          CONCEPTS
        </span>
      </span>
    </Link>
  );
}
