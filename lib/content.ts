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
    { label: "GitHub", href: "https://github.com/kashish-aro" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kashisharo/" },
    { label: "Email", href: "mailto:kashish.arora@vanderbilt.edu" },
  ],
  resumeHref: "/resume",

  about: {
    paragraphs: [
      "Hi, I'm Kashish. I'm a Cornelius Vanderbilt Scholar studying computer science and applied math at Vanderbilt, and I build AI agents.",
      "Right now I'm researching execution-guided decompilation in Vanderbilt's Leach Lab with Professor Kevin Leach. This past summer at [ID.me](https://id.me), I built and launched their first production AI shopping assistant, improved search relevance to about 90% on 62 previously failing queries, and reduced p95 latency by about 25%. Before that I rebuilt the backend for a learning platform serving 3,800+ users at Be The Source, and deployed an internal AI knowledge assistant used by 1,500 employees at Trigyn.",
      "Outside of work I've built a few things I care about, like FinCoach AI, a bilingual app that teaches students about money, and a financial literacy curriculum that got taught in schools across New Jersey. I'm also broadly interested in machine learning and where it's headed.",
      "I care a lot about philosophy too, especially ethics and questions about how we ought to live, and it shapes how I think about the technology I build. When I'm not coding, you can find me bouldering, hiking, shooting film photography, or singing.",
    ],
    chips: [
      { label: "62 search queries improved" },
      { label: "3,800+ users served" },
      { label: "p95 latency ↓25%" },
    ],
  },

  experience: [
    {
      dateRange: "Aug 2026 - Present",
      role: "Undergraduate Researcher",
      company: "Vanderbilt University — Leach Lab",
      body: "I work with Professor Kevin Leach on execution-guided decompilation of optimized C binaries, investigating how runtime evidence can help reconstruct source-level data structures and pointer relationships. I'm developing GDB-based dynamic analysis to trace memory accesses and infer struct field offsets, then comparing those observations with decompiler output to evaluate structural recovery across compiler optimizations.",
      tags: ["C", "GDB", "Dynamic Analysis", "Decompilation"],
    },
    {
      dateRange: "Jun 2026 - Aug 2026",
      role: "Software Engineering Intern",
      company: "ID.me",
      companyHref: "https://id.me",
      body: "I owned the development and launch of ID.me's first production AI shopping assistant, building a Java/Spring Boot service with reusable tool integrations and coordinating deployment across eight repositories through SRE, Platform, and Security reviews. I raised search relevance from 0% to about 90% on 62 previously failing queries using LLM query expansion, semantic retrieval over about 10,000 offers, and LLM-based relevance filtering, and reduced p95 latency by about 25% by offloading synchronous calls from Shop's web servers. I also built identity-aware offer ranking that prioritizes verified-community discounts, uses cross-session context from Google ADK Memory Bank, and incorporates Snowflake-derived revenue scores to rank cashback offers.",
      tags: ["Java", "Spring Boot", "Google ADK", "Semantic Retrieval", "Snowflake"],
    },
    {
      dateRange: "Aug 2025 - Jun 2026",
      role: "Full-Stack Developer",
      company: "Be The Source",
      body: "I re-architected the backend for a learning management system serving 3,800+ users, building 15+ REST APIs with Node.js, Express, and PostgreSQL to support new course-management workflows and save the organization over $10K in annual operating costs. I automated administrative work through five or more full-stack features, including a Zoom-integrated attendance tracker that saved 15 hours of manual data entry per week and a certificate generator for course-completion tracking.",
      tags: ["Node.js", "Express", "PostgreSQL", "Zoom API"],
    },
    {
      dateRange: "Jul 2025 - Aug 2025",
      role: "AI Engineering Intern",
      company: "Trigyn Technologies",
      body: "I independently built and deployed an internal AI knowledge assistant used by 1,500 employees across HR, engineering, and operations, answering questions from over 100 company documents and reducing employee support tickets by 30%. I designed the full RAG and evaluation pipeline in Python and LangChain, from document ingestion and semantic retrieval to Phi-based generation and a production API, achieving 92% accuracy on an internal evaluation set of company-specific questions.",
      tags: ["Python", "LangChain", "Phi LLM", "RAG", "Evaluation"],
    },
  ],

  projects: [
    {
      title: "Member Assistant (ID.me)",
      blurb:
        "ID.me's first production AI shopping assistant, which I built and launched as a Java/Spring Boot service. It searches about 10,000 offers and ranks recommendations using verified-community discounts, cross-session context, and cashback revenue scores. Query expansion, semantic retrieval, and LLM filtering raised search relevance from 0% to about 90% on 62 previously failing queries.",
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
