import { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <section className="glass section-sheen metric-grid rounded-[34px] px-6 py-7 md:px-8 md:py-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">{eyebrow}</p>
          <h2 className="mt-3 text-4xl leading-[1.02] tracking-tight md:text-5xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[var(--muted)]">{description}</p>
        </div>
        {actions ? <div className="lg:max-w-sm">{actions}</div> : null}
      </div>
    </section>
  );
}
