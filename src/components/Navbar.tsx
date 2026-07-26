"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import Logo from "./Logo";
import { useAuth } from "@/hooks/useAuth";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/find-workers", label: "Find Workers" },
  { href: "/find-work", label: "Find Work" },
  { href: "/become-agent", label: "Become an Agent" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user, profile, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-ink/[0.06] bg-white/90 backdrop-blur-md">
      <nav className="container-page flex h-[72px] items-center justify-between py-3.5">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={clsx(
                  "focus-ring rounded-full px-3.5 py-2 text-[0.925rem] font-medium transition-colors",
                  pathname === link.href
                    ? "text-forest"
                    : "text-ink/70 hover:text-forest"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2.5 lg:flex">
          {user ? (
            <>
              {profile?.role === "admin" && (
                <Link
                  href="/admin"
                  className="focus-ring rounded-full px-4 py-2 text-sm font-semibold text-ink/70 hover:text-forest"
                >
                  Admin
                </Link>
              )}
              <span className="max-w-[140px] truncate text-sm text-ink/60">
                Hi, {profile?.full_name?.split(" ")[0] ?? "there"}
              </span>
              <button
                onClick={() => signOut()}
                className="focus-ring rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink transition hover:bg-mist"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="focus-ring rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-mist"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="focus-ring rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-forest transition hover:brightness-95"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          className="focus-ring rounded-lg p-2 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink/[0.06] bg-white px-5 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="focus-ring block rounded-lg px-2 py-3 text-base font-medium text-ink/80 hover:bg-mist hover:text-forest"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-col gap-2.5">
            {user ? (
              <>
                {profile?.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="focus-ring flex h-12 items-center justify-center rounded-xl border border-ink/15 text-sm font-semibold"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    signOut();
                    setOpen(false);
                  }}
                  className="focus-ring flex h-12 items-center justify-center rounded-xl border border-ink/15 text-sm font-semibold text-ink"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="focus-ring flex h-12 items-center justify-center rounded-xl border border-ink/15 text-sm font-semibold text-ink"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="focus-ring flex h-12 items-center justify-center rounded-xl bg-lime text-sm font-semibold text-forest"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
