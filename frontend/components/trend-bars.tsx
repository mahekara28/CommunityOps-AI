import { CommunitySnapshot } from "@/lib/types";

interface TrendBarsProps {
  snapshots: CommunitySnapshot[];
}

export function TrendBars({ snapshots }: TrendBarsProps) {
  const maxValue = Math.max(...snapshots.map((item) => item.active_contributors), 1);

  return (
    <div className="grid grid-cols-6 gap-3">
      {snapshots.map((snapshot) => {
        const height = `${Math.round((snapshot.active_contributors / maxValue) * 100)}%`;
        return (
          <div key={snapshot.week} className="flex flex-col items-center gap-3">
            <div className="flex h-52 w-full items-end rounded-[24px] border border-[var(--border)] bg-[var(--surface-subtle)] p-2">
              <div
                className="w-full rounded-[18px] bg-gradient-to-t from-[var(--accent-strong)] via-[var(--accent)] to-[var(--teal)] transition-all duration-700"
                style={{ height }}
              />
            </div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                {snapshot.week.replace("2026-", "")}
              </p>
              <p className="mt-1 text-sm font-medium">{snapshot.active_contributors}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
