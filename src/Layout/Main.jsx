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
      <div className="flex relative z-20 container mx-auto">
        {showSideBar && (
          <div className="w-60 min-h-[calc(100vh)] z-50 border-r pt-20">
            <MainSideBar />
          </div>
        )}
        <div className="flex-1 px-10 pt-14 overflow-x-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Main;
