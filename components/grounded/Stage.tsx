import type { ReactNode } from "react";
import styles from "./Stage.module.css";

export function Stage({
  num,
  title,
  subtitle,
  children,
}: {
  num: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={styles.stage}
      aria-labelledby={`stage-${num}`}
    >
      <header className={styles.head}>
        <span className={styles.num}>Stage {num}</span>
        <h2 className={styles.title} id={`stage-${num}`}>
          {title}
        </h2>
      </header>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <div className={styles.body}>{children}</div>
    </section>
  );
}
