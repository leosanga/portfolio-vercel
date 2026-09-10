import { createFileRoute } from "@tanstack/react-router";

import { PortfolioV2Page } from "@/components/portfolio-v2/PortfolioV2Page";
import { METADATA } from "@/content/portfolio-v2/content";
import instrumentFontUrl from "@/assets/portfolio-v2/fonts/InstrumentSans-Variable.woff2?url";
import portfolioV2Css from "@/styles/portfolio-v2.css?url";

export const Route = createFileRoute("/redesign")({
  head: () => ({
    meta: [
      { title: METADATA.title },
      { name: "description", content: METADATA.description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: METADATA.title },
      { property: "og:description", content: METADATA.description },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content: "/portfolio-v2/social/leo-sanga-portfolio-v2.jpg",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Leo Sanga, Systems Engineer focused on integration and automation.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content: "/portfolio-v2/social/leo-sanga-portfolio-v2.jpg",
      },
      {
        name: "twitter:image:alt",
        content: "Leo Sanga, Systems Engineer focused on integration and automation.",
      },
    ],
    links: [
      { rel: "stylesheet", href: portfolioV2Css },
      {
        rel: "preload",
        href: instrumentFontUrl,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "icon",
        href: "/portfolio-v2/icons/favicon-v2.svg?v=3",
        type: "image/svg+xml",
      },
      {
        rel: "icon",
        href: "/portfolio-v2/icons/favicon-v2-32.png?v=3",
        type: "image/png",
        sizes: "32x32",
      },
      {
        rel: "apple-touch-icon",
        href: "/portfolio-v2/icons/apple-touch-icon-v2.png",
      },
    ],
  }),
  component: PortfolioV2Page,
});
