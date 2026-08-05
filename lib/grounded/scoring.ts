import type { Offer, ScoredOffer } from "./types";

// Deterministic term-overlap scoring. Intentionally simple so the retrieval
// stage reads as instrumentation, not magic — a user should be able to look
// at the query, look at a doc, and see why the bar is the height it is.
//
// Score = |query_terms ∩ doc_terms| / |query_terms|, plus a small boost per
// match so long queries with many hits sort above short queries with one hit.
// Bounded to [0, 1] for rendering.

const STOP = new Set([
  "a",
  "an",
  "the",
  "is",
  "are",
  "do",
  "does",
  "i",
  "my",
  "for",
  "at",
  "on",
  "in",
  "of",
  "to",
  "get",
  "and",
  "or",
  "with",
  "any",
  "best",
  "me",
  "we",
  "you",
]);

export function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

function docTerms(offer: Offer): string[] {
  return tokenize(`${offer.store} ${offer.category} ${offer.blurb} ${offer.memberTier}`);
}

export function score(query: string, offer: Offer): ScoredOffer {
  const q = new Set(tokenize(query));
  const d = new Set(docTerms(offer));
  if (q.size === 0) return { offer, score: 0, matchedTerms: [] };
  const matched = [...q].filter((t) => d.has(t));
  const overlap = matched.length / q.size;
  // Small linear boost so longer queries with more matches beat shorter ones.
  const boost = Math.min(matched.length * 0.05, 0.2);
  return {
    offer,
    score: Math.min(overlap + boost, 1),
    matchedTerms: matched,
  };
}

export function rankAll(query: string, offers: Offer[]): ScoredOffer[] {
  return offers
    .map((o) => score(query, o))
    .sort((a, b) => b.score - a.score);
}

export function topK(query: string, offers: Offer[], k = 3): ScoredOffer[] {
  return rankAll(query, offers)
    .filter((s) => s.score > 0)
    .slice(0, k);
}
