import { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  kicker?: string;
  children: ReactNode;
  className?: string;
}

export function SectionCard({ title, kicker, children, className = "" }: SectionCardProps) {
  return (
    <section className={`glass section-sheen rounded-[32px] p-6 md:p-7 ${className}`}>
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          {kicker ? (
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">{kicker}</p>
          ) : null}
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h2>
        </div>
      </div>
      {children}
    </section>
  );
}
