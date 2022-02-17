import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { useDispatch } from "react-redux";

import { getProfile } from "./profile/stores/action";

const Page = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispatch(getProfile());
    }
  }, []);

  return (
    <main className="main">
      <Outlet />
    </main>
  );
};

export default Page;
