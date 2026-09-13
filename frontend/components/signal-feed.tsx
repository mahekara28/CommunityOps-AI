import { Signal } from "@/lib/types";

interface SignalFeedProps {
  signals: Signal[];
  priorityClasses: (priority: string) => string;
}

export function SignalFeed({ signals, priorityClasses }: SignalFeedProps) {
  return (
    <div className="grid gap-4">
      {signals.map((signal) => (
        <article
          key={signal.id}
          className="rounded-[24px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">{signal.topic}</p>
                <span
                  className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${priorityClasses(
                    signal.priority,
                  )}`}
                >
                  {signal.priority}
                </span>
              </div>
              <h3 className="mt-2 text-lg font-semibold">{signal.title}</h3>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Score</p>
              <p className="mt-2 text-2xl font-semibold">{signal.score}</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{signal.description}</p>
          <div className="mt-4 rounded-[18px] border border-[var(--border)] bg-[var(--surface-subtle)] p-3 text-sm leading-6">
            <span className="font-medium">Evidence:</span> {signal.evidence}
          </div>
        </article>
      ))}
    </div>
  );
}
