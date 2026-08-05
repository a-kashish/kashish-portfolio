import { content } from "@/lib/content";
import { Sidebar } from "@/components/Sidebar";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Sidebar content={content} />
      <main className={styles.main}>
        <div className={styles.inner}>
          <About content={content} />
          <Experience content={content} />
          <Projects content={content} />
          <Footer content={content} />
        </div>
      </main>
    </div>
  );
}
