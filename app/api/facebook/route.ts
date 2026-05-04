import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "No userId" }, { status: 400 });
    }

    // ✅ Get FB integration
    const { data, error } = await supabase
      .from("integrations")
      .select("*")
      .eq("user_id", userId)
      .eq("provider", "facebook")
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "No FB integration found" },
        { status: 400 },
      );
    }

    const token = data.access_token;

    // ✅ Fetch ad accounts
    const res = await fetch(
      `https://graph.facebook.com/v18.0/me/adaccounts?fields=id,name`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const fbData = await res.json();
    console.log("FB ACCOUNTS:", fbData);

    const accounts = fbData.data;

    if (!accounts || accounts.length === 0) {
      return NextResponse.json(
        { error: "No ad accounts found" },
        { status: 400 },
      );
    }

    const adAccountId = accounts[0].id; // act_XXXX

    console.log("SELECTED ACCOUNT:", adAccountId);

    // ✅ Save customer_id
    const { error: upsertError } = await supabase.from("integrations").upsert(
      {
        user_id: userId,
        provider: "facebook",
        access_token: token,
        customer_id: adAccountId,
        connected: true,
      },
      { onConflict: "user_id,provider" },
    );

    if (upsertError) {
      console.error("❌ UPSERT ERROR:", upsertError);
      return NextResponse.json({ error: "DB update failed" }, { status: 500 });
    }

    console.log("✅ UPSERT SUCCESS");
    // const { error: updateError } = await supabase
    //   .from("integrations")
    //   .update({ customer_id: adAccountId, connected: true })
    //   .eq("user_id", userId)
    //   .eq("provider", "facebook");

    // if (updateError) {
    //   console.error("DB UPDATE ERROR:", updateError);
    // }

    return NextResponse.json({
      success: true,
      adAccountId,
    });
  } catch (err) {
    console.error("FB SETUP ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
