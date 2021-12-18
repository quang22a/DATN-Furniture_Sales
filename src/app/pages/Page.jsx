import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { useDispatch } from "react-redux";

import { io } from "socket.io-client";

import { getProfile } from "./profile/stores/action";

const Page = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispatch(getProfile());
    }
  }, []);
  const socket = io.connect("http://localhost:8000");

  useEffect(() => {
    socket.on("connect", (data) => {
      socket.emit("client-get-notifications", "");
    });
    socket.on("server-send-notifications", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <main className="main">
      <Outlet />
    </main>
  );
};

export default Page;
