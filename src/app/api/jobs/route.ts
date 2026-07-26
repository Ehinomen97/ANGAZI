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

  let body: {
    title?: string;
    trade?: string;
    description?: string;
    state?: string;
    lga?: string;
    budget?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { title, trade, description, state, lga, budget } = body;
  if (!title?.trim() || !trade?.trim() || !description?.trim() || !state?.trim() || !lga?.trim()) {
    return NextResponse.json({ error: "All fields except budget are required." }, { status: 400 });
  }

  const { data: employer } = await supabase
    .from("employers")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!employer) {
    return NextResponse.json(
      { error: "Only employer accounts can post jobs." },
      { status: 403 }
    );
  }

  const { error } = await supabase.from("jobs").insert({
    employer_id: user.id,
    title: title.trim(),
    trade: trade.trim(),
    description: description.trim(),
    state: state.trim(),
    lga: lga.trim(),
    budget: budget?.trim() || null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
