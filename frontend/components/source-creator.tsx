"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { createCommunity } from "@/lib/api";

interface SourceCreatorProps {
  count: number;
  compact?: boolean;
}

export function SourceCreator({ count, compact = false }: SourceCreatorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  function handleCreate() {
    setMessage("Creating source...");
    startTransition(async () => {
      try {
        await createCommunity();
        setMessage("Source added.");
        router.refresh();
      } catch {
        setMessage("Could not create source.");
      }
    });
  }

  return (
    <div className={`flex ${compact ? "flex-col gap-3" : "flex-col gap-4 md:flex-row md:items-center md:justify-between"}`}>
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          {compact ? "Workspace" : "Add source"}
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">{count} source{count === 1 ? "" : "s"} in this workspace.</p>
      </div>
      <div className={`flex flex-wrap items-center gap-3 ${compact ? "" : ""}`}>
        {message ? <p className="text-sm text-[var(--muted)]">{message}</p> : null}
        <button
          type="button"
          onClick={handleCreate}
          disabled={isPending}
          className={`button-secondary ${compact ? "w-full" : "min-w-[150px]"}`}
        >
          Add source
        </button>
      </div>
    </div>
  );
}
