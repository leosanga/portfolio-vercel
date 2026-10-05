import type { CatalogEntrySummary } from "../../types";

// Approved copy: design.md B02. Change it there first.
export const BLOG_POST_APPROVAL_AND_SCHEDULING: CatalogEntrySummary = {
  id: "blog-post-approval-and-scheduling",
  title: "Blog post approval and scheduling",
  purpose: "Schedule each blog post in the version its reviewer approved.",
  category: "marketing",
  toolsLine: "n8n / Content calendar / Documents / Team chat / Website CMS / SQL database",
  problem:
    "A blog post can be approved and then edited before it goes live, so the website publishes changes nobody reviewed. Copying each approved draft into the website by hand also delays blog posts.",
  built:
    "An interactive workflow model that sends each blog post to its reviewer and schedules the approved version on the website. It shows each blog post's status in the content calendar.",
  hardPart:
    "Tying each approval to the exact version sent for review while writers keep editing, and scheduling the blog post only if that version is still current.",
  phases: [
    {
      id: "P1",
      title: "Find blog posts ready for review",
      description:
        "Look for blog posts marked ready for review in the content calendar and read each draft.",
    },
    {
      id: "P2",
      title: "Ask the reviewer",
      description:
        "Record the blog post version under review and ask its reviewer to approve it. A blog post that is not approved goes back to its writer.",
    },
    {
      id: "P3",
      title: "Check the approved version",
      description:
        "Read the draft again and continue only if the blog post still matches the approved version. A changed blog post goes back to review.",
    },
    {
      id: "P4",
      title: "Schedule the blog post",
      description:
        "Schedule the approved blog post on the website, save its link and mark it scheduled in the content calendar.",
    },
  ],
};
