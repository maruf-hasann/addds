import React from "react";
import { Accordion, AccordionBody, Typography } from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Schooling from "../../../public/logo.png"


const MainSideBar = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const menus = [
    {
      id: 1,
      name: "Education Variant",
      url: "./all-education-variants",
    },
    {
      id: 2,
      name: "Tutoring Variant",
      url: "./all-tutoring-variants",
    },
    {
      id: 3,
      name: "Tutoring Place",
      url: "./all-tutoring-places",
    },
    {
      id: 4,
      name: "Tutoring Program",
      url: "./all-tutoring-programs",
    },
    {
      id: 5,
      name: "Academic Class",
      url: "./all-academic-classes",
    },
    {
      id: 6,
      name: "Student Variant",
      url: "./all-student-variants",
    },
    {
      id: 7,
      name: "Extra Subject",
      url: "./all-extra-subjects",
    },
    {
      id: 8,
      name: "Subject",
      url: "./all-board-wise-subjects",
    },
    {
      id: 9,
      name: "Current Affair",
      url: "./all-current-affairs",
    },
    {
      id: 10,
      name: "University",
      url: "./all-universities",
    },
    {
      id: 11,
      name: "Semester",
      url: "./all-semesters",
    },
    {
      id: 12,
      name: "Tutoring Class",
      url: "./all-tutoring-classes",
    },

    {
      id: 13,
      name: "Tutor Info",
      url: "./all-tutor-infos",
    },

  ];

  const withSubmenu = [
    {
      id: 1,
      name: "Settings",
      subMenus: [
        {
          name: "Add Education Variant",
          url: "./add-education-variant",
        },
        {
          name: "Add Tutoring Variant",
          url: "./add-tutoring-variant",
        },
        {
          name: "Add Tutoring Place",
          url: "./add-tutoring-place",
        },
        {
          name: "Add Tutoring Program",
          url: "./add-tutoring-program",
        },
        {
          name: "Add Academic Class",
          url: "./add-academic-class",
        },
        {
          name: "Add Student Variant",
          url: "./add-student-variant",
        },
        {
          name: "Add Extra Subject",
          url: "./add-extra-subject",
        },
        {
          name: "Add Subject",
          url: "./add-board-wise-subject",
        },
        {
          name: "Add Current Affair",
          url: "./add-current-affair",
        },
        {
          name: "Add University",
          url: "./add-university",
        },
        {
          name: "Add Semester",
          url: "./add-semester",
        },
        {
          name: "Add Tutoring Class",
          url: "./add-tutoring-class",
        },
        {
          name: "Add Tutor Info",
          url: "./add-tutor-info",
        },
      ],
    },
  ]

  return (
    <aside className="flex flex-col h-full w-80 fixed bg-dark">
      {/* <div className="flex-none border-b-2 py-4">Header</div> */}
      <div
        className="flex-1"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#888 #f1f1f1",
          overflowX: "hidden",
          scrollMarginRight: "15px", // Adjust as needed
        }}
      >
        <div className="px-4 pt-32">
          <div className="fixed top-0 left-0 pl-4 bg-dark w-80">
            <img src={Schooling} className="w-40 pt-10 pb-3" alt="" />
          </div>

          {
            menus?.map(menu => (<NavLink key={menu?.id} to={menu?.url} className={({ isActive }) => (isActive ? ' block antialiased tracking-normal font-sans text-base font-medium leading-relaxed text-gray-300 capitalize py-1 bg-blue-gray-800 px-2' : 'block antialiased tracking-normal font-sans text-base font-medium leading-relaxed text-white hover:text-white capitalize py-1 px-2')}>{menu?.name}</NavLink>))
          }
          {withSubmenu?.map((menu) => (
            <Accordion open={open === menu?.id} key={menu?.id}>
              <div
                onClick={() => handleOpen(menu?.id)}
                className={`flex items-center justify-between p-3 cursor-pointer ${open === menu?.id && 'bg-blue-gray-900'}`}
              >
                <Typography variant="h6" className={`text-gray-800 font-medium capitalize ${open === menu?.id ? 'text-gray-300' : 'text-white'}`}>
                  {menu?.name}
                </Typography>
                {open === menu?.id ? (
                  <IoIosArrowUp className="text-white" />
                ) : (
                  <IoIosArrowDown className="text-white" />
                )}
              </div>
              <AccordionBody className="py-0">
                <div className="grid grid-cols-1 ">
                  {menu?.subMenus?.map((sMenu, idx) => (
                    <NavLink
                      key={idx}
                      to={`${sMenu?.url}`}
                      // className="py-1 hover:bg-blue-gray-50 px-3 capitalize"
                      className={({ isActive }) => (isActive ? ' block antialiased tracking-normal font-sans text-base font-medium leading-relaxed text-gray-300 capitalize py-1 bg-blue-gray-800 px-2' : 'block antialiased tracking-normal font-sans text-base font-medium leading-relaxed text-white hover:text-white capitalize py-1 px-2')}
                    >
                      {sMenu?.name}
                    </NavLink>
                  ))}
                </div>
              </AccordionBody>
            </Accordion>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default MainSideBar;
