"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { ThemeToggle } from "@/components/theme-toggle";

const navigation = [
  { href: "/", label: "Briefing" },
  { href: "/signals", label: "Gap Map" },
  { href: "/playbooks", label: "Repair Plans" },
  { href: "/workspace", label: "Sources" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname.startsWith(href);
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="page-fade min-h-screen px-3 py-3 md:px-5 md:py-5">
      <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-[1600px] gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="glass rounded-[36px] px-5 py-6 lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)]">
          <div className="flex h-full flex-col">
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-strong)] shadow-[0_0_18px_var(--accent-glow)]" />
                  <p className="text-xs uppercase tracking-[0.32em] text-[var(--muted)]">Narrative Gap MCP</p>
                </div>
                <ThemeToggle />
              </div>
              <h1 className="mt-6 text-[2.45rem] leading-[0.98] tracking-[-0.04em]">
                Go-to-market
                <br />
                versus
                <br />
                developer reality.
              </h1>
              <p className="mt-4 max-w-[15rem] text-sm leading-6 text-[var(--muted)]">
                Built for DevRel, product marketing, and platform teams shipping APIs, SDKs, and AI developer products.
              </p>
            </div>

            <nav className="mt-8 grid gap-2">
              {navigation.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`nav-pill rounded-[22px] px-4 py-3 text-sm transition ${
                      active
                        ? "nav-pill-active text-[var(--text)] shadow-[var(--shadow-soft)]"
                        : "bg-[var(--surface-subtle)] text-[var(--muted)] hover:bg-[var(--surface-elevated)]"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span>{item.label}</span>
                      <span
                        className={`h-2 w-2 rounded-full transition ${
                          active ? "bg-[var(--accent-strong)]" : "bg-[var(--muted-soft)]"
                        }`}
                      />
                    </span>
                  </a>
                );
              })}
            </nav>

            <div className="mt-8 rounded-[28px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4 shadow-[var(--shadow-soft)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Evidence Workspace</p>
                  <p className="mt-3 text-2xl font-semibold tracking-tight">API and SDK teams</p>
                  <p className="text-sm text-[var(--muted)]">Launch, docs, and onboarding review</p>
                </div>
                <div className="rounded-full border border-[var(--border-strong)] bg-[var(--surface-subtle)] px-3 py-1 text-xs uppercase tracking-[0.22em] text-[var(--accent-strong)]">
                  Live source
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                Connect the product repo, refresh live evidence, and inspect where the message breaks for real builders.
              </p>
            </div>

            <div className="mt-auto rounded-[28px] border border-[var(--border)] bg-[linear-gradient(160deg,var(--surface-contrast),var(--surface-contrast-2))] p-4 text-[var(--contrast-text)] shadow-[var(--shadow-soft)]">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--contrast-muted)]">Focus</p>
              <p className="mt-3 text-sm leading-6 text-[var(--contrast-text)]">
                Catch onboarding friction, weak proof, and message drift before they slow adoption or damage trust.
              </p>
            </div>
          </div>
        </aside>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
