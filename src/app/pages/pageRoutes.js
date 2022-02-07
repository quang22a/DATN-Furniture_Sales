import Page from "./Page";
import homeRoutes from "./home/homeRoutes";
import productRoutes from "./product/productRoutes";
import cartRoutes from "./cart/cartRoutes";
import payRoutes from "./payment/payRoutes";
import profileRoutes from "./profile/profileRoutes";
import contactRoutes from "./contact/contactRoutes";

const pageRoutes = [
  {
    path: "/",
    element: Page,
    children: [
      ...homeRoutes,
      ...productRoutes,
      ...cartRoutes,
      ...payRoutes,
      ...profileRoutes,
      ...contactRoutes,
    ],
  },
];

export default pageRoutes;
