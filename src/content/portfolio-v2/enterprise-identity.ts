export const ENTERPRISE_IDENTITY = {
  href: "/projects/enterprise-identity-systems-operations",
  metadata: {
    title: "Enterprise Identity & Systems Operations | Leo Sanga",
    description:
      "Single Sign On (SSO) and Automated User Provisioning (SCIM) implementation, identity mapping and internal systems ownership from Leo Sanga's integration and automation experience.",
    canonicalUrl: "https://leosanga.vercel.app/projects/enterprise-identity-systems-operations",
  },
  hero: {
    title: "Enterprise Identity & Systems Operations",
    support:
      "Single Sign On (SSO) and Automated User Provisioning (SCIM) implementation across differing customer environments, alongside ownership of the internal cloud and SaaS systems the business depended on.",
    stackLabel: "Platforms and protocols",
    stack: ["SSO / SAML", "SCIM", "Microsoft Entra ID", "Okta"],
  },
  signature: {
    eyebrow: "Customer identity integration",
    heading: "The connection depends on what the data means.",
    sourceLabel: "Source",
    targetLabel: "Application",
    models: [
      {
        protocol: "SSO",
        subtitle: "Identity correspondence",
        source: "Identity + claim values",
        target: "Account + expected claims",
        consideration: "Account correspondence and data authority.",
      },
      {
        protocol: "SCIM",
        subtitle: "Receiving-model support",
        source: "Account data + changes",
        target: "Supported fields + lifecycle",
        consideration: "Supported data, scope and changes.",
      },
    ],
    explanation:
      "Single Sign On (SSO) depends on identity and claims matching the intended account. Automated User Provisioning (SCIM) has to fit the application's supported data and changes.",
    context: "Illustration of implementation considerations, rather than a customer configuration.",
  },
  identity: {
    heading: "Start with the account the application needs to recognize.",
    intro: "Identity correspondence and authoritative data shape the SSO configuration.",
    label: "B2B customer environments",
    body: [
      "My SSO and SCIM implementation work crossed differing customer identity environments.",
      "I configured identity mappings around the identities each system expected and worked through the source-of-truth questions behind them. The data being passed had to refer to the intended person and carry the meaning the receiving system expected.",
    ],
    decisions: [
      {
        label: "Account correspondence",
        question: "The identity must resolve to the intended account.",
        body: "Consider how the application recognizes the person, including an account that already exists. A usable value still needs the right relationship to that account.",
      },
      {
        label: "Authoritative data",
        question: "The source of each value needs to be understood.",
        body: "Consider which system maintains the identity data and whether the values it supplies have the meaning the application expects.",
      },
      {
        label: "Data readiness",
        question: "Required values have to be available and usable.",
        body: "Missing values, ambiguous matches and unexpected formats need attention before the configuration is relied on for access.",
      },
    ],
  },
  provisioning: {
    heading: "Provisioning has to fit the application.",
    intro:
      "The receiving application's data model sets the boundary for what provisioning can maintain.",
    considerationsLabel: "Receiving-application considerations",
    considerations: [
      {
        label: "Supported representation",
        body: "Check which attributes and relationships the application accepts, and what those values mean within its model.",
      },
      {
        label: "Scope and lifecycle",
        body: "Establish which accounts are managed and how the application handles supported updates and account-state changes.",
      },
    ],
    body: [
      "My SCIM implementation work included provisioning limitations across differing customer environments. The source could supply information that the receiving application did not support in the same form.",
      "Understanding both models was necessary to investigate a workable representation. A related application concept could offer another approach, but support for SCIM did not make every attribute or relationship available.",
    ],
    ownershipLabel: "Continuing identity responsibility",
    ownership:
      "I became the first point of contact for SSO and SCIM troubleshooting and was involved in nearly every customer identity implementation. I handled access emergencies and provided temporary access paths when appropriate.",
  },
  internal: {
    scopeLabel: "Internal company systems",
    heading: "The business also depended on its own systems.",
    intro: "A separate operating responsibility within the company's cloud and SaaS environment.",
    body: "I was one of the primary people responsible for internal IT, with administrative access shared with leadership. I could make administrative changes independently within that responsibility.",
    accessLabel: "Access follows responsibility",
    situations: [
      {
        when: "When someone joined",
        body: "I created accounts and granted access according to the person's responsibilities.",
      },
      {
        when: "When responsibilities changed",
        body: "I updated access as responsibilities changed, applying least-privilege principles.",
      },
      {
        when: "When someone left",
        body: "I removed access and took required session actions. Information transfer and securing shared credentials were part of the departure work.",
      },
    ],
  },
  endpoint: {
    heading: "Deployment continued into operation.",
    intro: "Microsoft Defender for Endpoint in a remote, bring-your-own-device environment.",
    body: "I documented and deployed Endpoint protection across the remote BYOD environment. The rollout continued into verification and ongoing monitoring.",
    sequenceLabel: "Endpoint rollout and ongoing operation",
    stages: [
      { label: "Prerequisites", body: "Check device and operating-system requirements." },
      { label: "Deployment", body: "Use local scripts or manual installation." },
      { label: "Verification", body: "Verify protection after deployment." },
      { label: "Monitoring", body: "Monitor security status and alerts." },
    ],
    responsibilities: [
      {
        label: "Security guidance",
        body: "I co-authored IT security guidance for the remote BYOD environment and trained employees on the requirements.",
      },
      {
        label: "Operating and recovery documentation",
        body: "I maintained procedures and documentation around the cloud providers' recovery capabilities so operation depended less on personal knowledge.",
      },
    ],
  },
  close: {
    heading: "Configuration choices become operating responsibilities.",
    body: [
      "A mapping determines which identity an application recognizes. Provisioning determines which account data it can maintain. When those choices conflict with the systems in use, the consequence is an access problem someone has to understand and resolve.",
      "I remained responsible for SSO and SCIM troubleshooting after implementation. Separately, I was one of the primary people responsible for the company's internal systems. The work connected configuration decisions to the systems people depended on to do their jobs.",
    ],
    relatedLabel: "Related case study",
    relatedTitle: "AI Booking Agent",
    relatedReason: "How an owned automation handles dependency failures before making a change.",
    relatedHref: "/projects/ai-booking-agent",
  },
  discovery: {
    label: "09 / CASE STUDY / SUPPORTING EXPERIENCE",
    heading: "Enterprise Identity & Systems Operations",
    body: "Customer Single Sign On (SSO) and Automated User Provisioning (SCIM) implementation, alongside a separate account of internal IT ownership.",
    link: "Read case study",
  },
} as const;
