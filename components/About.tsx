import type { Content } from "@/lib/content";
import styles from "./About.module.css";

export function About({ content }: { content: Content }) {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={styles.eyebrow} id="about-heading">
        About
      </div>
      <div className={styles.body}>
        {content.about.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
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
