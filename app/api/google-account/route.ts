import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

type IntegrationUpdate = {
  user_id: string;
  provider: string;
  connected: boolean;
  access_token: string;
  expires_at: number;
  refresh_token?: string;
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const code = searchParams.get("code");
    const userId = searchParams.get("state"); // 🔥 IMPORTANT

    if (!code || !userId) {
      return NextResponse.json(
        { error: "Missing code or userId" },
        { status: 400 },
      );
    }

    // 🔁 1. Exchange code → tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    console.log("GOOGLE TOKEN DATA:", tokenData);

    // 🔍 Debug errors from Google
    if (tokenData.error) {
      console.error("GOOGLE TOKEN ERROR:", tokenData);
    }

    const accessToken = tokenData.access_token;
    const refreshToken = tokenData.refresh_token;
    const expiresIn = tokenData.expires_in;

    if (!accessToken) {
      return NextResponse.json(
        { error: "No access token received" },
        { status: 400 },
      );
    }

    // 💾 2. Save in DB (safe upsert)
    const updateData: IntegrationUpdate = {
      user_id: userId,
      provider: "google",
      connected: true,
      access_token: accessToken,
      expires_at: Date.now() + expiresIn * 1000,
    };

    // ✅ Only update refresh_token if Google sends it
    if (refreshToken) {
      updateData.refresh_token = refreshToken;
    }

    const { error } = await supabase.from("integrations").upsert(updateData, {
      onConflict: "user_id,provider",
    });

    if (error) {
      console.error("DB ERROR:", error);
      return NextResponse.json(
        { error: "Failed to save integration" },
        { status: 500 },
      );
    }

    // After upsert succeeds
    const customerRes = await fetch(
      "http://localhost:3000/api/google-ads/customers",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      },
    );
    const customerData = await customerRes.json();
    console.log("Customer fetch:", customerData);

    // 🔁 3. Redirect back to dashboard
    return NextResponse.redirect("http://localhost:3000/dashboard");
  } catch (err) {
    console.error("GOOGLE AUTH ERROR:", err);
    return NextResponse.json({ error: "Google auth failed" }, { status: 500 });
  }
}
