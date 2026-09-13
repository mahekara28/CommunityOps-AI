import { CommunityConfigPanel } from "@/components/community-config-panel";
import { PageHeader } from "@/components/page-header";
import { getCommunities } from "@/lib/api";

export default async function WorkspacePage() {
  const communities = await getCommunities();

  return (
    <main className="space-y-6">
      <PageHeader
        eyebrow="Workspace"
        title="Connected sources, not demo scaffolding."
        description="This is the operational setup page for the product. Keep repository mappings, token expectations, and refresh controls here, but keep the analytics surfaces clean."
        actions={
          <div className="rounded-[26px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4 text-sm leading-6 text-[var(--muted)]">
            This pattern fits the market better than a generic settings page: integrations stay available, but they no longer dominate the main workflow.
          </div>
        }
      />

      <section className="glass rounded-[30px] p-5 md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">GitHub token</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Live sync requirements</h2>
          </div>
          <div className="rounded-full border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-2 text-sm text-[var(--muted)]">
            Expected env var: GITHUB_TOKEN
          </div>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)]">
          CommunityOps AI now loads directly from GitHub repositories. For consistent syncs and higher rate limits,
          run the backend with a valid GitHub token in your environment.
        </p>
      </section>

      <div className="grid gap-6">
        {communities.map((community) => (
          <CommunityConfigPanel key={community.slug} community={community} />
        ))}
      </div>
    </main>
  );
}
