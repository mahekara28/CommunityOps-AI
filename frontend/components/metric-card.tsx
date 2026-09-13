import { ReactNode } from "react";

interface MetricCardProps {
  eyebrow: string;
  value: string;
  detail: string;
  tone?: "accent" | "teal" | "gold";
  icon: ReactNode;
}

const toneStyles = {
  accent: "bg-[var(--accent-soft)] text-[var(--accent)]",
  teal: "bg-[rgba(13,124,123,0.12)] text-[var(--teal)]",
  gold: "bg-[rgba(166,117,38,0.12)] text-[var(--gold)]"
};

export function MetricCard({
  eyebrow,
  value,
  detail,
  tone = "accent",
  icon
}: MetricCardProps) {
  return (
    <div className="section-sheen glass rounded-[28px] p-5">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">{eyebrow}</p>
          <p className="mt-3 text-4xl font-semibold tracking-tight">{value}</p>
        </div>
        <div className={`rounded-full p-3 ${toneStyles[tone]}`}>{icon}</div>
      </div>
      <p className="max-w-[22rem] text-sm leading-6 text-[var(--muted)]">{detail}</p>
    </div>
  );
}
