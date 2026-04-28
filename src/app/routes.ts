import { createBrowserRouter } from "react-router";
import DocsPage from "./components/DocsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DocsPage,
  },
  {
    path: "/docs",
    Component: DocsPage,
  },
]);
