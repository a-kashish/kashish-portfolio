import type { Metadata } from "next";
import { Newsreader, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Fonts are loaded once at the root and exposed as CSS variables to be
// referenced from globals.css. Keeping subsets tight to shave bundle size.
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: ["400", "500", "600"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kashish Arora — Software Engineer · Agentic AI",
  description:
    "Kashish Arora — software engineer building agentic AI: systems where a model plans, calls the right tools, and stays grounded in real data.",
  openGraph: {
    title: "Kashish Arora — Software Engineer · Agentic AI",
    description:
      "Portfolio and an interactive explainer on how an AI agent answers a question.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${instrument.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
