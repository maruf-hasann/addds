import React, { useState } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { IoLogoMastodon } from "react-icons/io5";
import MenuDrawer from "../Drawer/MenuDrawer";
import { Link } from "react-router-dom";
import useAuthData from "../../../hooks/useAuthData";
import { useDispatch } from "react-redux";
import { addUser } from "../../../store/features/user/userSlice";
import Schooling from "../../../../public/logo.png"

export function Header() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const userData = useAuthData();
  const user = userData?.user


  const dispatch = useDispatch();

  return (
    <>
      <div className="flex fixed w-full right-0 z-50">
      {/* <div className="w-80 hidden lg:block"></div>   */}
      <Navbar className="flex-1 pt-2 w-full max-w-full fixed right-0 px-4 lg:px-8 lg:py-4 rounded-none shadow-none pb-0">
        <div className=" flex items-center justify-between text-blue-gray-900 container mx-auto">
          <div className="flex items-center gap-5 lg:hidden">
            {/* open drawer icon */}
            <IconButton
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent "
              ripple={false}
              onClick={() => {
                setOpenDrawer(!openDrawer);
              }}
            >
              {openDrawer ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
          {/* logo */}
          <Link to="/">
           <img src={Schooling} className=" w-40" alt="" />
          </Link>
          {/* login button */}
          {user?.email ? (
            <Button
              onClick={() => dispatch(addUser({}))}
              variant="outlined"
              size="md"
              className="text-black border-black"
            >
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button
                variant="outlined"
                size="md"
                className="text-black border-black"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </Navbar>
      </div>
      {/* drawer */}
      <MenuDrawer open={openDrawer} setOpen={setOpenDrawer} />
    </>
  );
}
