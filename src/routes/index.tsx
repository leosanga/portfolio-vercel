import { createFileRoute } from "@tanstack/react-router";

import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Competencies } from "@/components/portfolio/Competencies";
import { Process } from "@/components/portfolio/Process";
import { Projects } from "@/components/portfolio/Projects";
import { ContactCTA } from "@/components/portfolio/ContactCTA";
import { Footer } from "@/components/portfolio/Footer";

const title = "Leo Sanga";
const description =
  "Systems Engineer building automation, AI-driven workflows, CRM architecture and enterprise integrations with n8n, HubSpot, Python and Make.com.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-lavender focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Competencies />
        <Process />
        <Projects />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
