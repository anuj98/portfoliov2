"use client";

import { useEffect, useState } from "react";
import styles from "@/app/components/navBar.module.css";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored ? stored === "dark" : prefersDark;

    if (stored) {
      document.documentElement.dataset.theme = stored;
    }

    setIsDark(dark);
    setMounted(true);
  }, []);

  function toggle() {
    const next = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    setIsDark(!isDark);
  }

  // Render invisible placeholder during SSR to avoid hydration mismatch
  if (!mounted) {
    return <div className={styles.themeToggle} aria-hidden="true" />;
  }

  return (
    <button
      className={styles.themeToggle}
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? "☀" : "☾"}
    </button>
  );
}
