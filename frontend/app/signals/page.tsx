import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { getPortfolioData } from "@/lib/server-data";

export default async function SignalsPage() {
  const { dashboards, errors, drafts } = await getPortfolioData();

  return (
    <main className="space-y-6">
      <PageHeader
        eyebrow="Gap Map"
        title="Read the message gaps before they hurt adoption."
        description="This page isolates the clearest signs that the product promise, onboarding flow, docs, and live developer experience are drifting apart."
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

      {drafts.length > 0 && dashboards.length === 0 ? (
        <section className="glass rounded-[30px] p-5 md:p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Before analysis</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Connect a real repository first.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)]">
            Use Sources to map the GitHub repository, then refresh evidence. The gap map appears only after live product data is available.
          </p>
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
                Open narrative detail
              </a>
            </div>
          </SectionCard>
        ))}
      </div>
    </main>
  );
}
