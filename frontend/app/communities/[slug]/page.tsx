import { BenchmarkStrip } from "@/components/benchmark-strip";
import { CommunityConfigPanel } from "@/components/community-config-panel";
import { CommunitySelector } from "@/components/community-selector";
import { ContentRadar } from "@/components/content-radar";
import { MetricCard } from "@/components/metric-card";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { SignalFeed } from "@/components/signal-feed";
import { TrendBars } from "@/components/trend-bars";
import { WorkflowInsights } from "@/components/workflow-insights";
import { getCommunityPageData } from "@/lib/server-data";

function priorityClasses(priority: string) {
  if (priority === "critical") return "bg-[rgba(177,63,39,0.12)] text-[var(--critical)]";
  if (priority === "high") return "bg-[rgba(204,95,58,0.14)] text-[var(--accent)]";
  if (priority === "medium") return "bg-[rgba(166,117,38,0.12)] text-[var(--gold)]";
  return "bg-[rgba(13,124,123,0.12)] text-[var(--teal)]";
}

export default async function CommunityDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { communities, community, dashboard, mode, error } = await getCommunityPageData(slug);

  if (!dashboard || !community) {
    return (
      <main className="space-y-6">
        <PageHeader
          eyebrow="Community Detail"
          title="GitHub source needs attention."
          description="This community view could not be generated from GitHub yet. Fix the repository mapping or token flow, then refresh the sync."
          actions={
            <div className="rounded-[26px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4 text-sm leading-6 text-[var(--muted)]">
              {error ?? "No live intelligence is available for this community right now."}
            </div>
          }
        />

        {communities.length > 0 ? (
          <section className="glass rounded-[32px] p-5 md:p-6">
            <CommunitySelector communities={communities} activeSlug={slug} />
          </section>
        ) : null}

        {community ? <CommunityConfigPanel community={community} /> : null}
      </main>
    );
  }

  const data = dashboard;

  return (
    <main className="space-y-6">
      <PageHeader
        eyebrow="Community Detail"
        title={data.community.name}
        description={`${data.community.tagline} Review live GitHub signals, contributor momentum, and operator actions in one focused space.`}
        actions={
          <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4 text-sm leading-6 text-[var(--muted)]">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Sync Status</p>
            <p className="mt-2 text-[var(--text)]">{mode === "live" ? "Live GitHub intelligence" : "Unavailable"} from {data.sync_status.repo}</p>
            <p className="mt-2">Synced {data.sync_status.synced_at.replace("T", " ").replace("Z", " UTC")}</p>
          </div>
        }
      />

      <section className="glass rounded-[32px] p-5 md:p-6">
        <CommunitySelector communities={communities} activeSlug={data.community.slug} />
      </section>

      <BenchmarkStrip metrics={data.benchmark_metrics} />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard eyebrow="Health Score" value={`${data.health.overall_score}/100`} detail={data.health.summary} icon={<span className="text-lg">01</span>} />
        <MetricCard eyebrow="Weekly Active" value={data.community.weekly_active_members.toLocaleString()} detail={`${data.community.growth_rate}% growth rate across the last rolling month.`} tone="teal" icon={<span className="text-lg">02</span>} />
        <MetricCard eyebrow="Activation" value={`${data.health.activation_score}`} detail="Onboarding, docs usage, and early success signals." tone="gold" icon={<span className="text-lg">03</span>} />
        <MetricCard eyebrow="ROI Signal" value={`${data.health.roi_score}`} detail="Evidence that community effort is turning into shipped or provable outcomes." tone="accent" icon={<span className="text-lg">04</span>} />
        <MetricCard eyebrow="Support Time" value={`${data.health.response_time_hours}h`} detail={`Primary channel: ${data.community.primary_channel}. Risk level: ${data.health.risk_level}.`} tone="teal" icon={<span className="text-lg">05</span>} />
      </section>

      <WorkflowInsights items={data.workflow_insights} />

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <SectionCard title="Momentum Arc" kicker="Performance">
          <TrendBars snapshots={data.weekly_snapshots} />
        </SectionCard>

        <SectionCard title="Priority Queue" kicker="Recommended Actions">
          <div className="flex flex-col gap-4">
            {data.recommendations.map((item) => (
              <article key={item.id} className="rounded-[24px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.impact}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] ${priorityClasses(item.priority)}`}>
                    {item.priority}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-[var(--muted)]">
                  <span>{item.owner}</span>
                  <span>{item.due_window}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.rationale}</p>
                <div className="mt-4 rounded-[18px] border border-[var(--border)] bg-[var(--surface-subtle)] p-3 text-sm leading-6">
                  <span className="font-medium">Target:</span> {item.metric_target}
                </div>
              </article>
            ))}
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <SectionCard title="Live Signals" kicker="What Changed">
          <SignalFeed signals={data.live_signals} priorityClasses={priorityClasses} />
        </SectionCard>

        <SectionCard title="Content Radar" kicker="Marketable Opportunities">
          <ContentRadar opportunities={data.content_opportunities} priorityClasses={priorityClasses} />
        </SectionCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <SectionCard title="Champion Network" kicker="Advocacy Engine">
          <div className="space-y-4">
            {data.champions.map((champion) => (
              <article key={champion.username} className="rounded-[24px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{champion.username}</h3>
                    <p className="text-sm text-[var(--muted)]">{champion.role}</p>
                  </div>
                  <p className="text-2xl font-semibold">{champion.score}</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{champion.recent_win}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {champion.specialties.map((specialty) => (
                    <span key={specialty} className="rounded-full border border-[var(--border)] bg-[rgba(15,118,110,0.1)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--teal)]">
                      {specialty}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Activity Feed" kicker="Raw Community Inputs">
          <div className="overflow-hidden rounded-[26px] border border-[var(--border)]">
            {data.activity_feed.map((item, index) => (
              <article
                key={item.id}
                className={`flex flex-col gap-3 bg-[var(--surface-elevated)] p-5 md:flex-row md:items-center md:justify-between ${
                  index !== data.activity_feed.length - 1 ? "border-b border-[var(--border)]" : ""
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">{item.source}</p>
                    {item.labels.slice(0, 2).map((label) => (
                      <span key={`${item.id}-${label}`} className="rounded-full border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                        {label}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-2 text-lg font-medium">{item.title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">by {item.author} • {item.kind.replace("_", " ")}</p>
                </div>
                <div className="rounded-full border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-2 text-sm font-medium">
                  {item.engagement} engagements
                </div>
              </article>
            ))}
          </div>
        </SectionCard>
      </section>

      <CommunityConfigPanel community={data.community} />
    </main>
  );
}
