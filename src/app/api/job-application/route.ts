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

  let body: { jobId?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.jobId) {
    return NextResponse.json({ error: "jobId is required." }, { status: 400 });
  }

  const { data: worker } = await supabase
    .from("workers")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!worker) {
    return NextResponse.json(
      { error: "Only worker accounts can apply to jobs." },
      { status: 403 }
    );
  }

  const { error } = await supabase.from("job_applications").insert({
    job_id: body.jobId,
    worker_id: user.id,
    message: body.message ?? null,
  });

  if (error) {
    const message = error.message.includes("duplicate")
      ? "You've already applied to this job."
      : error.message;
    return NextResponse.json({ error: message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
