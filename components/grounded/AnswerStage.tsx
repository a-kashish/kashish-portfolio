"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CannedAnswer, ScoredOffer } from "@/lib/grounded/types";
import styles from "./AnswerStage.module.css";

// The answer renderer replaces [o-XX] tokens with clickable citation chips
// that scroll back to the corresponding doc row in stage 3.
function renderWithCitations(text: string) {
  const parts = text.split(/(\[o-\d+\])/g);
  return parts.map((part, i) => {
    const m = part.match(/^\[(o-\d+)\]$/);
    if (!m) return <span key={i}>{part}</span>;
    const id = m[1];
    return (
      <a
        key={i}
        href={`#doc-${id}`}
        className={styles.cite}
        aria-label={`Citation ${id}, jump to retrieved doc`}
      >
        {id}
      </a>
    );
  });
}

// Templated fallback for free-text queries: build a grounded string from
// top retrieved docs, and a canned confidently-wrong string for the ungrounded
// case. We stay deterministic (no LLM) and honest (we tell the user this is a
// template).
function templatedAnswer(retrieved: ScoredOffer[]): CannedAnswer {
  const top = retrieved.slice(0, 3);
  const grounded =
    top.length === 0
      ? "No matching offers were retrieved, so there's nothing to ground on."
      : "Top retrieved matches: " +
        top
          .map(
            (r) =>
              `${r.offer.store} at ${(r.offer.cashbackRate * 100).toFixed(0)}% for ${r.offer.memberTier}-tier [${r.offer.id}]`,
          )
          .join("; ") +
        ".";
  return {
    grounded,
    ungrounded:
      "You get roughly 10–15% cashback on most purchases across the platform, with occasional 25% bonuses on flagship stores.",
    cited: top.map((t) => t.offer.id),
  };
}

export function AnswerStage({
  cannedAnswer,
  retrieved,
  grounded,
  isPreset,
}: {
  cannedAnswer: CannedAnswer | null;
  retrieved: ScoredOffer[];
  grounded: boolean;
  isPreset: boolean;
}) {
  const reduced = useReducedMotion();
  const answer = cannedAnswer ?? templatedAnswer(retrieved);
  const text = grounded ? answer.grounded : answer.ungrounded;

  return (
    <>
      <motion.div
        key={`${grounded}-${text}`} // remount on toggle for a clean fade
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.35, ease: [0.2, 0.7, 0.2, 1] }}
        className={`${styles.answer} ${grounded ? styles.answerGrounded : styles.answerUngrounded}`}
      >
        <span className={`${styles.tag} ${grounded ? styles.tagOn : styles.tagOff}`}>
          {grounded ? "grounded" : "ungrounded"}
        </span>
        <p className={styles.text}>{renderWithCitations(text)}</p>
        {!grounded && (
          <div className={styles.warning}>
            ⚠ Not backed by retrieved data — the agent may be making this up.
          </div>
        )}
      </motion.div>

      {!isPreset && (
        <div className={styles.presetOnly}>
          Free-text queries use a templated answer built from the retrieved docs
          above (or a canned generic string when ungrounded). Preset questions
          have hand-authored answers.
        </div>
      )}
    </>
  );
}
