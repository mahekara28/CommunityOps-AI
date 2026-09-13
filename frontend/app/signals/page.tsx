import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { getPortfolioData } from "@/lib/server-data";

export default async function SignalsPage() {
  const { dashboards, errors } = await getPortfolioData();

  return (
    <main className="space-y-6">
      <PageHeader
        eyebrow="Signals"
        title="A signal desk built for weekly operating rhythm."
        description="Use this view to spot support pressure, activation momentum, and product proof without getting lost in decorative dashboard noise."
      />

      {errors.length > 0 ? (
        <section className="empty-state rounded-[30px] p-5 text-sm leading-6 text-[var(--muted)]">
          {errors.map((error) => (
            <p key={error.slug}>
              {error.name}: {error.message}
            </p>
          ))}
        </section>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-2">
        {dashboards.map((dashboard) => (
          <SectionCard
            key={dashboard.community.slug}
            title={dashboard.community.name}
            kicker={dashboard.sync_status.label}
          >
            <div className="grid gap-4">
              {dashboard.live_signals.map((signal) => (
                <article key={signal.id} className="rounded-[26px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">{signal.topic}</p>
                      <h3 className="mt-2 text-lg font-semibold">{signal.title}</h3>
                    </div>
                    <p className="text-2xl font-semibold">{signal.score}</p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{signal.description}</p>
                  <p className="mt-3 text-sm leading-6 text-[var(--text)]">{signal.evidence}</p>
                </article>
              ))}
              <a href={`/communities/${dashboard.community.slug}`} className="button-primary text-center">
                Open community detail
              </a>
            </div>
          </SectionCard>
        ))}
      </div>
    </main>
  );
}
