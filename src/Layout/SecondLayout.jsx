// import React from "react";

import { Outlet } from "react-router-dom";
import { Header } from "../components/Shared/Navbar/Navbar";


const SecondLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default SecondLayout;
