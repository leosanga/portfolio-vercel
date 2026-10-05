import type { CatalogGraph } from "./types";

/** Lazy graph loaders by entry ID. The catalog list never imports graph modules directly. */
export const GRAPH_LOADERS: Readonly<Record<string, () => Promise<CatalogGraph>>> = {
  "customer-inquiry-routing": () =>
    import("./entries/customer-inquiry-routing/graph").then((module) => module.GRAPH),
  "quote-follow-up-reminders": () =>
    import("./entries/quote-follow-up-reminders/graph").then((module) => module.GRAPH),
  "sales-call-notes-and-next-steps": () =>
    import("./entries/sales-call-notes-and-next-steps/graph").then((module) => module.GRAPH),
  "blog-post-approval-and-scheduling": () =>
    import("./entries/blog-post-approval-and-scheduling/graph").then((module) => module.GRAPH),
};
