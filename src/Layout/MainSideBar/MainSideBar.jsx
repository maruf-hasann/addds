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
          name: "Add Education Variant",
          url: "./add-education-variant",
        },
        {
          name: "All Education Variants",
          url: "./all-education-variants",
        },
      ],
    },
    {
      id: 2,
      name: "College",
      subMenus: [
        {
          name: "Add College",
          url: "./add-college",
        },
        {
          name: "All Colleges",
          url: "./all-colleges",
        },
      ],
    },
    {
      id: 3,
      name: "School",
      subMenus: [
        {
          name: "Add School",
          url: "./add-school",
        },
        {
          name: "All Schools",
          url: "./all-schools",
        },
      ],
    },
    {
      id: 4,
      name: "Academic Class",
      subMenus: [
        {
          name: "Add Academic Class",
          url: "./add-academic-class",
        },
        {
          name: "All Academic Classes",
          url: "./all-academic-classes",
        },
      ],
    },
    {
      id: 5,
      name: "Academic Grade",
      subMenus: [
        {
          name: "Add Academic Grade",
          url: "./add-academic-grade",
        },
        {
          name: "All Academic Grades",
          url: "./all-academic-grades",
        },
      ],
    },
    {
      id: 6,
      name: "Tutoring Subject",
      subMenus: [
        {
          name: "Add Tutoring Subject",
          url: "./add-tutoring-subject",
        },
        {
          name: "All Tutoring Subjects",
          url: "./all-tutoring-subjects",
        },
      ],
    },
    {
      id: 7,
      name: "Curriculum Board",
      subMenus: [
        {
          name: "Add Curriculum Board",
          url: "./add-curriculum-board",
        },
        {
          name: "All Curriculum Boards",
          url: "./all-curriculum-boards",
        },
      ],
    },
    {
      id: 8,
      name: "Tutor Info",
      subMenus: [
        {
          name: "Add Tutor Info",
          url: "./add-tutor-info",
        },
        {
          name: "All Tutor Infos",
          url: "./all-tutor-infos",
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
