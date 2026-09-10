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

export type ProjectViewModel = {
  slug: string;
  title: string;
  problem: string;
  solution: string;
  stack: readonly string[];
  featured: boolean;
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
  support: string;
  callLabel: string;
  duration: string;
};

export type MetadataContent = {
  title: string;
  description: string;
};
