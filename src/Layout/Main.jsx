// import React from "react";

import { Outlet } from "react-router-dom";
import { Header } from "../components/Shared/Navbar/Navbar";
import { useEffect, useState } from "react";
import MainSideBar from "./MainSideBar/MainSideBar";

const Main = () => {
  const [showSideBar, setShowSideBar] = useState(true);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth <= 960 && setShowSideBar(false)
    );
  }, []);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setShowSideBar(true)
    );
  }, []);

  return (
    <>
      <Header />
      <div className="flex mx-auto max-w-screen-2xl gap-10 px-4 lg:px-8">
        {showSideBar && (
          <div className="w-52 min-h-[calc(100vh-60px)] min-lg:h-[calc(100vh-80px)]">
            <MainSideBar />
          </div>
        )}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Main;
