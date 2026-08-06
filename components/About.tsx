import type { Content } from "@/lib/content";
import styles from "./About.module.css";

// Tiny inline-markdown renderer: only handles [label](href). Kept trivial so
// content.ts stays plain strings without dragging in a markdown dependency.
function renderInline(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!m) return <span key={i}>{part}</span>;
    const [, label, href] = m;
    const external = href.startsWith("http");
    return (
      <a
        key={i}
        href={href}
        className={styles.inlineLink}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
      >
        {label}
      </a>
    );
  });
}

export function About({ content }: { content: Content }) {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={styles.eyebrow} id="about-heading">
        About
      </div>
      <div className={styles.body}>
        {content.about.paragraphs.map((p, i) => (
          <p key={i}>{renderInline(p)}</p>
        ))}
      </div>
      <div className={styles.chips} role="list" aria-label="Impact readout">
        {content.about.chips.map((c) => (
          <span key={c.label} className={styles.chip} role="listitem">
            {c.label}
          </span>
        ))}
      </div>
    </section>
  );
}
