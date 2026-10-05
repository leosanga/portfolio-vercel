import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

type CanvasTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
  skipTransition: () => void;
};
type TransitionDocument = Document & {
  startViewTransition?: (update: () => void) => CanvasTransition;
};
const OWNER_ATTRIBUTE = "data-pc-canvas-transition";

function skipVisual(transition: CanvasTransition | null) {
  if (!transition) return;
  try {
    transition.skipTransition();
  } catch {
    // A completed native visual may no longer be skippable; state stays authoritative.
  }
}

export function useCanvasTransition(ownerId: string, setModal: (next: boolean) => void) {
  const [transitioning, setTransitioning] = useState(false);
  const mounted = useRef(false);
  const generation = useRef(0);
  const current = useRef<CanvasTransition | null>(null);

  const releaseOwner = useCallback(() => {
    const root = document.documentElement;
    if (root.getAttribute(OWNER_ATTRIBUTE) === ownerId) root.removeAttribute(OWNER_ATTRIBUTE);
  }, [ownerId]);

  const cancel = useCallback(() => {
    generation.current += 1;
    const previous = current.current;
    current.current = null;
    skipVisual(previous);
    releaseOwner();
    if (mounted.current) setTransitioning(false);
  }, [releaseOwner]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      cancel();
    };
  }, [cancel]);

  const changeModal = useCallback(
    (next: boolean) => {
      if (!mounted.current) return;
      const interrupted = current.current !== null;
      cancel();
      const intent = generation.current;
      const root = document.documentElement;
      const nativeDocument = document as TransitionDocument;
      const eligible =
        !interrupted &&
        typeof nativeDocument.startViewTransition === "function" &&
        !document.hidden &&
        !root.hasAttribute(OWNER_ATTRIBUTE) &&
        !root.hasAttribute("data-pv2-theme-transition") &&
        !document.querySelector("[data-pv2-case-title-owner]") &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        !window.matchMedia("(forced-colors: active)").matches;
      if (!eligible) {
        setModal(next);
        return;
      }
      let committed = false;
      const commit = (synchronous = false) => {
        if (committed || !mounted.current || intent !== generation.current) return;
        if (synchronous) flushSync(() => setModal(next));
        else setModal(next);
        committed = true;
      };
      const finish = () => {
        if (!mounted.current || intent !== generation.current) return;
        current.current = null;
        releaseOwner();
        setTransitioning(false);
      };
      root.setAttribute(OWNER_ATTRIBUTE, ownerId);
      try {
        flushSync(() => setTransitioning(true));
        const transition = nativeDocument.startViewTransition!.call(document, () => commit(true));
        current.current = transition;
        void transition.ready.catch(() => {
          commit();
        });
        void transition.finished.then(finish, () => {
          commit();
          finish();
        });
      } catch {
        commit();
        finish();
      }
    },
    [cancel, ownerId, releaseOwner, setModal],
  );

  return { changeModal, transitioning, cancel };
}
