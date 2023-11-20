import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { SettingIcon, menus, withSubmenu } from "../../../data/menus";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const MenuDrawer = ({ open, setOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  const closeDrawer = () => setOpen(false);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const [showDrawer, setShowDrawer] = useState(true)

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth <= 960 && setShowDrawer(true), closeDrawer()
    );
  }, []);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setShowDrawer(false)
    );
  }, []);

  return (
    <>
      {showDrawer && <Drawer open={open} onClose={closeDrawer} className="p-4 lg:hidden">
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Material Tailwind
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div
          className="flex flex-col h-full w-[280px] fixed"
          style={{
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <div
            className="flex-1 pb-24"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#888 #f1f1f1",
              overflowX: "hidden",
              scrollMarginRight: "15px", // Adjust as needed
            }}
          >
            {/* menu */}
            <div className="grid grid-cols-1 text-gray-700">
              {menus.map((menu, idx) => (
                <Link
                  to={menu.url}
                  key={idx}
                  onClick={closeDrawer}
                  className={`${
                    menu.url.slice(1) === pathname &&
                    "border-l-4 border-primary bg-blue-100 ps-5"
                  }  py-2 px-2 cursor-pointer flex items-center gap-3`}
                >
                  {menu.icon} {menu.name}
                </Link>
              ))}
            </div>
            {/* setting */}
            <div className="grid grid-cols-1 text-gray-700">
              {withSubmenu.map((menuItem) => (
                <Accordion
                  open={open === menuItem.id}
                  icon={<SettingIcon id={menuItem.id} open={open} />}
                >
                  <AccordionHeader
                    onClick={() => handleOpen(menuItem.id)}
                    className={`border-b-0 ${
                      menuItem?.subMenus.some((subMenu) =>
                        subMenu.url.slice(1).includes(pathname)
                      ) && "border-l-4 border-primary bg-blue-200 mb-1 py-2"
                    }`}
                  >
                    <div className="font-normal text-base px-2 flex items-center gap-3 text-gray-700">
                      {menuItem.icon} {menuItem.name}
                    </div>
                  </AccordionHeader>
                  <AccordionBody className="pt-0">
                    <div className="grid grid-cols-1 text-gray-700">
                      {menuItem.subMenus.map((menu, idx) => (
                        <Link
                          to={menu.url}
                          key={idx}
                          onClick={closeDrawer}
                          className={`${
                            menu.url.slice(1) === pathname &&
                            "border-l-4 border-primary bg-blue-100 ps-5"
                          } ${
                            menu.url.slice(1) !== pathname &&
                            "hover:text-primary"
                          } py-2 px-2 cursor-pointer font-normal text-base ms-3`}
                        >
                          {menu.icon} {menu.name}
                        </Link>
                      ))}
                    </div>
                  </AccordionBody>
                </Accordion>
              ))}
            </div>
          </div>
        </div>
      </Drawer>}
    </>
  );
};

export default MenuDrawer;
