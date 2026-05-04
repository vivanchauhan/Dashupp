"use client";

type Props = {
  title: string;
  value: string;
  subtitle?: string;
  change?: number;
};

export default function KPICard({ title, value, subtitle, change }: Props) {
  return (
    <div className="bg-[var(--background)] border border-[var(--border)] rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      {/* TITLE */}
      <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
        {title}
      </p>

      {/* VALUE */}
      <h2 className="text-3xl font-bold text-[var(--foreground)] transition-all duration-300">
        {value}
      </h2>

      {/* 🔥 CHANGE INDICATOR */}
      {change !== undefined && (
        <p
          className={`text-sm mt-2 font-medium ${
            change >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {change >= 0 ? "↑" : "↓"} {Math.abs(change).toFixed(1)}%
        </p>
      )}

      {/* OPTIONAL SUBTITLE */}
      {subtitle && (
        <p className="text-xs text-gray-400 mt-1">
          vs previous {/*optional dynamic later*/} period
        </p>
      )}
    </div>
  );
}
