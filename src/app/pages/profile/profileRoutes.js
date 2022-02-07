import ProfilePage from "./Profile";
import ProfileUser from "./containers/ProfileUser";
import UpdatePassword from "./containers/UpdatePassword";
import UpdateProfile from "./containers/UpdateProfile";
import HistoryBill from "./containers/HistoryBill";
import ProductBill from "./containers/ProductBill";

const profileRoutes = [
  {
    path: "/profile",
    element: ProfilePage,
    isProtected: true,
    children: [
      {
        path: "",
        element: ProfileUser,
      },
      {
        path: "update-profile",
        element: UpdateProfile,
      },
      {
        path: "update-password",
        element: UpdatePassword,
      },
      {
        path: "bills",
        element: HistoryBill,
      },
      {
        path: "bills/:id",
        element: ProductBill,
      },
    ],
  },
];

export default profileRoutes;
