import { BenchmarkMetric } from "@/lib/types";

interface BenchmarkStripProps {
  metrics: BenchmarkMetric[];
}

function directionTone(direction: BenchmarkMetric["direction"]) {
  if (direction === "up") return "text-[var(--teal)]";
  if (direction === "down") return "text-[var(--critical)]";
  return "text-[var(--gold)]";
}

export function BenchmarkStrip({ metrics }: BenchmarkStripProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {metrics.map((metric) => (
        <article key={metric.label} className="glass section-sheen rounded-[28px] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">{metric.label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight">{metric.value}</p>
          <p className={`mt-2 text-sm font-medium ${directionTone(metric.direction)}`}>{metric.delta}</p>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{metric.context}</p>
        </article>
      ))}
    </section>
  );
}
