"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { corpus } from "@/lib/grounded/corpus";
import { rankAll } from "@/lib/grounded/scoring";
import { routeQuery } from "@/lib/grounded/router";
import { findQuestion, presetQuestions } from "@/lib/grounded/questions";
import { Stage } from "@/components/grounded/Stage";
import { AskStage } from "@/components/grounded/AskStage";
import { PlanStage } from "@/components/grounded/PlanStage";
import { RetrieveStage } from "@/components/grounded/RetrieveStage";
import { GroundToggleStage } from "@/components/grounded/GroundToggleStage";
import { AnswerStage } from "@/components/grounded/AnswerStage";
import styles from "./page.module.css";

// Single source of state for the whole simulation.
// - questionId  : which preset is selected, or null for free text
// - queryText   : the actual string flowing through the pipeline
// - grounded    : the ground/ungrounded toggle
//
// Everything downstream (route, retrieved, answer) is *derived* from these
// three values, so changing the question at stage 1 propagates end-to-end.

const DEFAULT_QUESTION_ID = presetQuestions[0].id;

export default function GroundedPage() {
  const [questionId, setQuestionId] = useState<string | null>(DEFAULT_QUESTION_ID);
  const [queryText, setQueryText] = useState<string>(presetQuestions[0].text);
  const [grounded, setGrounded] = useState<boolean>(true);

  const preset = questionId ? findQuestion(questionId) : undefined;

  // Prefer the preset's route (deterministic, curated) when a preset is chosen;
  // otherwise use the router heuristics on the free-text query.
  const route = useMemo(
    () => (preset ? preset.route : routeQuery(queryText)),
    [preset, queryText],
  );

  const ranked = useMemo(() => rankAll(queryText, corpus), [queryText]);
  const topKIds = useMemo(() => new Set(ranked.slice(0, 3).map((r) => r.offer.id)), [ranked]);

  const handlePreset = (id: string) => {
    const q = findQuestion(id);
    if (!q) return;
    setQuestionId(id);
    setQueryText(q.text);
  };

  const handleFreeText = (text: string) => {
    setQueryText(text);
    setQuestionId(null); // typing invalidates the preset selection
  };

  return (
    <main className={styles.wrap}>
      <div className={styles.topbar}>
        <Link href="/" className={styles.back}>
          ← Kashish Arora
        </Link>
        <span className={styles.crumb}>Interactive · agentic AI</span>
      </div>

      <h1 className={styles.title}>How an AI agent answers a question.</h1>
      <p className={styles.subtitle}>
        A live, deterministic walk through the pipeline behind Member Assistant —
        the agent I built at ID.me. Pick a question, watch it get routed to a
        tool, see what gets retrieved, and toggle grounding on and off to see
        the difference it makes. Every stage is client-side and reproducible.
      </p>

      <div className={styles.stages}>
        <Stage
          num="1"
          title="Ask"
          subtitle="A user question is the input to the whole pipeline. Pick a preset or type your own — every downstream stage will update."
        >
          <AskStage
            questionId={questionId}
            queryText={queryText}
            onPreset={handlePreset}
            onFreeText={handleFreeText}
          />
        </Stage>

        <Stage
          num="2"
          title="Plan · route to a tool"
          subtitle="The agentic core. Given the question, the agent decides which tool to call. In production this is an LLM classifier; here it's a keyword router so the choice is inspectable."
        >
          <PlanStage route={route} retrieved={ranked.slice(0, 3)} grounded={grounded} />
        </Stage>

        <Stage
          num="3"
          title="Retrieve · score every doc"
          subtitle="The chosen tool scores every offer in the corpus against the query. Bars are literal — the height is the score. The top 3 (highlighted) are what the agent will actually reason over."
        >
          <RetrieveStage ranked={ranked} topKIds={topKIds} />
        </Stage>

        <Stage
          num="4"
          title="Ground · vs. ungrounded"
          subtitle="The core interaction. When ungrounded, the agent answers from parametric memory alone and can invent numbers with total confidence. When grounded, it composes strictly from what was retrieved."
        >
          <GroundToggleStage grounded={grounded} onToggle={setGrounded} />
        </Stage>

        <Stage
          num="5"
          title="Answer · with citations"
          subtitle="The final response. In the grounded case each claim links back to the retrieved doc it came from — click a citation to jump back to stage 3."
        >
          <AnswerStage
            cannedAnswer={preset ? preset.answer : null}
            retrieved={ranked}
            grounded={grounded}
            isPreset={!!preset}
          />
        </Stage>
      </div>

      <div className={styles.footnote}>
        Retrieval, routing, and answers here are simulated for illustration —
        no LLM calls, no network, no state persists past a refresh. In
        production the corpus is real, the scorer is an embedding index, and
        the answers come from a grounded LLM.
      </div>
    </main>
  );
}
