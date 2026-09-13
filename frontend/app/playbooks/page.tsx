import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { WorkflowInsights } from "@/components/workflow-insights";
import { getPortfolioData } from "@/lib/server-data";

export default async function PlaybooksPage() {
  const { dashboards, errors } = await getPortfolioData();

  return (
    <main className="space-y-6">
      <PageHeader
        eyebrow="Playbooks"
        title="Recommended actions that feel execution-ready."
        description="Focus this page on what the team should do next, who owns it, and which signal or metric will prove the action worked."
      />

      <WorkflowInsights
        items={[
          {
            id: "playbook-activation",
            title: "Activation playbook",
            summary: "Turn repeated onboarding friction into guided assets and opinionated starter paths.",
            owner: "DevRel",
            status: "act"
          },
          {
            id: "playbook-support",
            title: "Support deflection playbook",
            summary: "Reduce maintainer drag by separating reusable questions from real blockers.",
            owner: "Community ops",
            status: "scale"
          },
          {
            id: "playbook-roi",
            title: "Proof loop playbook",
            summary: "Translate community activity into reporting that leadership and marketing can actually use.",
            owner: "Developer marketing",
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

      <div className="grid gap-6 xl:grid-cols-2">
        {dashboards.map((dashboard) => (
          <SectionCard
            key={dashboard.community.slug}
            title={dashboard.community.name}
            kicker="Recommended Actions"
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
