import type { PresetQuestion } from "./types";

// The preset questions and their pre-authored answers. Every "AI-generated"
// string on the page is one of these hand-written strings, keyed by question
// id — never sampled, never called out to a model. This is what "deterministic"
// means in the header rule.
//
// Grounded answers contain [id] tokens that the UI renders as inline citations
// linking to the corresponding retrieved offer card in stage 3.

export const presetQuestions: PresetQuestion[] = [
  {
    id: "q-whole-foods",
    label: "Cashback at Whole Foods?",
    text: "Do I get cashback at Whole Foods?",
    route: {
      tool: "offer_retrieval",
      reason: "Question names a specific store — retrieve matching offers.",
    },
    answer: {
      grounded:
        "Yes — Whole Foods offers 5% cashback on groceries for Plus-tier members [o-02]. It stacks with Prime discounts at checkout.",
      ungrounded:
        "Yes — Whole Foods offers 12% cashback on all groceries for all members, and it stacks with any Amazon promo.",
      cited: ["o-02"],
    },
  },
  {
    id: "q-grocery-best",
    label: "Best grocery offer for my tier?",
    text: "What is the best grocery offer for my member tier?",
    route: {
      tool: "offer_retrieval",
      reason:
        "Category query — retrieve all grocery offers and rank by cashback and tier match.",
    },
    answer: {
      grounded:
        "For members, Sprouts is your best grocery pick at 4% cashback [o-03], followed by Trader Joe's at 3% [o-01]. Whole Foods at 5% [o-02] is Plus-tier only.",
      ungrounded:
        "Grocery cashback ranges from 8% to 15% depending on the retailer, and every member tier qualifies for the top rate.",
      cited: ["o-03", "o-01", "o-02"],
    },
  },
  {
    id: "q-outdoor",
    label: "Cashback on outdoor gear?",
    text: "How much cashback do I get on outdoor gear?",
    route: {
      tool: "offer_retrieval",
      reason: "Category query about outdoor — retrieve category-scoped offers.",
    },
    answer: {
      grounded:
        "REI offers 8% cashback on outdoor gear for Plus members [o-04]. Patagonia offers 6% cashback on apparel and gear for all verified members [o-05].",
      ungrounded:
        "You get a flat 20% cashback across all outdoor retailers on our platform, no tier restrictions.",
      cited: ["o-04", "o-05"],
    },
  },
  {
    id: "q-store-search",
    label: "Is Delta on the platform?",
    text: "Does Delta Air Lines have an offer on the platform?",
    route: {
      tool: "store_search",
      reason: "User is asking whether a store exists — route to store search.",
    },
    answer: {
      grounded:
        "Yes — Delta Air Lines is on the platform. Elite members earn 4% cashback on domestic flights booked through delta.com [o-06].",
      ungrounded:
        "Yes — Delta has a flat 10% cashback offer available to every member tier, no exclusions.",
      cited: ["o-06"],
    },
  },
];

export function findQuestion(id: string): PresetQuestion | undefined {
  return presetQuestions.find((q) => q.id === id);
}
