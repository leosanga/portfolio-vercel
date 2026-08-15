import { createFileRoute } from "@tanstack/react-router";

import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Competencies } from "@/components/portfolio/Competencies";
import { Process } from "@/components/portfolio/Process";
import { Projects } from "@/components/portfolio/Projects";
import { ContactCTA } from "@/components/portfolio/ContactCTA";
import { Footer } from "@/components/portfolio/Footer";

const title = "Leo Sanga — Systems Engineer, Automation & Integration";
const description =
  "Systems Engineer building AI-driven automation, CRM workflows and revenue systems architecture with n8n, HubSpot, Make.com and Python.";

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
      <Nav />
      <main>
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
