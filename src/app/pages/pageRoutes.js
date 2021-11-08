import Page from "./Page";
import homeRoutes from "./home/homeRoutes";

const pageRoutes = [
  {
    path: "/",
    element: Page,
    children: [...homeRoutes],
  },
];

export default pageRoutes;
