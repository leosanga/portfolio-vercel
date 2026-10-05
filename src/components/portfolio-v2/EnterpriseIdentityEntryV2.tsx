import { ENTERPRISE_IDENTITY } from "@/content/portfolio-v2/enterprise-identity";
import "@/styles/enterprise-identity.css";

import { EnterpriseIdentityModelsV2 } from "./EnterpriseIdentitySignatureV2";

export function EnterpriseIdentityEntryV2() {
  const { discovery, hero, href } = ENTERPRISE_IDENTITY;
  return (
    <aside
      className="pv2-case-study-project pv2-identity-entry"
      aria-labelledby="identity-entry-title"
    >
      <div className="pv2-identity-entry__body">
        <div className="pv2-identity-entry__copy">
          <p className="pv2-project-index pv2-identity-label">{discovery.label}</p>
          <h3 id="identity-entry-title">{discovery.heading}</h3>
          <p className="pv2-identity-entry__description">{discovery.body}</p>
        </div>
        <EnterpriseIdentityModelsV2 compact />
      </div>
      <div className="pv2-case-study-project__footer pv2-identity-entry__footer">
        <div className="pv2-project-stack" aria-label={hero.stackLabel}>
          {hero.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <a className="pv2-featured-project__case-link pv2-identity-entry__link" href={href}>
          {discovery.link}
          <svg aria-hidden="true" viewBox="0 0 16 16" focusable="false">
            <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" />
          </svg>
        </a>
      </div>
    </aside>
  );
}
