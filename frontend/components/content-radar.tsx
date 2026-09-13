import { ContentOpportunity } from "@/lib/types";

interface ContentRadarProps {
  opportunities: ContentOpportunity[];
  priorityClasses: (priority: string) => string;
}

export function ContentRadar({ opportunities, priorityClasses }: ContentRadarProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {opportunities.map((opportunity) => (
        <article
          key={opportunity.id}
          className="rounded-[26px] border border-[var(--border)] bg-[var(--surface-elevated)] p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
              {opportunity.format}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] ${priorityClasses(
                opportunity.priority,
              )}`}
            >
              {opportunity.priority}
            </span>
          </div>
          <h3 className="mt-4 text-xl font-semibold tracking-tight">{opportunity.title}</h3>
          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[var(--muted)]">
            Audience: {opportunity.audience}
          </p>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{opportunity.insight}</p>
          <div className="mt-5 rounded-[18px] border border-[var(--border)] bg-[var(--surface-subtle)] p-3 text-sm leading-6">
            <span className="font-medium">Next step:</span> {opportunity.call_to_action}
          </div>
        </article>
      ))}
    </div>
  );
}
