import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
  }

  let body: { workerId?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.workerId) {
    return NextResponse.json({ error: "workerId is required." }, { status: 400 });
  }

  const { data: employer } = await supabase
    .from("employers")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!employer) {
    return NextResponse.json(
      { error: "Only employer accounts can send hire requests." },
      { status: 403 }
    );
  }

  const { error } = await supabase.from("hire_requests").insert({
    worker_id: body.workerId,
    employer_id: user.id,
    message: body.message ?? null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
