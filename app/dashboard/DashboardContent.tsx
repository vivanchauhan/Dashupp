"use client";

import { useEffect, useState } from "react";
import KPICard from "@/components/KPICard";
import SpendChart from "@/components/SpendChart";
import FilterBar from "@/components/FilterBar";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Campaign } from "@/types/campaign";

export default function DashboardContent() {
  // const [platform, setPlatform] = useState("all");

  const router = useRouter();
  const [connected, setConnected] = useState(false);

  //const [fbcampaign, setFbCampaign] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [metric, setMetric] = useState("spend");
  const [changes, setChanges] = useState<any>({});

  const [dateRange, setDateRange] = useState("7d");
  const [platform, setPlatform] = useState("facebook");

  const totals = campaigns.reduce(
    (acc, campaign) => {
      acc.spend += campaign.spend || 0;
      acc.clicks += campaign.clicks || 0;
      acc.impressions += campaign.impressions || 0;

      return acc;
    },
    { spend: 0, clicks: 0, impressions: 0 },
  );

  const cpc = totals.clicks > 0 ? totals.spend / totals.clicks : 0;

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);

      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!user) {
        setLoading(false);
        return;
      }

      // 🔥 CHECK CONNECTION FIRST
      const { data: integration } = await supabase
        .from("integrations")
        .select("*")
        .eq("user_id", user.id)
        .eq("provider", "facebook")
        .single();

      const isConnected = integration?.connected || false;

      setConnected(isConnected);

      if (!isConnected) {
        console.log("⛔ Facebook not connected");
        setCampaigns([]);
        setLoading(false);
        return;
      }

      // ✅ ONLY FETCH IF CONNECTED
      const res = await fetch("/api/facebook/ads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          dateRange,
        }),
      });

      const result = await res.json();
      setCampaigns(result?.campaigns || []);
      setChanges(result?.changes || {});
      setLoading(false);
    };

    fetchAds();
  }, [dateRange, platform]);

  return (
    // <div className="p-6">
    //   <FilterBar setPlatform={setPlatform} />

    //   <h1 className="text-2xl font-bold mb-4 mt-6">Facebook Campaigns</h1>
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    //     <KPICard
    //       title="Total Spend"
    //       value={totals.spend > 0 ? `₹${totals.spend.toFixed(2)}` : "—"}
    //     />

    //     <KPICard
    //       title="Clicks"
    //       value={totals.clicks > 0 ? `${totals.clicks}` : "—"}
    //     />

    //     <KPICard
    //       title="Impressions"
    //       value={totals.impressions > 0 ? `${totals.impressions}` : "—"}
    //     />

    //     <KPICard title="CPC" value={cpc > 0 ? `₹${cpc.toFixed(2)}` : "—"} />
    //   </div>

    //   {loading ? (
    //     <p className="text-gray-500">Fetching campaigns...</p>
    //   ) : !connected ? (
    //     <p className="text-gray-500">
    //       Connect your Facebook Ads account to view campaigns.
    //     </p>
    //   ) : campaigns.length === 0 ? (
    //     <p className="text-gray-500">No campaigns found</p>
    //   ) : (
    //     campaigns.map((c) => (
    //       <div
    //         key={c.id}
    //         className="w-full h-16 bg-[var(--background)] text-[var(--foreground)] border-b border-[var(--border)] flex items-center justify-between px-6"
    //       >
    //         <h2 className="font-semibold text-lg">{c.name}</h2>

    //         <p>Spend: ₹{c.spend}</p>
    //         <p>Clicks: {c.clicks}</p>
    //         <p>Impressions: {c.impressions}</p>
    //         <p className="text-gray-600">Status: {c.status}</p>
    //       </div>
    //     ))
    //   )}
    // </div>
    <div className="p-6">
      <FilterBar
        dateRange={dateRange}
        setDateRange={setDateRange}
        platform={platform}
        setPlatform={setPlatform}
      />

      {loading ? (
        <p className="text-gray-500 mt-6">Fetching campaigns...</p>
      ) : !connected ? (
        <div className="mt-6 p-6 border border-[var(--border)] rounded-xl text-center">
          <p className="text-gray-500 mb-3">
            Connect your Facebook Ads account to view campaigns
          </p>

          <button
            onClick={() => router.push("/dashboard/integrations")}
            className="mt-2 p-2 rounded-lg  hover:bg-[var(--muted)]"
          >
            Go to Integrations
          </button>
        </div>
      ) : (
        <>
          {/* 🔥 ONLY SHOW WHEN CONNECTED */}

          <h1 className="text-2xl font-bold mb-4 mt-6">Facebook Campaigns</h1>

          {/* KPI CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <KPICard
              title="Total Spend"
              value={totals.spend > 0 ? `₹${totals.spend.toFixed(2)}` : "—"}
              change={changes?.spend}
            />

            <KPICard
              title="Clicks"
              value={totals.clicks > 0 ? `${totals.clicks}` : "—"}
              change={changes?.clicks}
            />

            <KPICard
              title="Impressions"
              value={totals.impressions > 0 ? `${totals.impressions}` : "—"}
              change={changes?.impressions}
            />

            <KPICard title="CPC" value={cpc > 0 ? `₹${cpc.toFixed(2)}` : "—"} />
          </div>

          {/* CAMPAIGNS */}
          <div className="mt-8 pt-6 border-t border-[var(--border)]">
            {campaigns.length === 0 ? (
              <p className="text-gray-500">No campaigns found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                {campaigns.map((c) => (
                  <div
                    key={c.id}
                    // className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--background)] shadow-sm hover:shadow-md transition"
                    className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--background)] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                  >
                    {/* TOP SECTION */}
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="font-semibold text-lg">{c.name}</h2>

                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          c.status === "ACTIVE"
                            ? "bg-green-100 text-green-600"
                            : c.status === "PAUSED"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>

                    {/* METRICS */}
                    {/* <div className="grid grid-cols-3 gap-4 text-sm"> */}
                    <div className="grid grid-cols-3 gap-6 mt-4 text-sm">
                      <div>
                        <p className="text-gray-500">Spend</p>
                        <p className="font-medium">
                          ₹{c.spend.toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">Clicks</p>
                        <p className="font-medium">
                          {c.clicks.toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">Impressions</p>
                        <p className="font-medium">
                          {c.impressions.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 mb-8">
            <p className="text-sm text-gray-500 mb-3">
              Overview of your ad performance over time. Analyze trends and
              optimize your campaigns for better results.
            </p>
            <div className="flex gap-2 mb-4">
              {["spend", "clicks", "impressions", "ctr", "cpc"].map((m) => (
                <button
                  key={m}
                  onClick={() => setMetric(m)}
                  className={`px-3 py-1 rounded-lg border text-sm ${
                    metric === m
                      ? "bg-white text-black"
                      : "border-[var(--border)] hover:bg-[var(--muted)]"
                  }`}
                >
                  {m.toUpperCase()}
                </button>
              ))}
            </div>
            <SpendChart data={campaigns} metric={metric} />
          </div>
        </>
      )}
    </div>
  );
}
