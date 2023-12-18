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
    <div className="bg-white">
      <Header />
      <div className="flex relative z-20">
        {showSideBar && (
          <div className="w-60 min-h-[calc(100vh)] z-50 border-r pt-[75px] hidden lg:block mr-[1px]">
            <MainSideBar />
          </div>
        )}
        <div className="flex-1 pt-14 overflow-x-auto relative">
          <div className="w-full h-60 bg-[#1C6BAD] absolute inset-0 mt-[75px] -z-10"></div>
          {/* <div className="bg-gray-200 fixed inset-0 mt-[75px] -z-20"></div> */}
          <div className="z-10 pt-20 px-5 md:px-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
