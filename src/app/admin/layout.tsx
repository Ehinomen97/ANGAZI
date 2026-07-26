import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin-login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") redirect("/admin-login");

  return (
    <div className="flex min-h-[calc(100vh-72px)] bg-mist/40">
      <AdminSidebar adminName={profile.full_name} />
      <div className="flex-1 p-6 sm:p-10">{children}</div>
    </div>
  );
}
