import type { Route, ToolName } from "./types";
import { tokenize } from "./scoring";

// Deterministic tool routing that mirrors the shape of an agent's planning
// step. In a real agent this would be an LLM classifier; here we use simple
// keyword heuristics so behavior is inspectable and matches presets.

const STORE_LOOKUP_HINTS = ["does", "have", "on the platform", "is", "available"];
const RETRIEVE_HINTS = [
  "cashback",
  "offer",
  "best",
  "grocery",
  "gear",
  "apparel",
  "flight",
  "hotel",
  "electronics",
];

export function routeQuery(query: string): Route {
  const lower = query.toLowerCase();

  if (STORE_LOOKUP_HINTS.some((h) => lower.includes(h)) && /(does|is)\b/.test(lower)) {
    return {
      tool: "store_search",
      reason: "User is checking whether a store exists on the platform.",
    };
  }

  const tokens = tokenize(query);
  if (RETRIEVE_HINTS.some((h) => tokens.includes(h))) {
    return {
      tool: "offer_retrieval",
      reason:
        "Query is about cashback rates or categorical offers — retrieve grounded documents.",
    };
  }

  return {
    tool: "general",
    reason: "No specific store or offer signals detected — fall back to a general reply.",
  };
}

export const toolLabels: Record<ToolName, string> = {
  store_search: "store_search",
  offer_retrieval: "offer_retrieval",
  general: "general",
};
