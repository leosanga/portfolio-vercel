import { CONTACT, HERO } from "@/content/portfolio-v2/content";

import { SignalMarkV2 } from "./SignalMarkV2";

export function FooterV2() {
  return (
    <footer className="pv2-footer">
      <div className="pv2-frame pv2-footer__grid">
        <div className="pv2-footer__identity">
          <SignalMarkV2 />
          <div>
            <p>Leo Sanga</p>
            <p>{HERO.role}</p>
          </div>
        </div>
        <div className="pv2-footer__links">
          <a href={`mailto:${CONTACT.email}`}>Email</a>
          <a href={CONTACT.linkedinUrl} target="_blank" rel="noopener noreferrer">
            LinkedIn
            <span className="pv2-visually-hidden">, opens in a new tab</span>
          </a>
        </div>
        <p className="pv2-footer__copyright">© {new Date().getFullYear()} Leo Sanga</p>
      </div>
    </footer>
  );
}
