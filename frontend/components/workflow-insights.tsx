import { WorkflowInsight } from "@/lib/types";

interface WorkflowInsightsProps {
  items: WorkflowInsight[];
}

function statusTone(status: WorkflowInsight["status"]) {
  if (status === "act") return "border border-[var(--border)] bg-[var(--accent-soft)] text-[var(--accent-strong)]";
  if (status === "scale") return "border border-[var(--border)] bg-[rgba(15,118,110,0.12)] text-[var(--teal)]";
  return "border border-[var(--border)] bg-[rgba(183,121,31,0.12)] text-[var(--gold)]";
}

export function WorkflowInsights({ items }: WorkflowInsightsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <article key={item.id} className="glass rounded-[26px] p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
            <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.22em] ${statusTone(item.status)}`}>
              {item.status}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.summary}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.22em] text-[var(--muted)]">{item.owner}</p>
        </article>
      ))}
    </div>
  );
}
