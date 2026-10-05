import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/projects/")({
  beforeLoad: ({ location }) => {
    throw redirect({
      href: `/project-catalog${location.searchStr}${location.hash ? `#${location.hash}` : ""}`,
      replace: true,
    });
  },
});
