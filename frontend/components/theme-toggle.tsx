"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    if (current === "light" || current === "dark") {
      setTheme(current);
    }
  }, []);

  function applyTheme(nextTheme: Theme) {
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("narrative-gap-theme", nextTheme);
    setTheme(nextTheme);
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={() => applyTheme(isDark ? "light" : "dark")}
      className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-subtle)] text-[var(--text)] shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--surface-elevated)]"
    >
      <span
        className={`text-lg transition duration-300 ${isDark ? "rotate-0 scale-100" : "rotate-180 scale-95"} group-hover:scale-110`}
        aria-hidden="true"
      >
        {isDark ? "☀" : "☾"}
      </span>
    </button>
  );
}
