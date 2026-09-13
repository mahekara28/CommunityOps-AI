import { CommunityConfigPanel } from "@/components/community-config-panel";
import { PageHeader } from "@/components/page-header";
import { SourceCreator } from "@/components/source-creator";
import { getCommunities } from "@/lib/api";

export default async function WorkspacePage() {
  const communities = await getCommunities();

  return (
    <main className="space-y-6">
      <PageHeader
        eyebrow="Sources"
        title="Connect the repositories behind the story."
        description="Set the product promise, map the GitHub repo, and refresh live evidence from one clean setup surface for APIs, SDKs, and developer products."
        actions={
          <div className="rounded-[26px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Live access</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-sm text-[var(--muted)]">GitHub token</span>
              <span className="rounded-full border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-1 text-xs uppercase tracking-[0.22em] text-[var(--text)]">
                GITHUB_TOKEN
              </span>
            </div>
            <div className="mt-4 border-t border-[var(--border)] pt-4">
              <SourceCreator count={communities.length} compact />
            </div>
          </div>
        }
      />

      <div className="grid gap-6">
        {communities.map((community) => (
          <CommunityConfigPanel key={community.slug} community={community} />
        ))}
      </div>
    </main>
  );
}
