"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { LayoutDashboard, Users, Building2, UserCog, MessageSquare, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Logo from "@/components/Logo";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/workers", label: "Workers", icon: Users },
  { href: "/admin/employers", label: "Employers", icon: Building2 },
  { href: "/admin/agents", label: "Agents", icon: UserCog },
  { href: "/admin/contacts", label: "Contact Submissions", icon: MessageSquare },
];

export default function AdminSidebar({ adminName }: { adminName: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin-login");
  }

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-ink/[0.06] bg-white p-5 sm:flex">
      <Logo />
      <p className="mt-6 truncate text-xs font-medium text-ink/40">Logged in as</p>
      <p className="truncate text-sm font-semibold text-ink">{adminName}</p>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "focus-ring flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition",
              pathname === href
                ? "bg-forest text-white"
                : "text-ink/65 hover:bg-mist hover:text-ink"
            )}
          >
            <Icon size={17} />
            {label}
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="focus-ring flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-ink/60 transition hover:bg-mist hover:text-ink"
      >
        <LogOut size={17} />
        Log out
      </button>
    </aside>
  );
}
