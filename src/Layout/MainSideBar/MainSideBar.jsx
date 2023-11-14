import React from "react";
import { Accordion, AccordionBody, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const MainSideBar = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const menus = [
    {
      id: 1,
      name: "Education Variant",
      subMenus: [
        {
          name: "All Education Variants",
          url: "./all-education-variants",
        },
        {
          name: "Add Education Variant",
          url: "./add-education-variant",
        },
      ],
    },
    {
      id: 2,
      name: "Tutoring Variant",
      subMenus: [
        {
          name: "All Tutoring Variants",
          url: "./all-tutoring-variants",
        },
        {
          name: "Add Tutoring Variant",
          url: "./add-tutoring-variant",
        },
      ],
    },
    {
      id: 3,
      name: "Tutoring Place",
      subMenus: [
        {
          name: "All Tutoring Places",
          url: "./all-tutoring-places",
        },
        {
          name: "Add Tutoring Place",
          url: "./add-tutoring-place",
        },
      ],
    },
    {
      id: 4,
      name: "Tutoring Program",
      subMenus: [
        {
          name: "All Tutoring Programs",
          url: "./all-tutoring-programs",
        },
        {
          name: "Add Tutoring Program",
          url: "./add-tutoring-program",
        },
      ],
    },
    {
      id: 5,
      name: "Student Variant",
      subMenus: [
        {
          name: "All Student Variants",
          url: "./all-student-variants",
        },
        {
          name: "Add Student Variant",
          url: "./add-student-variant",
        },
      ],
    },
    {
      id: 6,
      name: "Extra Subject",
      subMenus: [
        {
          name: "All Extra Subjects",
          url: "./all-extra-subjects",
        },
        {
          name: "Add Extra Subject",
          url: "./add-extra-subject",
        },
      ],
    },
    {
      id: 7,
      name: "Subject",
      subMenus: [
        {
          name: "All Subjects",
          url: "./all-board-wise-subjects",
        },
        {
          name: "Add Subject",
          url: "./add-board-wise-subject",
        },
      ],
    },
    {
      id: 8,
      name: "Current Affair",
      subMenus: [
        {
          name: "All Current Affairs",
          url: "./all-current-affairs",
        },
        {
          name: "Add Current Affair",
          url: "./add-current-affair",
        },
      ],
    },
    {
      id: 9,
      name: "University",
      subMenus: [
        {
          name: "All Universities",
          url: "./all-universities",
        },
        {
          name: "Add University",
          url: "./add-university",
        },
      ],
    },
    {
      id: 10,
      name: "Semester",
      subMenus: [
        {
          name: "All Semesters",
          url: "./all-semesters",
        },
        {
          name: "Add Semester",
          url: "./add-semester",
        },
      ],
    },
    {
      id: 11,
      name: "Tutoring Class",
      subMenus: [
        {
          name: "All Tutoring Classes",
          url: "./all-tutoring-classes",
        },
        {
          name: "Add Tutoring Class",
          url: "./add-tutoring-class",
        },
      ],
    },

    {
      id: 12,
      name: "Tutor Info",
      subMenus: [
        {
          name: "All Tutor Infos",
          url: "./all-tutor-infos",
        },
        {
          name: "Add Tutor Info",
          url: "./add-tutor-info",
        },
      ],
    },
  ];

  return (
    <aside className="border-r-2 flex flex-col h-full overflow-hidden">
      {/* <div className="flex-none border-b-2 py-4">Header</div> */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#888 #f1f1f1",
          overflowX: "hidden",
          scrollMarginRight: "15px", // Adjust as needed
        }}
      >
        <div className="px-2">
          {menus?.map((menu) => (
            <Accordion open={open === menu?.id} key={menu?.id}>
              <div
                onClick={() => handleOpen(menu?.id)}
                className="flex items-center justify-between py-2 cursor-pointer"
              >
                <Typography variant="h6" className="text-gray-600 capitalize">
                  {menu?.name}
                </Typography>
                {open === menu?.id ? (
                  <IoIosArrowUp className="text-gray-600" />
                ) : (
                  <IoIosArrowDown className="text-gray-600" />
                )}
              </div>
              <AccordionBody className="py-0">
                <div className="grid grid-cols-1">
                  {menu?.subMenus?.map((sMenu, idx) => (
                    <Link
                      key={idx}
                      to={`${sMenu?.url}`}
                      className="py-1 hover:bg-blue-gray-50 px-3 capitalize"
                    >
                      {sMenu?.name}
                    </Link>
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
