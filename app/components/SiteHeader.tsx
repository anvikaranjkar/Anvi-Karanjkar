"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  ["Projects", "/projects"],
  ["Experience", "/experience"],
  ["Contact", "/contact"],
  ["Games", "/games"],
];

export function SiteHeader() {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("theme");
    const shouldUseDark = saved === "dark";
    document.documentElement.dataset.theme = shouldUseDark ? "dark" : "light";
    const frame = requestAnimationFrame(() => setDark(shouldUseDark));
    return () => cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    window.localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <header className="site-header">
      <Link href="/" className="site-name" aria-label="Anvi Karanjkar home">
        <span aria-hidden="true">◆</span> Anvi
      </Link>
      <nav aria-label="Main navigation">
        {links.map(([label, href]) => (
          <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>
        ))}
      </nav>
      <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${dark ? "light" : "dark"} mode`}>
        <span aria-hidden="true">◐</span>
        {dark ? "Light mode" : "Dark mode"}
      </button>
    </header>
  );
}
