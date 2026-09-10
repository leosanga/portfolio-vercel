import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import instrumentFontUrl from "@/assets/portfolio-v2/fonts/InstrumentSans-Variable.woff2?url";
import { PORTFOLIO_THEME_BOOTSTRAP_SCRIPT } from "@/components/portfolio-v2/usePortfolioThemeV2";
import portfolioV2Css from "@/styles/portfolio-v2.css?url";

function NotFoundComponent() {
  return (
    <div className="portfolio-v2 pv2-system-state">
      <div className="pv2-system-state__content">
        <p className="pv2-system-state__code">404</p>
        <h1>Page not found</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="pv2-system-state__action">
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="portfolio-v2 pv2-system-state">
      <div className="pv2-system-state__content">
        <p className="pv2-system-state__code">System response</p>
        <h1>This page didn't load</h1>
        <p>Something went wrong on our end. You can try refreshing or head back home.</p>
        <div className="pv2-system-state__actions">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="pv2-system-state__action"
          >
            Try again
          </button>
          <a href="/" className="pv2-system-state__action pv2-system-state__action--secondary">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Leo Sanga" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: portfolioV2Css,
      },
      {
        rel: "preload",
        href: instrumentFontUrl,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "icon",
        href: "/portfolio-v2/icons/favicon-v2.svg?v=3",
        type: "image/svg+xml",
      },
      {
        rel: "icon",
        href: "/portfolio-v2/icons/favicon-v2-32.png?v=3",
        type: "image/png",
        sizes: "32x32",
      },
      {
        rel: "apple-touch-icon",
        href: "/portfolio-v2/icons/apple-touch-icon-v2.png",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          data-pv2-theme-bootstrap
          dangerouslySetInnerHTML={{ __html: PORTFOLIO_THEME_BOOTSTRAP_SCRIPT }}
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
