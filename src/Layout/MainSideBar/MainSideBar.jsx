import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
} from "@material-tailwind/react";

import { menus, withSubmenu } from "../../data/menus";
import { DropdownIcon } from "../../libs/dropdownIcon";

const MainSideBar = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const { pathname } = location;

    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    return (
        <div className="flex flex-col h-full   w-[18rem] fixed  pb-20 z-40 bg-white">
            <div
                className="flex-1 scrollbar scrollbar-thumb-primary/80 hover:scrollbar-thumb-primary/60 scrollbar-track-gray-100 hover:scrollbar-track-gray-100  "
                style={{
                    overflowX: "hidden",
                    scrollMarginRight: "15px",
                }}
            >
                {/* menu */}
                <div className="grid grid-cols-1 gap-2 px-3 pt-2 text-gray-700">
                    {menus.map((menu, idx) => (
                        <Link
                            to={menu?.url}
                            key={idx + 2}
                            onClick={() => setOpen(false)}
                            className={`${
                                menu?.url.slice(1) === pathname
                                    ? "bg-blue-50/40 text-gray-900 before-menu-content"
                                    : "before-hover-menu-content text-gray-800/90"
                            } relative py-2 px-2 hover:bg-blue-50/40 duration-500  cursor-pointer  hover:text-gray-900 flex items-center gap-3 rounded-md text-[14.8px] transition-all`}
                        >
                            {menu?.icon} {menu?.name}
                        </Link>
                    ))}
                </div>
                {/* setting */}
                <div className="grid grid-cols-1 gap-2 px-3 py-2">
                    {withSubmenu?.map((menuItem, index) => (
                        <Accordion
                            key={index + 2}
                            open={open === menuItem?.id}
                            icon={
                                <DropdownIcon id={menuItem?.id} open={open} />
                            }
                            className="transition-all duration-500"
                        >
                            <AccordionHeader
                                onClick={() => handleOpen(menuItem?.id)}
                                className={`${
                                    menuItem?.subMenus?.some(
                                        (subMenu) =>
                                            subMenu?.url?.slice(1) === pathname
                                    )
                                        ? "bg-blue-50/40 text-gray-900 before-menu-content"
                                        : "text-gray-800/90 hover:text-gray-900 "
                                } relative border-b-0 py-2 pr-2.5 cursor-pointer flex items-center gap-3 rounded-md font-normal transition-all`}
                            >
                                <div className="px-2 flex items-center gap-3 text-[14.8px]">
                                    {menuItem?.icon} {menuItem?.name}
                                </div>
                            </AccordionHeader>
                            <AccordionBody className="pt-0 py-0">
                                <div className="grid grid-cols-1 py-2 text-gray-700 mt-2">
                                    {menuItem?.subMenus.map((menu, idx) => (
                                        <Link
                                            to={menu?.url}
                                            key={idx}
                                            className={`${
                                                menu?.url?.slice(1) === pathname
                                                    ? "before-menu-content text-gray-800"
                                                    : "text-gray-800/90 hover:text-gray-900 before-hover-menu-content"
                                            } relative mb-2  py-1 transition-all cursor-pointer flex  items-center gap-3  text-[14.8px] pl-10  `}
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
