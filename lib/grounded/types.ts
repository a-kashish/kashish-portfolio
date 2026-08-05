// Types for the /grounded simulation. The whole page is 100% client-side and
// deterministic — swapping this simulation for real embeddings later should
// only require replacing scoring.ts and questions.ts, not the UI.

export type MemberTier = "member" | "plus" | "elite";

export interface Offer {
  id: string;
  store: string;
  category: string;
  cashbackRate: number; // e.g. 0.05 = 5%
  memberTier: MemberTier;
  blurb: string;
}

export type ToolName = "store_search" | "offer_retrieval" | "general";

export interface ScoredOffer {
  offer: Offer;
  score: number; // 0..1
  matchedTerms: string[]; // for the transparency overlay
}

export interface Route {
  tool: ToolName;
  reason: string;
}

export interface CannedAnswer {
  grounded: string; // may contain [id] tokens that render as citations
  ungrounded: string;
  cited: string[]; // offer ids grounded answer relies on
}

export interface PresetQuestion {
  id: string;
  label: string; // shown as a chip in the UI
  text: string; // full text sent through the pipeline
  route: Route;
  answer: CannedAnswer;
}
