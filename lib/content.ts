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
    paragraphs: string[]; // supports inline [label](href) markdown links; nothing else
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
  tagline: "I build AI agents.",
  sections: [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/a-kashish" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kashisharo/" },
    { label: "Email", href: "mailto:kashish.arora@vanderbilt.edu" },
  ],
  resumeHref: "/Kashish_Arora_Resume.pdf",

  about: {
    paragraphs: [
      "Hi, I'm Kashish. I'm a Cornelius Vanderbilt Scholar studying computer science and applied math at Vanderbilt, and I build AI agents.",
      "Right now I'm interning at [ID.me](https://id.me), where I built Member Assistant, a conversational AI agent that answers member questions across three of their products. It runs on Google's Agent Development Kit as a single Spring Boot service, and grounds its answers in over 10,000 offers across 500+ stores using Vertex AI Search, Elasticsearch, and Postgres, reaching 94% answer relevance. Before that I rebuilt the backend for a learning platform used by 3,800 students at Be The Source, and built a RAG pipeline at Trigyn.",
      "Outside of work I've built a few things I care about, like FinCoach AI, a bilingual app that teaches students about money, and a financial literacy curriculum that got taught in schools across New Jersey. I'm also broadly interested in machine learning and where it's headed.",
      "I care a lot about philosophy too, especially ethics and questions about how we ought to live, and it shapes how I think about the technology I build. When I'm not coding, you can find me bouldering, hiking, shooting film photography, or singing.",
    ],
    chips: [
      { label: "94% answer relevance" },
      { label: "3,800+ users served" },
      { label: "p95 latency ↓35%" },
    ],
  },

  experience: [
    {
      dateRange: "Jun 2026 - Present",
      role: "SWE Intern",
      company: "ID.me",
      companyHref: "https://id.me",
      body: "I built Member Assistant, a conversational AI agent that answers member questions across three ID.me products from a single Spring Boot service on Google's Agent Development Kit. I designed a tool layer that lets it pull from Vertex AI Search, Elasticsearch, and Postgres, grounding answers in over 10,000 offers across 500+ stores at 94% relevance, and cut p95 latency by about 35%. I also shipped the first store search and offer retrieval in the shop API.",
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
      dateRange: "Aug 2025 - Jun 2026",
      role: "Full-Stack Developer",
      company: "Be The Source",
      body: "I rebuilt the backend for a learning platform used by 3,800 students. I wrote 15+ REST endpoints, moved the data onto Postgres, which saved the org about $10K a year, and built a live attendance tracker on top of the Zoom API.",
      tags: ["Node.js", "Express", "PostgreSQL", "Zoom API"],
    },
    {
      dateRange: "Jul 2025 - Aug 2025",
      role: "AI Engineering Intern",
      company: "Trigyn Technologies",
      body: "I built a RAG pipeline over 100+ internal documents, from ingesting and embedding the docs to serving answers through a production API. It cut support tickets by about 30% and answered correctly around 92% of the time.",
      tags: ["Python", "LangChain", "Phi LLM", "RAG"],
    },
  ],

  projects: [
    {
      title: "Member Assistant (ID.me)",
      blurb:
        "The AI agent I built at ID.me. It decides which tool to call, pulls real offers and cashback rates from Vertex AI Search, Elasticsearch, and Postgres, and answers from that data instead of guessing. It covers over 10,000 offers across 500+ stores at 94% answer relevance.",
      tags: ["Java", "Spring Boot", "Google ADK", "RAG"],
      featured: true,
      cta: { label: "Explore the interactive breakdown →", href: "/grounded" },
    },
    {
      title: "FinCoach AI",
      blurb:
        "A bilingual app I built that teaches students about money. It walks 50+ students through budgeting, banking, and getting an ID, and I'm turning it into a curriculum a few New Jersey high schools can use.",
      tags: ["Generative AI", "Prompt Eng."],
      // TODO: link
    },
    {
      title: "RAG Eval Harness",
      blurb:
        "A tool for checking how well a RAG or agent setup answers questions. It runs a fixed set of questions against a synthetic document set, has an LLM grade the answers, and checks those grades against my own labels so the scores mean something. It runs fully on local inference.",
      tags: ["Python", "Local LLM", "Evals"],
      // TODO: link
    },
    {
      title: "Convergence",
      blurb:
        "A tool that pulls all my deadlines from Gmail, Calendar, Slack, and Canvas into one place, so I stop missing things across school and work.",
      tags: ["APIs", "Full-Stack"],
      // TODO: link
    },
  ],

  location: "Nashville · Bay Area",
  year: 2026,
};
