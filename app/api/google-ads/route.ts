import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

type GoogleRow = {
  campaign: {
    id: string;
    name: string;
    status: string;
  };
  metrics: {
    clicks: number;
    impressions: number;
    cost_micros: number;
  };
};

export async function POST(req: Request) {
  const { userId } = await req.json();

  const { data, error } = await supabase
    .from("integrations")
    .select("*")
    .eq("user_id", userId)
    .eq("provider", "google")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "No integration" }, { status: 404 });
  }

  const row = data;

  if (!row.customer_id) {
    return NextResponse.json(
      { error: "No customer_id found" },
      { status: 400 },
    );
  }

  const res = await fetch(
    `https://googleads.googleapis.com/v14/customers/${row.customer_id}/googleAds:search`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${row.access_token}`,
        "developer-token": process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
        "login-customer-id": row.customer_id,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          SELECT
            campaign.id,
            campaign.name,
            campaign.status,
            metrics.clicks,
            metrics.impressions,
            metrics.cost_micros
          FROM campaign
        `,
      }),
    },
  );

  const json = await res.json();
  console.log("👉 GOOGLE ADS DATA:", json);

  const campaigns =
    json.results?.map((row: GoogleRow) => ({
      id: row.campaign.id,
      name: row.campaign.name,
      status: row.campaign.status,
      clicks: row.metrics.clicks || 0,
      impressions: row.metrics.impressions || 0,
      spend: (row.metrics.cost_micros || 0) / 1_000_000,
    })) || [];

  return NextResponse.json({ campaigns });
}
