"use client";

import { useEffect, useState } from "react";
import type { Content, Section } from "@/lib/content";
import styles from "./Sidebar.module.css";

// Sidebar owns the scroll-spy. A single IntersectionObserver watches all
// section anchors and keeps track of which one is closest to the top. We use
// a sorted-by-intersection-ratio approach instead of just "first entering"
// so quickly scrolling past a short section still promotes it correctly.
function useActiveSection(ids: Section[]): Section {
  const [active, setActive] = useState<Section>(ids[0]);

  useEffect(() => {
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => !!n);

    if (nodes.length === 0) return;

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          visibility.set(e.target.id, e.intersectionRatio);
        }
        let best: { id: string; ratio: number } | null = null;
        for (const [id, ratio] of visibility) {
          if (!best || ratio > best.ratio) best = { id, ratio };
        }
        if (best && best.ratio > 0) setActive(best.id as Section);
      },
      {
        // A viewport-tall band biased toward the top so the section a user
        // is *reading* wins over one just entering the bottom edge.
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const n of nodes) observer.observe(n);
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export function Sidebar({ content }: { content: Content }) {
  const active = useActiveSection(content.sections.map((s) => s.id));

  return (
    <aside className={styles.sidebar} aria-label="Site navigation">
      <div>
        <h1 className={styles.name}>{content.name}</h1>
        <div className={styles.role}>{content.role}</div>
      </div>

      <p className={styles.tagline}>{content.tagline}</p>

      <nav className={styles.nav} aria-label="Sections">
        {content.sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`${styles.navLink} ${active === s.id ? styles.navLinkActive : ""}`}
            aria-current={active === s.id ? "true" : undefined}
          >
            <span className={styles.navLine} aria-hidden="true" />
            {s.label}
          </a>
        ))}
      </nav>

      <div className={styles.spacer} />

      <div className={styles.bottom}>
        <div className={styles.socials}>
          {content.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className={styles.socialLink}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noreferrer noopener" : undefined}
            >
              {s.label}
            </a>
          ))}
        </div>

        <a
          className={styles.resume}
          href={content.resumeHref}
          target="_blank"
          rel="noreferrer noopener"
        >
          Résumé <span aria-hidden="true">↗</span>
        </a>
      </div>
    </aside>
  );
}
