import { createFileRoute } from "@tanstack/react-router";

import { SalesforceTrialDemoCaseStudyV2 } from "@/components/portfolio-v2/SalesforceTrialDemoCaseStudyV2";
import { SALESFORCE_ROUTING_CASE_STUDY } from "@/content/portfolio-v2/salesforce-trial-demo-routing";

const { metadata } = SALESFORCE_ROUTING_CASE_STUDY;

export const Route = createFileRoute("/projects/trial-demo-routing-by-customer-relationship")({
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
  component: SalesforceTrialDemoCaseStudyV2,
});
