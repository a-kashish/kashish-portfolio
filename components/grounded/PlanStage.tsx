"use client";

import { motion } from "framer-motion";
import type { Route, ScoredOffer } from "@/lib/grounded/types";
import styles from "./PlanStage.module.css";

const TOOL_DESCRIPTIONS: Record<Route["tool"], string> = {
  store_search: "Look up whether a store exists.",
  offer_retrieval: "Fetch matching offers from the corpus.",
  general: "Fall back to a general reply.",
};

export function PlanStage({
  route,
  retrieved,
  grounded,
}: {
  route: Route;
  retrieved: ScoredOffer[];
  grounded: boolean;
}) {
  return (
    <>
      <div className={styles.tools} role="group" aria-label="Available tools">
        {(Object.keys(TOOL_DESCRIPTIONS) as Route["tool"][]).map((t) => {
          const chosen = t === route.tool;
          return (
            <motion.div
              key={t}
              className={`${styles.tool} ${chosen ? styles.toolChosen : ""}`}
              animate={chosen ? { scale: 1.02 } : { scale: 1 }}
              transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <div className={styles.toolName}>{t}()</div>
              <div className={styles.toolDesc}>{TOOL_DESCRIPTIONS[t]}</div>
            </motion.div>
          );
        })}
      </div>

      <div className={styles.reason}>
        <strong>Reason</strong>
        {route.reason}
      </div>

      <AgentTrace route={route} retrieved={retrieved} grounded={grounded} />
    </>
  );
}

function AgentTrace({
  route,
  retrieved,
  grounded,
}: {
  route: Route;
  retrieved: ScoredOffer[];
  grounded: boolean;
}) {
  // The running log — updates deterministically from the current state.
  const lines = [
    <>
      <span className={styles.traceMuted}>plan →</span>{" "}
      <span className={styles.traceKey}>{route.tool}</span>(query)
    </>,
    <>
      <span className={styles.traceMuted}>retrieved →</span>{" "}
      <span className={styles.traceKey}>{retrieved.length}</span> docs
    </>,
    <>
      <span className={styles.traceMuted}>ground →</span>{" "}
      <span className={styles.traceKey}>{grounded ? "true" : "false"}</span>
    </>,
    <>
      <span className={styles.traceMuted}>→</span> answer
    </>,
  ];
  return (
    <div className={styles.trace} aria-live="polite" aria-label="Agent trace">
      {lines.map((line, i) => (
        <div key={i} className={styles.traceLine}>
          {line}
        </div>
      ))}
    </div>
  );
}
