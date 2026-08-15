import portrait from "@/assets/leo-portrait.jpg";
import { CONTACT } from "./data";

export function Hero() {
  return (
    <section id="top" className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl">
            Build systems that{" "}
            <span className="text-lavender whitespace-nowrap">run the business</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            I design business systems architecture, integrate revenue systems, and build
            automations. I spent years running day-to-day operations, long enough to know which
            processes are actually worth automating.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${CONTACT.email}`}
              className="rounded-full bg-lavender px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Book a Call
            </a>
            <a
              href="#projects"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-panel"
            >
              See the work
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-6 rounded-3xl bg-lavender/20 blur-3xl" aria-hidden="true" />
          <div className="relative rounded-3xl border border-border bg-panel p-5 lavender-glow">
            <img
              src={portrait}
              alt="Leo Sanga, Systems Engineer"
              width={768}
              height={896}
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
            <div className="mt-5">
              <p className="text-lg font-semibold text-foreground">Leo Sanga</p>
              <p className="text-sm text-muted-foreground">
                Systems Engineer: Automation &amp; Integration
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
