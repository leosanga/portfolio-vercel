import { CONTACT } from "./data";

export function Footer() {
  return (
    <footer id="experience-footer" className="border-t border-border py-14">
      <div className="container-page grid gap-10 sm:grid-cols-3">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Email
          </p>
          <a
            href={`mailto:${CONTACT.email}`}
            className="mt-2 block text-sm text-foreground transition-colors hover:text-lavender"
          >
            {CONTACT.email}
          </a>
        </div>
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            LinkedIn
          </p>
          <a
            href={CONTACT.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 block text-sm text-foreground transition-colors hover:text-lavender"
          >
            {CONTACT.linkedin}
          </a>
        </div>
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Approach
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Understand the process. Automate where it matters.
          </p>
        </div>
      </div>
      <div className="container-page mt-10 border-t border-border pt-6">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Leo Sanga. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
