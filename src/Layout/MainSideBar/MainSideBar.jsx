import React from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MdSchool,
  MdBusiness,
  MdPlaylistAddCheck,
  MdPerson,
  MdSubject,
  MdToday,
  MdAccountBalance,
  MdClass,
  MdAccountBox,
  MdSettings,
  MdLibraryBooks,
} from "react-icons/md";

const MainSideBar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const location = useLocation();
  const { pathname } = location;
  console.log(pathname);

  const menus = [
    {
      id: 1,
      name: "Education Variant",
      url: "./all-education-variants",
      icon: <MdSchool />,
    },
    {
      id: 2,
      name: "Tutoring Variant",
      url: "./all-tutoring-variants",
      icon: <MdBusiness />,
    },
    {
      id: 3,
      name: "Tutoring Place",
      url: "./all-tutoring-places",
      icon: <MdPlaylistAddCheck />,
    },
    {
      id: 4,
      name: "Tutoring Program",
      url: "./all-tutoring-programs",
      icon: <MdSettings />,
    },
    {
      id: 5,
      name: "Student Variant",
      url: "./all-student-variants",
      icon: <MdPerson />,
    },
    {
      id: 6,
      name: "Extra Subject",
      url: "./all-extra-subjects",
      icon: <MdSubject />,
    },
    {
      id: 7,
      name: "Subject",
      url: "./all-board-wise-subjects",
      icon: <MdLibraryBooks />,
    },
    {
      id: 8,
      name: "Current Affair",
      url: "./all-current-affairs",
      icon: <MdToday />,
    },
    {
      id: 9,
      name: "University",
      url: "./all-universities",
      icon: <MdAccountBalance />,
    },
    {
      id: 10,
      name: "Semester",
      url: "./all-semesters",
      icon: <MdClass />,
    },
    {
      id: 11,
      name: "Tutoring Class",
      url: "./all-tutoring-classes",
      icon: <MdClass />,
    },
    {
      id: 12,
      name: "Tutor Info",
      url: "./all-tutor-infos",
      icon: <MdAccountBox />,
    },
  ];

  const withSubmenu = [
    {
      id: 1,
      name: "Settings",
      icon: <MdSettings />,
      subMenus: [
        {
          name: "Add Education Variant",
          url: "./add-education-variant",
          icon: <span>📚</span>,
        },
        {
          name: "Add Tutoring Variant",
          url: "./add-tutoring-variant",
          icon: <span>🏫</span>,
        },
        {
          name: "Add Tutoring Place",
          url: "./add-tutoring-place",
          icon: <span>🏢</span>,
        },
        {
          name: "Add Tutoring Program",
          url: "./add-tutoring-program",
          icon: <span>📋</span>,
        },
        {
          name: "Add Student Variant",
          url: "./add-student-variant",
          icon: <span>👩‍🎓</span>,
        },
        {
          name: "Add Extra Subject",
          url: "./add-extra-subject",
          icon: <span>📖</span>,
        },
        {
          name: "Add Subject",
          url: "./add-board-wise-subject",
          icon: <span>📘</span>,
        },
        {
          name: "Add Current Affair",
          url: "./add-current-affair",
          icon: <span>🗞️</span>,
        },
        {
          name: "Add University",
          url: "./add-university",
          icon: <span>🏛️</span>,
        },
        {
          name: "Add Semester",
          url: "./add-semester",
          icon: <span>🎓</span>,
        },
        {
          name: "Add Tutoring Class",
          url: "./add-tutoring-class",
          icon: <span>📚</span>,
        },
        {
          name: "Add Tutor Info",
          url: "./add-tutor-info",
          icon: <span>👤</span>,
        },
      ],
    },
  ];

  function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${
          id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    );
  }

  return (
    <div
      className="flex flex-col h-full w-60 fixed  pb-20"
      style={{
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <div
        className="flex-1 overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#888 #f1f1f1",
          overflowX: "hidden",
          scrollMarginRight: "15px", // Adjust as needed
        }}
      >
        <div className="grid grid-cols-1 text-gray-700">
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
        <div className="grid grid-cols-1 text-gray-700">
          {withSubmenu.map((menuItem) => (
            <Accordion
              open={open === menuItem.id}
              icon={<Icon id={menuItem.id} open={open} />}
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
