"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: any[];
  metric: string;
};

export default function SpendChart({ data, metric }: Props) {
  // COMPUTE DATA HERE
  const chartData = data.map((c, index) => {
    const ctr = c.impressions > 0 ? (c.clicks / c.impressions) * 100 : 0;

    const cpc = c.clicks > 0 ? c.spend / c.clicks : 0;

    return {
      name: `Campaign ${index + 1}`,
      spend: c.spend || 0,
      clicks: c.clicks || 0,
      impressions: c.impressions || 0,
      ctr,
      cpc,
    };
  });

  return (
    <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--background)] shadow-sm">
      <h2 className="text-lg font-semibold mb-1">
        {metric.toUpperCase()} Overview
      </h2>
      <p className="text-xs text-gray-400 mb-4">Campaign-wise {metric}</p>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />

          <Tooltip
            formatter={(value: any) =>
              metric === "ctr"
                ? `${value.toFixed(2)}%`
                : metric === "cpc"
                  ? `₹${value.toFixed(2)}`
                  : value
            }
          />

          <Line type="monotone" dataKey={metric} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
