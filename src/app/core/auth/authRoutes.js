import Login from "./containers/Login";
import Register from "./containers/Register";
import Auth from "./index";

const authRoutes = [
  {
    path: "/auth",
    element: Auth,
    children: [
      {
        path: "",
        redirect: "login",
      },
      {
        path: "login",
        element: Login,
      },
      {
        path: "register",
        element: Register,
      },
    ],
  },
];

export default authRoutes;
