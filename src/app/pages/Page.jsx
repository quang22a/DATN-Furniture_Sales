import React from "react";
import { Outlet } from "react-router";

const Page = () => {
  return (
    <main className="main">
      <Outlet />
    </main>
  );
};

export default Page;
