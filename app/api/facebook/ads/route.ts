import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: Request) {
  try {
    const { userId, dateRange } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "No userId" }, { status: 400 });
    }

    // 🧠 DATE LOGIC
    const days = dateRange === "30d" ? 30 : 7;

    const since = new Date();
    since.setDate(since.getDate() - days);

    const until = new Date();

    const timeRange = {
      since: since.toISOString().split("T")[0],
      until: until.toISOString().split("T")[0],
    };

    const prevSince = new Date();
    prevSince.setDate(prevSince.getDate() - days * 2);

    const prevUntil = new Date();
    prevUntil.setDate(prevUntil.getDate() - days);

    const prevRange = {
      since: prevSince.toISOString().split("T")[0],
      until: prevUntil.toISOString().split("T")[0],
    };

    // ✅ Get integration
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
    const adAccountId = data.customer_id;

    if (!adAccountId) {
      return NextResponse.json(
        { error: "No ad account id found" },
        { status: 400 },
      );
    }

    // 🔥 FETCH BOTH PERIODS
    const currentRes = await fetch(
      `https://graph.facebook.com/v18.0/${adAccountId}/campaigns?fields=name,status,insights.time_range(${JSON.stringify(timeRange)}){spend,clicks,impressions}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const prevRes = await fetch(
      `https://graph.facebook.com/v18.0/${adAccountId}/campaigns?fields=name,status,insights.time_range(${JSON.stringify(prevRange)}){spend,clicks,impressions}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const currentData = await currentRes.json();
    const prevData = await prevRes.json();

    if (!currentRes.ok) {
      console.error("FB API ERROR:", currentData);

      return NextResponse.json(
        { error: "Facebook API failed", details: currentData },
        { status: 400 },
      );
    }

    // 🧮 TOTALS
    const getTotals = (data: any[]) => {
      return data.reduce(
        (acc, c) => {
          acc.spend += Number(c.insights?.data?.[0]?.spend || 0);
          acc.clicks += Number(c.insights?.data?.[0]?.clicks || 0);
          acc.impressions += Number(c.insights?.data?.[0]?.impressions || 0);
          return acc;
        },
        { spend: 0, clicks: 0, impressions: 0 },
      );
    };

    const currentTotals = getTotals(currentData.data || []);
    const prevTotals = getTotals(prevData.data || []);

    // 📊 % CHANGE
    const getChange = (curr: number, prev: number) => {
      if (prev === 0) return 0;
      return ((curr - prev) / prev) * 100;
    };

    const changes = {
      spend: getChange(currentTotals.spend, prevTotals.spend),
      clicks: getChange(currentTotals.clicks, prevTotals.clicks),
      impressions: getChange(currentTotals.impressions, prevTotals.impressions),
    };

    // ✅ NORMALIZE CURRENT DATA
    const campaigns =
      currentData.data?.map((c: any) => ({
        id: c.id,
        name: c.name,
        status: c.status,
        spend: Number(c.insights?.data?.[0]?.spend || 0),
        clicks: Number(c.insights?.data?.[0]?.clicks || 0),
        impressions: Number(c.insights?.data?.[0]?.impressions || 0),
      })) || [];

    return NextResponse.json({
      campaigns,
      changes,
    });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
