import { createFileRoute } from "@tanstack/react-router";

import { HubSpotLeadRoutingCaseStudyV2 } from "@/components/portfolio-v2/HubSpotLeadRoutingCaseStudyV2";
import { HUBSPOT_LEAD_ROUTING_CASE_STUDY } from "@/content/portfolio-v2/hubspot-lead-routing";

const { metadata } = HUBSPOT_LEAD_ROUTING_CASE_STUDY;

export const Route = createFileRoute("/projects/lead-routing-pipeline-health-system")({
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
  component: HubSpotLeadRoutingCaseStudyV2,
});
