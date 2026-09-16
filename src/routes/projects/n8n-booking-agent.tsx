import { createFileRoute } from "@tanstack/react-router";

import { BookingAgentCaseStudyV2 } from "@/components/portfolio-v2/BookingAgentCaseStudyV2";
import { BOOKING_AGENT_CASE_STUDY } from "@/content/portfolio-v2/booking-agent";

const { metadata } = BOOKING_AGENT_CASE_STUDY;

export const Route = createFileRoute("/projects/n8n-booking-agent")({
  head: () => ({
    meta: [
      { title: metadata.title },
      { name: "description", content: metadata.description },
      { property: "og:title", content: metadata.title },
      { property: "og:description", content: metadata.description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: metadata.canonicalUrl },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: metadata.title },
      { name: "twitter:description", content: metadata.description },
    ],
    links: [{ rel: "canonical", href: metadata.canonicalUrl }],
  }),
  component: BookingAgentCaseStudyV2,
});
