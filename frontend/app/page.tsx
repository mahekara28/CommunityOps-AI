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
  const { dashboards, errors, drafts } = await getPortfolioData();
  const benchmarkMetrics = [
    {
      label: "Narrative alignment",
      value: `${average(dashboards.map((item) => item.health.overall_score))}/100`,
      delta: "Average story-to-reality score",
      direction: "up" as const,
      context: "Composite view of onboarding truth, support friction, and proof clarity."
    },
    {
      label: "Repos tracked",
      value: `${dashboards.length}`,
      delta: "Connected GitHub sources",
      direction: "flat" as const,
      context: "Compare narrative gaps across products without flattening them into one generic report."
    },
    {
      label: "Friction pressure",
      value: `${average(dashboards.map((item) => item.health.unanswered_rate))}%`,
      delta: "Unresolved developer confusion",
      direction: "down" as const,
      context: "Highlights where the user experience is harder than the current product story suggests."
    },
    {
      label: "Onboarding truth",
      value: `${average(dashboards.map((item) => item.health.activation_score))}`,
      delta: "Docs and setup alignment",
      direction: "up" as const,
      context: "Measures how closely onboarding claims match what developers can actually do."
    },
    {
      label: "Proof clarity",
      value: `${average(dashboards.map((item) => item.health.roi_score))}`,
      delta: "Evidence packaging strength",
      direction: "up" as const,
      context: "Shows whether real developer wins are visible enough to support launches, docs, and messaging."
    }
  ];

  return (
    <main className="space-y-6">
      <PageHeader
        eyebrow="Briefing"
        title="See where API and SDK positioning breaks in the real world."
        description="Narrative Gap MCP gives DevRel and product marketing teams a live read on onboarding friction, message drift, proof gaps, and release credibility."
        actions={
          <div className="rounded-[26px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4 text-sm leading-6 text-[var(--muted)]">
            Built for teams whose growth depends on developer trust: APIs, SDKs, platform tooling, and AI products.
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

      {drafts.length > 0 ? (
        <section className="glass rounded-[30px] p-5 md:p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Setup</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">Connect a product source before review starts.</h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)]">
            Add the repository owner, repository name, positioning claim, onboarding promise, and proof goal in Sources.
            Until then, this product will stay intentionally empty instead of pretending it already knows your product story.
          </p>
        </section>
      ) : null}

      {dashboards.length > 0 ? <BenchmarkStrip metrics={benchmarkMetrics} /> : null}

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="Tracked Products" kicker="Narrative Surface">
          {dashboards.length === 0 ? (
            <div className="empty-state rounded-[28px] p-6 text-sm leading-6 text-[var(--muted)]">
              Add a real GitHub source in Sources, then refresh evidence to generate the product review.
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
                      <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Alignment</p>
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

        <SectionCard title="MCP Workflows" kicker="Repair System">
          <WorkflowInsights
            items={[
              {
                id: "portfolio-gap-review",
                title: "Narrative review",
                summary: "Compare launch claims and docs positioning against the questions developers ask after first contact.",
                owner: "Product marketing",
                status: "scale"
              },
              {
                id: "portfolio-friction-repair",
                title: "Friction repair",
                summary: "Turn setup confusion and repeat support loops into better onboarding, docs, and message clarity.",
                owner: "DevRel",
                status: "act"
              },
              {
                id: "portfolio-proof-loop",
                title: "Proof packaging",
                summary: "Convert merged fixes and user wins into proof that sales, launches, and DevRel can all reuse.",
                owner: "Growth",
                status: "scale"
              }
            ]}
          />
        </SectionCard>
      </section>
    </main>
  );
}
