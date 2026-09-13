import { CommunityProfile } from "@/lib/types";

interface CommunitySelectorProps {
  communities: CommunityProfile[];
  activeSlug: string;
}

export function CommunitySelector({ communities, activeSlug }: CommunitySelectorProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {communities.map((community) => {
        const isActive = community.slug === activeSlug;
        return (
          <a
            key={community.slug}
            href={`/communities/${community.slug}`}
            className={`rounded-full px-4 py-2 text-sm transition ${
              isActive
                ? "button-primary"
                : "border border-[var(--border)] bg-[var(--surface-subtle)] text-[var(--muted)] hover:bg-[var(--surface-elevated)]"
            }`}
          >
            {community.name}
          </a>
        );
      })}
    </div>
  );
}
