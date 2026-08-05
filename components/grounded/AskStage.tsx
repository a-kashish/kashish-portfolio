"use client";

import { presetQuestions } from "@/lib/grounded/questions";
import styles from "./AskStage.module.css";

export function AskStage({
  questionId,
  queryText,
  onPreset,
  onFreeText,
}: {
  questionId: string | null;
  queryText: string;
  onPreset: (id: string) => void;
  onFreeText: (text: string) => void;
}) {
  return (
    <>
      <div className={styles.presets} role="group" aria-label="Preset questions">
        {presetQuestions.map((q) => (
          <button
            key={q.id}
            type="button"
            className={`${styles.chip} ${questionId === q.id ? styles.chipActive : ""}`}
            onClick={() => onPreset(q.id)}
            aria-pressed={questionId === q.id}
          >
            {q.label}
          </button>
        ))}
      </div>

      <label className={styles.inputRow}>
        <span className={styles.inputLabel}>Or ask your own</span>
        <input
          className={styles.input}
          type="text"
          value={queryText}
          onChange={(e) => onFreeText(e.target.value)}
          placeholder="Type a question about a store, category, or member tier…"
          spellCheck={false}
        />
      </label>
    </>
  );
}
