import type { Content } from "@/lib/content";
import styles from "./Experience.module.css";

export function Experience({ content }: { content: Content }) {
  return (
    <section
      id="experience"
      className={styles.section}
      aria-labelledby="experience-heading"
    >
      <div className={styles.eyebrow} id="experience-heading">
        Experience
      </div>
      <ol className={styles.timeline}>
        {content.experience.map((e) => (
          <li key={`${e.company}-${e.dateRange}`} className={styles.entry}>
            <div className={styles.date}>{e.dateRange}</div>
            <div>
              <h3 className={styles.header}>
                {e.role} ·{" "}
                {e.companyHref ? (
                  <a
                    className={styles.company}
                    href={e.companyHref}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {e.company}
                  </a>
                ) : (
                  <span className={styles.company}>{e.company}</span>
                )}
              </h3>
              <p className={styles.body}>{e.body}</p>
              <div className={styles.tags} aria-label="Technologies">
                {e.tags.map((t) => (
                  <span key={t} className={styles.tag}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
      <a
        className={styles.more}
        href={content.resumeHref}
        target="_blank"
        rel="noreferrer noopener"
      >
        View full résumé ↗
      </a>
    </section>
  );
}
