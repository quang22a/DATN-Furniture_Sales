import Page from "./Page";
import homeRoutes from "./home/homeRoutes";
import productRoutes from "./product/productRoutes";

const pageRoutes = [
  {
    path: "/",
    element: Page,
    children: [...homeRoutes, ...productRoutes],
  },
];

export default pageRoutes;
