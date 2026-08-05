import type { Content } from "@/lib/content";
import styles from "./Footer.module.css";

export function Footer({ content }: { content: Content }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.credit}>
        Set in <span className={styles.serif}>Newsreader</span>,{" "}
        <span className={styles.sans}>Instrument Sans</span>, and{" "}
        <span className={styles.mono}>JetBrains Mono</span>. Written by hand,
        deployed on Vercel — no CMS, no analytics, no tracking.
      </div>
      <div className={styles.copy}>
        {content.location} — © {content.year} {content.name}.
      </div>
    </footer>
  );
}
