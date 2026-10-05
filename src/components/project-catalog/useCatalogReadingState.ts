import { useEffect, useRef, useState } from "react";
import { CATALOG_BATCH_SIZE } from "@/content/project-catalog/browsing";

type ReadingState = { count: number; open: string[]; scroll: number };
const storagePrefix = "leo-catalog-reading:";

/** Reading state belongs to a history entry, never to a fresh visit. */
export function useCatalogReadingState(selectionKey: string, historyKey: string) {
  const [hydrated, setHydrated] = useState(false);
  const [count, setCount] = useState(CATALOG_BATCH_SIZE);
  const [open, setOpen] = useState<string[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const latest = useRef<ReadingState>({ count, open, scroll: 0 });
  latest.current.count = count;
  latest.current.open = open;
  const currentHistoryKey = useRef(historyKey);
  currentHistoryKey.current = historyKey;
  const saveRef = useRef<() => void>(() => {});
  const initialized = useRef(false);

  useEffect(() => {
    const key = `${storagePrefix}${currentHistoryKey.current}:${selectionKey}`;
    let restored: ReadingState | null = null;
    try {
      const saved: unknown = JSON.parse(sessionStorage.getItem(key) ?? "null");
      if (
        saved &&
        typeof saved === "object" &&
        "count" in saved &&
        "open" in saved &&
        "scroll" in saved
      ) {
        const value = saved as ReadingState;
        if (
          Number.isInteger(value.count) &&
          value.count >= CATALOG_BATCH_SIZE &&
          Array.isArray(value.open) &&
          value.open.every((id) => typeof id === "string") &&
          Number.isFinite(value.scroll) &&
          value.scroll >= 0
        )
          restored = value;
      }
    } catch {
      /* Storage may be disabled. Browsing remains available. */
    }
    setCount(restored?.count ?? CATALOG_BATCH_SIZE);
    const nativeOpen = [
      ...document.querySelectorAll<HTMLDetailsElement>(".pc-project details[open]"),
    ].map((element) => element.id.replace(/^catalog-/, ""));
    const firstMount = !initialized.current;
    initialized.current = true;
    setOpen((current) =>
      firstMount && current.length ? current : (restored?.open ?? (firstMount ? nativeOpen : [])),
    );
    setActive(null);
    setHydrated(true);
    let restoreFrame = 0;
    const cancelRestoration = () => cancelAnimationFrame(restoreFrame);
    window.addEventListener("pointerdown", cancelRestoration, { once: true });
    window.addEventListener("keydown", cancelRestoration, { once: true });
    if (restored) {
      const scroll = restored.scroll;
      restoreFrame = requestAnimationFrame(() => {
        restoreFrame = requestAnimationFrame(() =>
          window.scrollTo({ top: scroll, behavior: "instant" }),
        );
      });
    }
    const save = () => {
      if (document.body.style.position === "fixed") return;
      latest.current.scroll = window.scrollY;
      try {
        sessionStorage.setItem(key, JSON.stringify(latest.current));
      } catch {
        /* Optional continuity. */
      }
    };
    saveRef.current = save;
    window.addEventListener("pagehide", save);
    window.addEventListener("scroll", save, { passive: true });
    return () => {
      window.removeEventListener("pagehide", save);
      window.removeEventListener("scroll", save);
      cancelAnimationFrame(restoreFrame);
      window.removeEventListener("pointerdown", cancelRestoration);
      window.removeEventListener("keydown", cancelRestoration);
    };
    // Hash changes intentionally preserve disclosures, appended rows and playback.
  }, [selectionKey]);

  return {
    hydrated,
    count,
    setCount,
    open,
    setOpen,
    active,
    setActive,
    save: () => saveRef.current(),
  };
}
