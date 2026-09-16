import type { Flow } from "@/components/portfolio/data";

export type SectionId = "projects" | "capabilities" | "approach";

export type NavigationItem = {
  id: SectionId;
  label: string;
};

export type Capability = {
  title: string;
  statement: string;
  terms: readonly string[];
};

export type BookingReliabilityProofExperience = {
  kind: "booking-reliability";
  eyebrow: string;
  heading: string;
  boundary: string;
  rows: readonly {
    label: string;
    pendingValue: string;
    resolvedValue: string;
    resolvedAt: number;
    tone: "verified" | "failed" | "recovered";
  }[];
  outcomeHeading: string;
  outcomeBody: string;
};

export type ProjectProofExperience = BookingReliabilityProofExperience;

export type ProjectViewModel = {
  slug: string;
  title: string;
  problem: string;
  solution: string;
  stack: readonly string[];
  featured: boolean;
  caseStudyPath?: string;
  caseStudyLabel?: string;
  proofExperience?: ProjectProofExperience;
  hardPart?: string;
  flow?: Flow;
};

export type HeroContent = {
  role: string;
  headline: string;
  support: string;
  callLabel: string;
};

export type ConversationContent = {
  heading: string;
  supportLines: readonly string[];
  callLabel: string;
  duration: string;
};

export type MetadataContent = {
  title: string;
  description: string;
};
