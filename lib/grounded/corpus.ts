import type { Offer } from "./types";

// Hand-authored micro-corpus that stands in for what would otherwise be an
// Elasticsearch / Vertex Search index in production. Deliberately small so the
// scoring stage remains inspectable at a glance.

export const corpus: Offer[] = [
  {
    id: "o-01",
    store: "Trader Joe's",
    category: "grocery",
    cashbackRate: 0.03,
    memberTier: "member",
    blurb:
      "3% cashback on all in-store grocery purchases for verified members. Excludes gift cards and alcohol.",
  },
  {
    id: "o-02",
    store: "Whole Foods",
    category: "grocery",
    cashbackRate: 0.05,
    memberTier: "plus",
    blurb:
      "5% cashback on grocery for Plus members. Stacks with Prime discounts at checkout.",
  },
  {
    id: "o-03",
    store: "Sprouts",
    category: "grocery",
    cashbackRate: 0.04,
    memberTier: "member",
    blurb:
      "4% cashback on produce and pantry basics; expires end of quarter.",
  },
  {
    id: "o-04",
    store: "REI",
    category: "outdoor",
    cashbackRate: 0.08,
    memberTier: "plus",
    blurb:
      "8% cashback on outdoor gear and apparel for Plus members. Excludes bikes and workshops.",
  },
  {
    id: "o-05",
    store: "Patagonia",
    category: "outdoor",
    cashbackRate: 0.06,
    memberTier: "member",
    blurb:
      "6% cashback on all apparel and gear; verified members only, in-store and online.",
  },
  {
    id: "o-06",
    store: "Delta Air Lines",
    category: "travel",
    cashbackRate: 0.04,
    memberTier: "elite",
    blurb:
      "4% cashback on domestic flights for Elite members. Booked directly through delta.com.",
  },
  {
    id: "o-07",
    store: "Marriott",
    category: "travel",
    cashbackRate: 0.05,
    memberTier: "plus",
    blurb:
      "5% cashback on hotel stays at participating properties for Plus and Elite members.",
  },
  {
    id: "o-08",
    store: "Apple",
    category: "electronics",
    cashbackRate: 0.02,
    memberTier: "member",
    blurb:
      "2% cashback on accessories and select refurbished devices. iPhone excluded.",
  },
  {
    id: "o-09",
    store: "Best Buy",
    category: "electronics",
    cashbackRate: 0.03,
    memberTier: "plus",
    blurb:
      "3% cashback on electronics for Plus members. Not valid on Apple products.",
  },
  {
    id: "o-10",
    store: "Nike",
    category: "apparel",
    cashbackRate: 0.05,
    memberTier: "member",
    blurb:
      "5% cashback on footwear and apparel for verified members. Stacks with Nike Member pricing.",
  },
  {
    id: "o-11",
    store: "Lululemon",
    category: "apparel",
    cashbackRate: 0.04,
    memberTier: "plus",
    blurb:
      "4% cashback on all in-store apparel for Plus members; hemming service included.",
  },
];
