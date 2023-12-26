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
  const location = useLocation();

  const { pathname } = location;

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div
      className="flex flex-col h-full w-[18rem] fixed  pb-20 z-40 bg-white"
      style={{
        msOverflowStyle: "none",
        scrollbarWidth: "thin",
        scrollbarColor: "#888 #f1f1f1",
      }}
    >
      <div
        className="flex-1"
        style={{
          overflowX: "hidden",
          scrollMarginRight: "15px", // Adjust as needed
        }}
      >
        {/* menu */}
        <div className="grid grid-cols-1 gap-2 px-3 pt-2 text-gray-700">
          {menus.map((menu, idx) => (
            <Link
              to={menu?.url}
              key={idx}
              onClick={() => setOpen(false)}
              className={`${
                menu?.url.slice(1) === pathname
                  ? "bg-blue-50 text-[#01183b]"
                  : "text-gray-600 hover:text-[#01183b]"
              }  py-2 px-2 cursor-pointer flex items-center gap-3  rounded-md text-sm`}
            >
              {menu?.icon} {menu?.name}
            </Link>
          ))}
        </div>
        {/* setting */}
        <div className="grid grid-cols-1 gap-2 px-3 py-2">
          {withSubmenu?.map((menuItem) => (
            <Accordion
              open={open === menuItem?.id}
              icon={<SettingIcon id={menuItem?.id} open={open} />}
            >
              <AccordionHeader
                onClick={() => handleOpen(menuItem?.id)}
                className={`border-b-0 ${
                  menuItem?.subMenus?.some((subMenu) =>
                    subMenu?.url?.slice(1)?.includes(pathname)
                  )
                  ? "bg-blue-50 text-[#01183b]"
                  : "text-gray-600 hover:text-[#01183b]"
                } ${open === menuItem?.id && 'text-[#01183b]'}  py-2 px-2 cursor-pointer flex items-center gap-3 rounded-md font-normal`}
              >
                <div className="text-sm px-2 flex items-center gap-3">
                  {menuItem?.icon} {menuItem?.name}
                </div>
              </AccordionHeader>
              <AccordionBody className="pt-0 py-0">
                <div className="grid grid-cols-1 gap-2 p-2 text-gray-700 ">
                  {menuItem?.subMenus.map((menu, idx) => (
                    <Link
                      to={menu?.url}
                      key={idx}
                      className={`${
                        menu?.url?.slice(1) === pathname
                        ? "bg-blue-50 text-[#01183b]"
                        : "text-gray-600 hover:text-[#01183b]"
                      }  py-2 px-2 cursor-pointer flex items-center gap-3 rounded-md
                      } ${
                        menu?.url?.slice(1) !== pathname && "hover:text-primary"
                      } py-2 px-2 cursor-pointer font-normal text-sm flex items-center gap-2`}
                    >
                      {menu?.name}
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
