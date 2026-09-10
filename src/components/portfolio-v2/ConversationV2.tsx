import { CONVERSATION } from "@/content/portfolio-v2/content";

import { PrimaryCallLinkV2 } from "./PrimaryCallLinkV2";
import { SignalMarkV2 } from "./SignalMarkV2";

export function ConversationV2() {
  return (
    <section className="pv2-section pv2-conversation" aria-labelledby="pv2-conversation-title">
      <div className="pv2-frame">
        <div className="pv2-conversation__panel" data-pv2-observe>
          <div className="pv2-conversation__signal" aria-hidden="true">
            <SignalMarkV2 />
            <span />
          </div>
          <div className="pv2-conversation__copy">
            <h2 id="pv2-conversation-title">{CONVERSATION.heading}</h2>
            <div className="pv2-conversation__support">
              {CONVERSATION.supportLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
          <div className="pv2-conversation__action">
            <PrimaryCallLinkV2 />
            <p>{CONVERSATION.duration}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
