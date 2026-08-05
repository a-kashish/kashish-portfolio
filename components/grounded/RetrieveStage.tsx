"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ScoredOffer } from "@/lib/grounded/types";
import styles from "./RetrieveStage.module.css";

export function RetrieveStage({
  ranked,
  topKIds,
}: {
  ranked: ScoredOffer[];
  topKIds: Set<string>;
}) {
  const reduced = useReducedMotion();

  if (ranked.length === 0 || ranked.every((r) => r.score === 0)) {
    return (
      <div className={styles.empty}>
        No matching offers — try a different query or one of the presets above.
      </div>
    );
  }

  return (
    <>
      <div className={styles.legend}>
        <span>Doc</span>
        <span>Score</span>
      </div>
      <ol className={styles.list} id="retrieved-list">
        {ranked.map((r) => (
          <ScoredRow key={r.offer.id} r={r} isTop={topKIds.has(r.offer.id)} reduced={!!reduced} />
        ))}
      </ol>
      <div className={styles.hint}>Hover a row to see the doc.</div>
    </>
  );
}

function ScoredRow({
  r,
  isTop,
  reduced,
}: {
  r: ScoredOffer;
  isTop: boolean;
  reduced: boolean;
}) {
  const [open, setOpen] = useState(false);
  const width = `${Math.round(r.score * 100)}%`;

  return (
    <li
      className={`${styles.row} ${isTop ? styles.rowTop : ""}`}
      id={`doc-${r.offer.id}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
      aria-expanded={open}
    >
      <div>
        <div className={styles.store}>{r.offer.store}</div>
        <div className={styles.storeMeta}>
          {r.offer.category} · {r.offer.memberTier}
        </div>
      </div>
      <div className={styles.barTrack}>
        <motion.div
          className={styles.bar}
          initial={reduced ? { width } : { width: 0 }}
          animate={{ width }}
          transition={{ duration: reduced ? 0 : 0.5, ease: [0.2, 0.7, 0.2, 1] }}
        />
      </div>
      <div className={styles.score}>{r.score.toFixed(2)}</div>
      {open && (
        <div className={styles.reveal}>
          {r.offer.blurb}
          {r.matchedTerms.length > 0 && (
            <div className={styles.matched}>
              {r.matchedTerms.map((t) => (
                <span key={t} className={styles.matchedTerm}>
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </li>
  );
}
