import { CONTACT } from "./data";

export function ContactCTA() {
  return (
    <section id="contact" className="border-t border-border py-14 md:py-16">
      <div className="reveal container-page max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lavender">
          Get in touch
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Let's build a system for your systems
        </h2>
        <p className="mt-5 text-base leading-relaxed text-foreground md:text-lg">
          The best systems start with understanding how the business actually works.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Show me how the work gets done today, and I'll map where the tools, data, and handoffs
          should connect.
        </p>

        <div className="mt-8 flex justify-center">
          <a
            href={CONTACT.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-lavender px-6 py-3 text-sm font-medium text-primary-foreground transition-[opacity,translate] duration-200 hover:-translate-y-0.5 hover:opacity-90 active:translate-y-0"
          >
            Book a Call
          </a>
        </div>
      </div>
    </section>
  );
}
