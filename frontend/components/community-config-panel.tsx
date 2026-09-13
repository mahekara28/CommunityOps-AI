"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { syncCommunity, updateCommunityConfig } from "@/lib/api";
import { CommunityProfile, CommunityUpdateRequest } from "@/lib/types";

interface CommunityConfigPanelProps {
  community: CommunityProfile;
}

export function CommunityConfigPanel({ community }: CommunityConfigPanelProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState("");
  const [form, setForm] = useState<CommunityUpdateRequest>({
    repo_owner: community.repo_owner,
    repo_name: community.repo_name,
    docs_url: community.docs_url,
    github_token_env: community.github_token_env,
    sync_mode: "live",
    strategic_focus: community.strategic_focus
  });

  function updateField<K extends keyof CommunityUpdateRequest>(key: K, value: CommunityUpdateRequest[K]) {
    setForm((current) => ({
      ...current,
      [key]: value
    }));
  }

  function handleSave() {
    setStatus("Saving repository mapping...");
    startTransition(async () => {
      try {
        await updateCommunityConfig(community.slug, form);
        setStatus("Repository updated. Refreshing workspace...");
        router.refresh();
      } catch {
        setStatus("Save failed. Check backend server and try again.");
      }
    });
  }

  function handleSync() {
    setStatus("Refreshing GitHub intelligence...");
    startTransition(async () => {
      try {
        await syncCommunity(community.slug);
        setStatus("Sync complete. Refreshing workspace...");
        router.refresh();
      } catch {
        setStatus("Sync failed. Verify the repository path, visibility, and GitHub token.");
      }
    });
  }

  return (
    <section className="glass rounded-[32px] p-6 md:p-7">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">GitHub Source</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">{community.name}</h2>
        </div>
        <p className="text-sm text-[var(--muted)]">
          Map the repository once, then keep intelligence fresh with manual refreshes whenever the team needs an updated read.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Repo owner</span>
          <input
            value={form.repo_owner}
            onChange={(event) => updateField("repo_owner", event.target.value)}
            className="rounded-[18px] border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 outline-none"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Repo name</span>
          <input
            value={form.repo_name}
            onChange={(event) => updateField("repo_name", event.target.value)}
            className="rounded-[18px] border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 outline-none"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Docs URL</span>
          <input
            value={form.docs_url}
            onChange={(event) => updateField("docs_url", event.target.value)}
            className="rounded-[18px] border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 outline-none"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Token env var</span>
          <input
            value={form.github_token_env}
            onChange={(event) => updateField("github_token_env", event.target.value)}
            className="rounded-[18px] border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 outline-none"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4">
        <label className="grid gap-2">
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            Strategic focus
          </span>
          <input
            value={form.strategic_focus.join(", ")}
            onChange={(event) =>
              updateField(
                "strategic_focus",
                event.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean),
              )
            }
            className="rounded-[18px] border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 outline-none"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-[var(--muted)]">{status || "Ready to save the repo source or refresh live data."}</p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={isPending}
            onClick={handleSave}
            className="button-secondary"
          >
            Save source
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={handleSync}
            className="button-primary"
          >
            Refresh sync
          </button>
        </div>
      </div>
    </section>
  );
}
