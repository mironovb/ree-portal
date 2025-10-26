"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  // Lazy-init from localStorage (runs only on the client during hydration)
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return true; // SSR default
    try {
      const saved = localStorage.getItem("theme-dark");
      if (saved === "1") return true;
      if (saved === "0") return false;
    } catch {}
    return true; // default to dark
  });

  // Sync <html class="dark"> and persist preference whenever 'dark' changes.
  // (No setState inside effect -> linter is happy.)
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme-dark", dark ? "1" : "0");
    } catch {}
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark((v) => !v)}
      aria-label="Toggle theme"
      className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-secondary"
    >
      {/* The label can differ between server and client on first paint.
          Tell React to ignore that initial mismatch. */}
      <span suppressHydrationWarning>{dark ? "Dark" : "Light"}</span>
    </button>
  );
}
