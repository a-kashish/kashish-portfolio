import Link from "next/link";
import type { Content, Project } from "@/lib/content";
import styles from "./Projects.module.css";

// The featured project renders as its own panel above the grid so the CTA into
// /grounded is impossible to miss. Non-featured projects render in a 2-col grid.
export function Projects({ content }: { content: Content }) {
  const featured = content.projects.find((p) => p.featured);
  const others = content.projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className={styles.section}
      aria-labelledby="projects-heading"
    >
      <div className={styles.eyebrow} id="projects-heading">
        Projects
      </div>

      {featured && <FeaturedCard project={featured} />}

      <div className={styles.grid}>
        {others.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <article className={styles.featured}>
      <div className={styles.featuredThumb} aria-hidden="true" />
      <div className={styles.featuredBody}>
        <div className={styles.featuredTag}>Featured</div>
        <h3 className={styles.featuredTitle}>{project.title}</h3>
        <p className={styles.featuredBlurb}>{project.blurb}</p>
        {project.cta && (
          <Link href={project.cta.href} className={styles.featuredCta}>
            {project.cta.label}
          </Link>
        )}
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const inner = (
    <>
      <h3 className={styles.cardTitle}>
        {project.title}
        {!project.href && <span className={styles.todo}>TODO link</span>}
      </h3>
      <p className={styles.cardBlurb}>{project.blurb}</p>
      <div className={styles.cardTags}>
        {project.tags.map((t) => (
          <span key={t} className={styles.cardTag}>
            {t}
          </span>
        ))}
      </div>
    </>
  );

  if (project.href) {
    return (
      <a
        href={project.href}
        className={`${styles.card} ${styles.cardLink}`}
        target="_blank"
        rel="noreferrer noopener"
      >
        {inner}
      </a>
    );
  }
  return <article className={styles.card}>{inner}</article>;
}
