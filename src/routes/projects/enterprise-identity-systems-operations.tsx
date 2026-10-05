import { createFileRoute } from "@tanstack/react-router";

import { EnterpriseIdentityCaseStudyV2 } from "@/components/portfolio-v2/EnterpriseIdentityCaseStudyV2";
import { ENTERPRISE_IDENTITY } from "@/content/portfolio-v2/enterprise-identity";

const { metadata } = ENTERPRISE_IDENTITY;

export const Route = createFileRoute("/projects/enterprise-identity-systems-operations")({
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
  component: EnterpriseIdentityCaseStudyV2,
});
