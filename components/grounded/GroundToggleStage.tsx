"use client";

import styles from "./GroundToggleStage.module.css";

export function GroundToggleStage({
  grounded,
  onToggle,
}: {
  grounded: boolean;
  onToggle: (v: boolean) => void;
}) {
  return (
    <>
      <div className={styles.row}>
        <div>
          <div className={styles.label}>Ground the answer in retrieved offers.</div>
          <div className={styles.labelHint}>
            When off, the agent answers from parametric memory alone — and can
            hallucinate confidently. When on, it composes strictly from the
            retrieved documents.
          </div>
        </div>
        <div
          role="switch"
          aria-checked={grounded}
          aria-label="Grounded in retrieval"
          tabIndex={0}
          className={styles.switch}
          onClick={() => onToggle(!grounded)}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              onToggle(!grounded);
            }
          }}
        >
          <span className={styles.thumb} />
        </div>
      </div>
      <div className={styles.state}>
        <span className={grounded ? styles.stateOn : ""}>
          grounded = {String(grounded)}
        </span>
      </div>
    </>
  );
}
