import React from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SettingIcon, menus, withSubmenu } from "../../data/menus";

const MainSideBar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const location = useLocation();
  const { pathname } = location;

  return (
    <div
      className="flex flex-col h-full w-60 fixed  pb-20"
      style={{
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <div
        className="flex-1"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#888 #f1f1f1",
          overflowX: "hidden",
          scrollMarginRight: "15px", // Adjust as needed
        }}
      >
        {/* menu */}
        <div className="grid grid-cols-1 text-gray-700 ">
          {menus.map((menu, idx) => (
            <Link
              to={menu.url}
              key={idx}
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
                      className={`${
                        menu.url.slice(1) === pathname &&
                        "border-l-4 border-primary bg-blue-100 ps-5"
                      } ${
                        menu.url.slice(1) !== pathname && "hover:text-primary"
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
  );
};

export default MainSideBar;
