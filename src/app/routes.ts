import { createBrowserRouter } from "react-router";
import DocsPage from "./components/DocsPage";

const basename = import.meta.env.BASE_URL;

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: DocsPage,
    },
    {
      path: "/docs",
      Component: DocsPage,
    },
  ],
  { basename }
);
