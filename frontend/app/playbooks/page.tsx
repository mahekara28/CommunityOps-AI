import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { WorkflowInsights } from "@/components/workflow-insights";
import { getPortfolioData } from "@/lib/server-data";

export default async function PlaybooksPage() {
  const { dashboards, errors, drafts } = await getPortfolioData();

  return (
    <main className="space-y-6">
      <PageHeader
        eyebrow="Repair Plans"
        title="Turn product drift into a repair plan."
        description="Focus this page on what to fix next, who should own it, and which evidence should improve once the message and experience are aligned again."
      />

      <WorkflowInsights
        items={[
          {
            id: "playbook-claim-repair",
            title: "Claim repair",
            summary: "Tighten positioning so the product promise matches what a new developer can actually achieve today.",
            owner: "DevRel",
            status: "act"
          },
          {
            id: "playbook-doc-repair",
            title: "Docs repair",
            summary: "Use repeated support friction to rewrite setup, onboarding, and troubleshooting guidance.",
            owner: "Docs",
            status: "scale"
          },
          {
            id: "playbook-proof-repair",
            title: "Proof repair",
            summary: "Package real user wins and shipped improvements into proof that buyers and builders can both trust.",
            owner: "Product marketing",
            status: "scale"
          }
        ]}
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
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Before planning</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Repair plans appear after live evidence is connected.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)]">
            Add a real GitHub repository in Sources and refresh the feed. This page stays empty until it has real product evidence to work from.
          </p>
        </section>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-2">
        {dashboards.map((dashboard) => (
          <SectionCard
            key={dashboard.community.slug}
            title={dashboard.community.name}
            kicker="Narrative Repairs"
          >
            <div className="grid gap-4">
              {dashboard.recommendations.map((item) => (
                <article key={item.id} className="rounded-[26px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <span className="rounded-full border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                      {item.priority}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.impact}</p>
                  <div className="mt-4 rounded-[18px] border border-[var(--border)] bg-[var(--surface-subtle)] p-3 text-sm leading-6">
                    <span className="font-medium">Metric target:</span> {item.metric_target}
                  </div>
                </article>
              ))}
            </div>
          </SectionCard>
        ))}
      </div>
    </main>
  );
}
