import Link from "next/link";
import { Users, Building2, UserCog, MessageSquare, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

async function count(table: "workers" | "employers" | "agents" | "contact_submissions", match?: Record<string, unknown>) {
  const supabase = await createClient();
  let query = supabase.from(table).select("*", { count: "exact", head: true });
  if (match) {
    for (const [key, value] of Object.entries(match)) {
      query = query.eq(key, value);
    }
  }
  const { count: total } = await query;
  return total ?? 0;
}

export default async function AdminOverviewPage() {
  const [
    totalWorkers,
    pendingWorkers,
    totalEmployers,
    totalAgents,
    pendingAgents,
    unreadContacts,
  ] = await Promise.all([
    count("workers"),
    count("workers", { status: "pending" }),
    count("employers"),
    count("agents"),
    count("agents", { status: "pending" }),
    count("contact_submissions", { read: false }),
  ]);

  const cards = [
    { label: "Total Workers", value: totalWorkers, icon: Users, href: "/admin/workers" },
    { label: "Pending Worker Approvals", value: pendingWorkers, icon: Clock, href: "/admin/workers" },
    { label: "Total Employers", value: totalEmployers, icon: Building2, href: "/admin/employers" },
    { label: "Total Agents", value: totalAgents, icon: UserCog, href: "/admin/agents" },
    { label: "Pending Agent Approvals", value: pendingAgents, icon: Clock, href: "/admin/agents" },
    { label: "Unread Messages", value: unreadContacts, icon: MessageSquare, href: "/admin/contacts" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Dashboard Overview</h1>
      <p className="mt-1 text-sm text-ink/55">A snapshot of everything happening on Angazi.</p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="focus-ring rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest">
              <Icon size={20} className="text-lime" />
            </div>
            <p className="mt-4 text-3xl font-bold text-ink">{value}</p>
            <p className="mt-1 text-sm text-ink/55">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
