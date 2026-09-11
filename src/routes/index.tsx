import { createFileRoute } from "@tanstack/react-router";

import { PortfolioV2Page } from "@/components/portfolio-v2/PortfolioV2Page";
import { METADATA } from "@/content/portfolio-v2/content";

const canonicalUrl = "https://leosanga.vercel.app/";
const socialImageUrl = `${canonicalUrl}portfolio-v2/social/leo-sanga-portfolio-v2.jpg`;
const socialImageAlt = "Leo Sanga, Systems Engineer focused on integration and automation.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: METADATA.title },
      { name: "description", content: METADATA.description },
      { property: "og:title", content: METADATA.title },
      { property: "og:description", content: METADATA.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl },
      { property: "og:image", content: socialImageUrl },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: socialImageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: METADATA.title },
      { name: "twitter:description", content: METADATA.description },
      { name: "twitter:image", content: socialImageUrl },
      { name: "twitter:image:alt", content: socialImageAlt },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
  }),
  component: PortfolioV2Page,
});
