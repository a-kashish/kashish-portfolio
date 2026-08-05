// All portfolio copy lives here. Editing this file should never require touching
// a component. Types below are the contract; components consume them read-only.

export type Section = "about" | "experience" | "projects";

export interface Social {
  label: string;
  href: string;
}

export interface Chip {
  label: string;
}

export interface ExperienceEntry {
  dateRange: string;
  role: string;
  company: string;
  companyHref?: string;
  body: string;
  tags: string[];
}

export interface Project {
  title: string;
  blurb: string;
  tags: string[];
  href?: string; // undefined => TODO / not yet linkable
  cta?: { label: string; href: string }; // primary link (e.g. "Explore the interactive breakdown →")
  featured?: boolean;
}

export interface Content {
  name: string;
  role: string;
  tagline: string;
  sections: { id: Section; label: string }[];
  socials: Social[];
  resumeHref: string;
  about: {
    paragraphs: string[];
    chips: Chip[];
  };
  experience: ExperienceEntry[];
  projects: Project[];
  location: string;
  year: number;
}

export const content: Content = {
  name: "Kashish Arora",
  role: "Software Engineer · Agentic AI",
  tagline:
    "Building agents that plan, call tools, and stay grounded in real data.",
  sections: [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/" }, // TODO: fill in
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kashisharora/" },
    { label: "Email", href: "mailto:kashish.arora@vanderbilt.edu" },
  ],
  resumeHref: "/Kashish_Arora_Resume.pdf",

  about: {
    paragraphs: [
      "Hi — I'm Kashish, a CS + Applied Math student at Vanderbilt and a software engineer focused on agentic AI: systems where a model plans, calls the right tools, and stays grounded in real data instead of guessing. Right now I'm a software engineering intern at ID.me, where I architected Member Assistant — a conversational AI agent that orchestrates tools across three products from a single Spring Boot service, built on Google's Agent Development Kit.",
      "Most of my work lives where machine learning meets solid backend engineering: agent orchestration, retrieval pipelines, and the infrastructure that keeps them fast and honest. Before software I competed in extemporaneous debate and co-authored a financial-literacy curriculum for undocumented and unaccompanied minors that scaled across New Jersey — I still care a lot about who a piece of technology is actually for.",
      "Lately I'm going deep on agent frameworks, tool-use reliability, and how you actually evaluate agents. Off the clock: bouldering, film photography, modular synths, and brain–computer interfaces.",
    ],
    chips: [
      { label: "94% answer relevance" },
      { label: "3,800+ users served" },
      { label: "p95 latency ↓35%" },
    ],
  },

  experience: [
    {
      dateRange: "Jun 2026 — Present",
      role: "SWE Intern",
      company: "ID.me",
      companyHref: "https://id.me",
      body: "Architected Member Assistant, a platform-agnostic conversational AI agent serving RAG-grounded answers across three ID.me products from one Java/Spring Boot microservice on Google's ADK. Built a modular tool-abstraction layer decoupling orchestration from data sources (cut p95 latency ~35%) and the first store-search + community-scoped offer retrieval over Elasticsearch and PostgreSQL.",
      tags: [
        "Java",
        "Spring Boot",
        "Google ADK",
        "Gemini",
        "Vertex AI",
        "Elasticsearch",
        "PostgreSQL",
      ],
    },
    {
      dateRange: "Aug 2025 — Jun 2026",
      role: "Full-Stack Developer",
      company: "Be The Source",
      body: "Re-architected the backend for a learning platform serving 3,800+ users: 15+ REST endpoints, a PostgreSQL migration saving $10K/yr, and a real-time attendance tracker wired into the Zoom API.",
      tags: ["Node.js", "Express", "PostgreSQL", "Zoom API"],
    },
    {
      dateRange: "Jul 2025 — Aug 2025",
      role: "AI Engineering Intern",
      company: "Trigyn Technologies",
      body: "Designed and deployed a RAG pipeline (LangChain + Phi) over 100+ company docs, from ingestion and embedding through a production API — cutting support tickets 30% at 92% accuracy.",
      tags: ["Python", "LangChain", "Phi LLM", "RAG"],
    },
  ],

  projects: [
    {
      title: "Member Assistant (ID.me)",
      blurb:
        "A production conversational AI agent that grounds every answer in real data — plans and calls tools across Vertex AI Search, Elasticsearch, and PostgreSQL, retrieves over 10K+ offers and 500+ stores, and returns correct per-member cashback at 94% answer relevance.",
      tags: ["Java", "Spring Boot", "Google ADK", "RAG"],
      featured: true,
      cta: { label: "Explore the interactive breakdown →", href: "/grounded" },
    },
    {
      title: "FinCoach AI",
      blurb:
        "A multilingual (EN/ES) financial-coaching app with a generative-AI core, helping 50+ students navigate budgeting, banking, and ID acquisition; moving toward a licensable NJ high-school curriculum.",
      tags: ["Generative AI", "Prompt Eng."],
      // TODO: link
    },
    {
      title: "RAG Eval Harness",
      blurb:
        "A local, judge-based evaluation pipeline for RAG/agent systems: a synthetic corpus, a ground-truth Q&A set, and an LLM-as-judge scorer validated with Cohen's kappa, all on local inference.",
      tags: ["Python", "Local LLM", "Evals"],
      // TODO: link
    },
    {
      title: "Convergence",
      blurb:
        "A deadline aggregator unifying Gmail, Calendar, Slack, and Canvas into one view.",
      tags: ["APIs", "Full-Stack"],
      // TODO: link
    },
  ],

  location: "Nashville · Bay Area",
  year: 2026,
};
