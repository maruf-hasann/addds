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
      name: "College",
      subMenus: [
        {
          name: "All Colleges",
          url: "./all-colleges",
        },
        {
          name: "Add College",
          url: "./add-college",
        },
      ],
    },
    {
      id: 4,
      name: "School",
      subMenus: [
        {
          name: "All Schools",
          url: "./all-schools",
        },
        {
          name: "Add School",
          url: "./add-school",
        },
      ],
    },
    {
      id: 5,
      name: "Academic Class",
      subMenus: [
        {
          name: "All Academic Classes",
          url: "./all-academic-classes",
        },
        {
          name: "Add Academic Class",
          url: "./add-academic-class",
        },
      ],
    },
    {
      id: 6,
      name: "Academic Grade",
      subMenus: [
        {
          name: "All Academic Grades",
          url: "./all-academic-grades",
        },
        {
          name: "Add Academic Grade",
          url: "./add-academic-grade",
        },
      ],
    },
    {
      id: 7,
      name: "Tutoring Subject",
      subMenus: [
        {
          name: "All Tutoring Subjects",
          url: "./all-tutoring-subjects",
        },
        {
          name: "Add Tutoring Subject",
          url: "./add-tutoring-subject",
        },
      ],
    },
    {
      id: 8,
      name: "Curriculum Board",
      subMenus: [
        {
          name: "All Curriculum Boards",
          url: "./all-curriculum-boards",
        },
        {
          name: "Add Curriculum Board",
          url: "./add-curriculum-board",
        },
      ],
    },
    {
      id: 9,
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
    {
      id: 10,
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
      id: 11,
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
      id: 12,
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
