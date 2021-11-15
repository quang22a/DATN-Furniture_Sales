import ProductPage from "./Product";
import ProductList from "./containers/ProductList";
import ProductDetail from "./containers/ProductDetail";

const productRoutes = [
  {
    path: "/products",
    element: ProductPage,
    isProtected: false,
    children: [
      {
        path: "",
        element: ProductList,
      },
      {
        path: ":id",
        element: ProductDetail,
      },
    ],
  },
];

export default productRoutes;
