import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: Request) {
  console.log("🔥 CUSTOMERS API HIT");

  const { userId } = await req.json();

  console.log("👉 USER ID:", userId);

  if (!userId) {
    return NextResponse.json({ error: "No userId" }, { status: 400 });
  }

  // ✅ GET FROM DB (NO .single())
  const { data, error: dbError } = await supabase
    .from("integrations")
    .select("*")
    .eq("user_id", userId)
    .eq("provider", "google")
    .single();

  if (dbError || !data) {
    return NextResponse.json({ error: "No integration" }, { status: 404 });
  }

  const accessToken = data.access_token;

  if (!accessToken) {
    return NextResponse.json({ error: "No access token" }, { status: 401 });
  }
  console.log(
    "DEBUG - Dev Token length:",
    process.env.GOOGLE_ADS_DEVELOPER_TOKEN?.length,
  );
  console.log(
    "DEBUG - Auth Header prefix:",
    `Bearer ${accessToken.substring(0, 10)}...`,
  );

  // 🔥 GOOGLE API CALL
  const url =
    "https://googleads.googleapis.com/v18/customers:listAccessibleCustomers";
  console.log("Fetching URL:", url);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "developer-token": process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({}), // Empty body for POST
  });

  // ✅ RAW RESPONSE (IMPORTANT)
  const text = await res.text();
  console.log("🔥 RAW GOOGLE RESPONSE:", text);

  let apiData;
  try {
    apiData = JSON.parse(text);
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON from Google", text },
      { status: 500 },
    );
  }

  // ❌ GOOGLE ERROR
  if (!res.ok) {
    return NextResponse.json(
      { error: "Google API error", apiData },
      { status: res.status },
    );
  }

  const resourceNames = apiData.resourceNames;

  if (!resourceNames || resourceNames.length === 0) {
    return NextResponse.json(
      { error: "No customers found", apiData },
      { status: 400 },
    );
  }

  // ✅ EXTRACT CUSTOMER ID
  const customerId = resourceNames[0].split("/")[1];

  console.log("✅ CUSTOMER ID:", customerId);

  // ✅ SAVE TO DB
  const { error } = await supabase
    .from("integrations")
    .update({ customer_id: customerId })
    .eq("user_id", userId)
    .eq("provider", "google");

  console.log("👉 DB UPDATE ERROR:", error);

  return NextResponse.json({
    success: true,
    customerId,
  });
}
