import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: Request) {
  const { userId } = await req.json();

  await supabase
    .from("integrations")
    .update({
      connected: false,
      access_token: null,
      customer_id: null,
    })
    .eq("user_id", userId)
    .eq("provider", "facebook");

  return NextResponse.json({ success: true });
}
