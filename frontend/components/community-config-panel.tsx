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
    name: community.name,
    tagline: community.tagline,
    repo_owner: community.repo_owner,
    repo_name: community.repo_name,
    docs_url: community.docs_url,
    github_token_env: community.github_token_env,
    sync_mode: "live",
    strategic_focus: community.strategic_focus,
    positioning_claim: community.positioning_claim,
    onboarding_promise: community.onboarding_promise,
    proof_goal: community.proof_goal
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
    setStatus("Refreshing GitHub evidence...");
    startTransition(async () => {
      try {
        await syncCommunity(community.slug);
        setStatus("Evidence refresh complete. Refreshing sources...");
        router.refresh();
      } catch {
        setStatus("Sync failed. Verify the repository path, visibility, and GitHub token.");
      }
    });
  }

  return (
    <section className="glass section-sheen rounded-[32px] p-6 md:p-7">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">Source</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">{community.name}</h2>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              {form.repo_owner && form.repo_name ? `${form.repo_owner}/${form.repo_name}` : "Awaiting repo mapping"}
            </span>
            <span className="rounded-full border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              {form.github_token_env || "GITHUB_TOKEN"}
            </span>
          </div>
        </div>
        <p className="max-w-xl text-sm leading-6 text-[var(--muted)]">
          Capture the promise first, then attach the repository that proves or breaks it.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Product name</span>
          <input
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="rounded-[18px] border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] outline-none transition hover:border-[var(--border-strong)]"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Short description</span>
          <input
            value={form.tagline}
            onChange={(event) => updateField("tagline", event.target.value)}
            className="rounded-[18px] border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] outline-none transition hover:border-[var(--border-strong)]"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Repo owner</span>
          <input
            value={form.repo_owner}
            onChange={(event) => updateField("repo_owner", event.target.value)}
            className="rounded-[18px] border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] outline-none transition hover:border-[var(--border-strong)]"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Repo name</span>
          <input
            value={form.repo_name}
            onChange={(event) => updateField("repo_name", event.target.value)}
            className="rounded-[18px] border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] outline-none transition hover:border-[var(--border-strong)]"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Docs URL</span>
          <input
            value={form.docs_url}
            onChange={(event) => updateField("docs_url", event.target.value)}
            className="rounded-[18px] border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] outline-none transition hover:border-[var(--border-strong)]"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Token env var</span>
          <input
            value={form.github_token_env}
            onChange={(event) => updateField("github_token_env", event.target.value)}
            className="rounded-[18px] border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] outline-none transition hover:border-[var(--border-strong)]"
          />
        </label>
      </div>

      <div className="mt-6 rounded-[26px] border border-[var(--border)] bg-[var(--surface-subtle)] p-4 md:p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Narrative inputs</p>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          These inputs tell the product what promise to test against real developer evidence.
        </p>
      </div>

      <div className="mt-4 grid gap-4">
        <label className="grid gap-2">
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Positioning claim</span>
          <textarea
            value={form.positioning_claim}
            onChange={(event) => updateField("positioning_claim", event.target.value)}
            className="min-h-24 rounded-[18px] border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] outline-none transition hover:border-[var(--border-strong)]"
            placeholder="What does the product promise at a high level?"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Onboarding promise</span>
          <textarea
            value={form.onboarding_promise}
            onChange={(event) => updateField("onboarding_promise", event.target.value)}
            className="min-h-24 rounded-[18px] border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] outline-none transition hover:border-[var(--border-strong)]"
            placeholder="What do you currently promise about setup or first success?"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Proof goal</span>
          <textarea
            value={form.proof_goal}
            onChange={(event) => updateField("proof_goal", event.target.value)}
            className="min-h-24 rounded-[18px] border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] outline-none transition hover:border-[var(--border-strong)]"
            placeholder="What kind of proof should the product make visible?"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Priority surfaces</span>
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
            className="rounded-[18px] border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] outline-none transition hover:border-[var(--border-strong)]"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-[var(--muted)]">{status || "Save the source, then refresh when you want a new read."}</p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={isPending}
            onClick={handleSave}
            className="button-secondary"
          >
            Save mapping
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={handleSync}
            className="button-primary"
          >
            Refresh evidence
          </button>
        </div>
      </div>
    </section>
  );
}
