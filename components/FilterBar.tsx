type Props = {
  dateRange: string;
  setDateRange: (v: string) => void;
  platform: string;
  setPlatform: (v: string) => void;
};

export default function FilterBar({
  dateRange,
  setDateRange,
  platform,
  setPlatform,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {/* DATE FILTER */}
      <select
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value)}
        className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)]"
      >
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
      </select>

      {/* PLATFORM FILTER */}
      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)]"
      >
        <option value="facebook">Facebook</option>
        <option value="google">Google</option>
        <option value="all">All Platforms</option>
      </select>
    </div>
  );
}
