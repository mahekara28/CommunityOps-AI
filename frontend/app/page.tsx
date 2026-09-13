import { BenchmarkStrip } from "@/components/benchmark-strip";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { WorkflowInsights } from "@/components/workflow-insights";
import { getPortfolioData } from "@/lib/server-data";

function average(values: number[]) {
  if (values.length === 0) return 0;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

export default async function Home() {
  const { dashboards, errors } = await getPortfolioData();
  const benchmarkMetrics = [
    {
      label: "Portfolio health",
      value: `${average(dashboards.map((item) => item.health.overall_score))}/100`,
      delta: "Live benchmark average",
      direction: "up" as const,
      context: "Composite view of support, activation, advocacy, and shipped proof."
    },
    {
      label: "Communities tracked",
      value: `${dashboards.length}`,
      delta: "Active GitHub repositories",
      direction: "flat" as const,
      context: "Compare distinct community motions without flattening the portfolio."
    },
    {
      label: "Support risk",
      value: `${average(dashboards.map((item) => item.health.unanswered_rate))}%`,
      delta: "Unanswered issue pressure",
      direction: "down" as const,
      context: "Highlights where response systems are struggling to keep pace with demand."
    },
    {
      label: "Activation score",
      value: `${average(dashboards.map((item) => item.health.activation_score))}`,
      delta: "Onboarding and docs motion",
      direction: "up" as const,
      context: "Measures how well communities help new builders reach first success."
    },
    {
      label: "ROI signal",
      value: `${average(dashboards.map((item) => item.health.roi_score))}`,
      delta: "Contribution-to-proof conversion",
      direction: "up" as const,
      context: "Shows whether activity is translating into visible product and business proof."
    }
  ];

  return (
    <main className="space-y-6">
      <PageHeader
        eyebrow="Overview"
        title="A live GitHub command center for community teams."
        description="Designed like a product workspace: one clean surface for signal review, operator rituals, and proof that community energy is compounding into product outcomes."
        actions={
          <div className="rounded-[26px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4 text-sm leading-6 text-[var(--muted)]">
            Live GitHub repositories feed this workspace directly. No demo mode, no placeholder dashboards.
          </div>
        }
      />

      {errors.length > 0 ? (
        <section className="empty-state rounded-[30px] p-5 text-sm leading-6 text-[var(--muted)]">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Attention needed</p>
          <p className="mt-3 text-base text-[var(--text)]">
            Some repositories could not be loaded from GitHub.
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            {errors.map((error) => (
              <span key={error.slug} className="rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-2">
                {error.name}: {error.message}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {dashboards.length > 0 ? <BenchmarkStrip metrics={benchmarkMetrics} /> : null}

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="Communities" kicker="Portfolio">
          {dashboards.length === 0 ? (
            <div className="empty-state rounded-[28px] p-6 text-sm leading-6 text-[var(--muted)]">
              Add valid GitHub repositories in Workspace, then refresh the sync to populate the product.
            </div>
          ) : (
            <div className="grid gap-4">
              {dashboards.map((item) => (
                <a
                  key={item.community.slug}
                  href={`/communities/${item.community.slug}`}
                  className="rounded-[28px] border border-[var(--border)] bg-[var(--surface-elevated)] p-5 transition hover:-translate-y-0.5 hover:border-[var(--border-strong)]"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-2xl">
                      <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                        {item.community.category}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold tracking-tight">{item.community.name}</h3>
                      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.community.tagline}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Health</p>
                      <p className="mt-2 text-3xl font-semibold">{item.health.overall_score}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.community.strategic_focus.map((focus) => (
                      <span
                        key={focus}
                        className="rounded-full border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--muted)]"
                      >
                        {focus}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          )}
        </SectionCard>

        <SectionCard title="Operator Workflows" kicker="Shared Patterns">
          <WorkflowInsights
            items={[
              {
                id: "portfolio-proof",
                title: "Proof reviews",
                summary: "Turn community work into a weekly business-ready narrative the team can actually use.",
                owner: "Leadership",
                status: "scale"
              },
              {
                id: "portfolio-routing",
                title: "Support routing",
                summary: "Route repeated questions into reusable answers before maintainers absorb the drag.",
                owner: "Community ops",
                status: "act"
              },
              {
                id: "portfolio-content",
                title: "Content conversion",
                summary: "Turn recurring friction into documentation, launch assets, and proof stories.",
                owner: "Developer marketing",
                status: "scale"
              }
            ]}
          />
        </SectionCard>
      </section>
    </main>
  );
}
