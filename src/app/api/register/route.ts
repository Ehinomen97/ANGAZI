import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { UserRole } from "@/types/database";

interface RegisterBody {
  role: UserRole;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  trade?: string;
  experienceYears?: number;
  state?: string;
  lga?: string;
  bio?: string;
  companyName?: string;
  motivation?: string;
}

export async function POST(request: Request) {
  let body: RegisterBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { role, fullName, email, phone, password } = body;

  if (!role || !fullName || !email || !phone || !password) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }
  if ((role === "worker" || role === "employer" || role === "agent") && (!body.state || !body.lga)) {
    return NextResponse.json({ error: "State and LGA are required." }, { status: 400 });
  }
  if (role === "worker" && !body.trade) {
    return NextResponse.json({ error: "Trade is required for a worker account." }, { status: 400 });
  }

  const admin = createAdminClient();

  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName, role },
  });

  if (createError || !created.user) {
    const message = createError?.message?.includes("already been registered")
      ? "An account with this email already exists."
      : createError?.message ?? "Could not create account.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const userId = created.user.id;

  const { error: profileError } = await admin.from("profiles").insert({
    id: userId,
    role,
    full_name: fullName,
    phone,
    email,
  });

  if (profileError) {
    await admin.auth.admin.deleteUser(userId);
    return NextResponse.json({ error: profileError.message }, { status: 400 });
  }

  let roleError;
  if (role === "worker") {
    ({ error: roleError } = await admin.from("workers").insert({
      id: userId,
      full_name: fullName,
      trade: body.trade!,
      experience_years: body.experienceYears ?? 0,
      state: body.state!,
      lga: body.lga!,
      bio: body.bio ?? null,
    }));
  } else if (role === "employer") {
    ({ error: roleError } = await admin.from("employers").insert({
      id: userId,
      company_name: body.companyName ?? null,
      state: body.state!,
      lga: body.lga!,
    }));
  } else if (role === "agent") {
    ({ error: roleError } = await admin.from("agents").insert({
      id: userId,
      state: body.state!,
      lga: body.lga!,
      motivation: body.motivation ?? null,
    }));
  }

  if (roleError) {
    await admin.auth.admin.deleteUser(userId);
    return NextResponse.json({ error: roleError.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
