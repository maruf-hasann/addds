import {
    // MdSchool,
    // MdBusiness,
    // MdPlaylistAddCheck,
    // MdPerson,
    // MdToday,
    // MdAccountBalance,
    // MdClass,
    // MdWorkHistory,
    MdOutlineAddHomeWork,
    // MdOutlineWork,
    MdAssuredWorkload,
    // MdSettings,
    // MdLibraryBooks,
    MdPermMedia,
    MdDashboardCustomize,
    MdOutlineSettings
} from "react-icons/md";
import { FaBlog, FaSchoolFlag } from "react-icons/fa6";
import { FaSchool, FaBook } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { RiParentFill } from "react-icons/ri";
import { PiStudentBold } from "react-icons/pi";
import { MdCastForEducation } from "react-icons/md";
import { BiSolidSchool } from "react-icons/bi";

// menu
export const menus = [
    {
        id: 0,
        name: "Dashboard",
        url: "./",
        icon: <MdDashboardCustomize size={23} className="text-primary" />,
    },
    {
        id: 1,
        name: "Media Library",
        url: "./media-library",
        icon: <MdPermMedia size={22} className="text-primary" />,
    },
    // {
    //     id: 1,
    //     name: "Education Variant",
    //     url: "./all-education-variants",
    //     icon: <MdSchool size={23} className="text-primary" />,
    // },
    // {
    //     id: 2,
    //     name: "Tutoring Variant",
    //     url: "./all-tutoring-variants",
    //     icon: <MdBusiness size={23} className="text-primary" />,
    // },
    // {
    //     id: 3,
    //     name: "Tutoring Place",
    //     url: "./all-tutoring-places",
    //     icon: <MdPlaylistAddCheck size={23} className="text-primary" />,
    // },
    // {
    //     id: 4,
    //     name: "Tutoring Program",
    //     url: "./all-tutoring-programs",
    //     icon: <MdSettings size={23} className="text-primary" />,
    // },
    // {
    //     id: 6,
    //     name: "Tutoring Category",
    //     url: "./all-tutoring-categories",
    //     icon: <MdPerson size={23} className="text-primary" />,
    // },
    // {
    //   id: 7,
    //   name: "Extra Subject",
    //   url: "./all-extra-subjects",
    //   icon: <MdSubject />,
    // },
    // {
    //   id: 8,
    //   name: "Subject",
    //   url: "./all-board-wise-subjects",
    //   icon: <MdLibraryBooks />,
    // },
    // {
    //     id: 9,
    //     name: "Current Affair",
    //     url: "./all-current-affairs",
    //     icon: <MdToday size={23} className="text-primary" />,
    // },
    // {
    //     id: 10,
    //     name: "University",
    //     url: "./all-universities",
    //     icon: <MdAccountBalance size={23} className="text-primary" />,
    // },
    // {
    //     id: 11,
    //     name: "Semester",
    //     url: "./all-semesters",
    //     icon: <MdClass size={23} className="text-primary" />,
    // },
    // {
    //     id: 12,
    //     name: "Tutoring Class",
    //     url: "./all-tutoring-classes",
    //     icon: <MdClass size={23} className="text-primary" />,
    // },

    // {
    //     id: 14,
    //     name: "School PM",
    //     url: "./all-school-pm",
    //     icon: <MdLibraryBooks size={23} className="text-primary" />,
    // },
    // {
    //     id: 15,
    //     name: "Collage HC",
    //     url: "./all-collage-hc",
    //     icon: <MdToday size={23} className="text-primary" />,
    // },
    // {
    //     id: 16,
    //     name: "Tutoring Class PM",
    //     url: "./all-tutoring-class-pm",
    //     icon: <MdClass size={23} className="text-primary" />,
    // },
    // {
    //   id: 17,
    //   name: "Tutoring Class HC",
    //   url: "./all-tutoring-class-hc",
    //   icon: <MdSubject />,
    // },
    // {
    //     id: 18,
    //     name: "Tutoring Location",
    //     url: "./all-tutoring-location",
    //     icon: <MdLibraryBooks size={23} className="text-primary" />,
    // },
    // {
    //   id: 19,
    //   name: "Tutors",
    //   url: "./tutors",
    //   icon: <FaUserGraduate />,
    // },

    // {
    //     id: 20,
    //     name: "Curriculum Board",
    //     url: "./all-curriculum-board",
    //     icon: <MdAccountBalance size={23} className="text-primary" />,
    // },
    // {
    //     id: 21,
    //     name: "Main Subject",
    //     url: "./all-main-subject",
    //     icon: <MdClass size={23} className="text-primary" />,
    // },
    // {
    //     id: 22,
    //     name: "Sub Subject",
    //     url: "./all-sub-subject",
    //     icon: <MdClass size={23} className="text-primary" />,
    // },
    // {
    //     id: 23,
    //     name: "Tutoring Curriculum",
    //     url: "./tutoring-curriculum",
    //     icon: <MdClass size={23} className="text-primary" />,
    // },
    // {
    //     id: 24,
    //     name: "Subject Class Variant",
    //     url: "./subject-class-variant",
    //     icon: <MdClass size={23} className="text-primary" />,
    // },
    // {
    //     id: 25,
    //     name: "Subject Variant",
    //     url: "./subject-variant",
    //     icon: <MdClass size={23} className="text-primary" />,
    // },
    // {
    //     id: 26,
    //     name: "Mock Pricing",
    //     url: "./mock-pricing",
    //     icon: <MdClass size={23} className="text-primary" />,
    // },
    // {
    //     id: 27,
    //     name: "Add Tutor Info",
    //     url: "./add-tutor-info",
    //     icon: <GiTeacher size={22} className="text-primary" />,
    // },
];

// setting menu
export const withSubmenu = [
  {
    id: 1,
    name: "Education",
    icon: <MdCastForEducation size={22} className="text-primary" />,
    subMenus: [
      {
        name: "Education Variant",
        url: "./all-education-variants",
      },
      {
        name: "Curriculum Board",
        url: "./all-curriculum-board",
      },
      {
        name: "Current Affair",
        url: "./all-current-affairs",
      },
    ],
  },
  {
    id: 2,
    name: "Subjects",
    icon: <FaBook size={20} className="text-primary" />,
    subMenus: [
      {
        name: "Subject Class Variant",
        url: "./subject-class-variant",
      },
      {
        name: "Subject Variant",
        url: "./subject-variant",
      },
      {
        name: "Mock Pricing",
        url: "./mock-pricing",
      },
      {
        name: "Main Subject",
        url: "./all-main-subject",
      },
      {
        name: "Sub Subject",
        url: "./all-sub-subject",
      },
    ],
  },
  {
    id: 3,
    name: "University",
    icon: <BiSolidSchool size={22} className="text-primary" />,
    subMenus: [
      {
        name: "University",
        url: "./all-universities",
      },
      {
        name: "Semester",
        url: "./all-semesters",
      },
    ],
  },
  {
    id: 4,
    name: "College",
    icon: <FaSchoolFlag size={22} className="text-primary" />,
    subMenus: [
      {
        name: "Collage HC",
        url: "./all-collage-hc",
      },
    ],
  },
  {
    id: 5,
    name: "School",
    icon: <FaSchool size={22} className="text-primary" />,
    subMenus: [
      {
        name: "School PM",
        url: "./all-school-pm",
      },
    ],
  },

  {
    id: 6,
    name: "Tutors",
    icon: <GiTeacher size={22} className="text-primary" />,
    subMenus: [
      {
        name: "Add Tutor Info",
        url: "./add-tutor-info",
      },
      {
        name: "Tutoring Variant",
        url: "./all-tutoring-variants",
      },
      {
        name: "Tutoring Place",
        url: "./all-tutoring-places",
      },
      {
        name: "Tutoring Program",
        url: "./all-tutoring-programs",
      },
      {
        name: "Tutoring Category",
        url: "./all-tutoring-categories",
      },
      {
        name: "Tutoring Class",
        url: "./all-tutoring-classes",
      },
      {
        name: "Tutoring Class PM",
        url: "./all-tutoring-class-pm",
      },
      {
        name: "Tutoring Location",
        url: "./all-tutoring-location",
      },
      {
        name: "Tutoring Curriculum",
        url: "./tutoring-curriculum",
      },
      {
        name: "Tutor Account",
        url: "./tutor-account",
      },
      {
        name: "Academic Tutoring",
        url: "./academic-tutoring",
      },
    ],
  },
  {
    id: 7,
    name: "Parents",
    icon: <RiParentFill size={22} className="text-primary" />,
    subMenus: [
      {
        name: "All Parent Account",
        url: "./all-parent-account",
        icon: <span>🧾</span>,
      },
    ],
  },
  {
    id: 8,
    name: "Students",
    icon: <PiStudentBold size={22} className="text-primary" />,
    subMenus: [
      {
        name: "All Student Account",
        url: "./all-student-account",
        icon: <span>🧾</span>,
      },
    ],
  },
  {
    id: 9,
    name: "Blog",
    icon: <FaBlog size={21} className="text-primary" />,
    subMenus: [
      {
        name: "All Blog",
        url: "./blog",
        icon: <span>🧾</span>,
      },
      {
        name: "Category",
        url: "./category",
        icon: <span>🧾</span>,
      },
      {
        name: "Video",
        url: "./video",
        icon: <span>🧾</span>,
      },
      {
        name: "Banner",
        url: "./blog-banner",
        icon: <span>🧾</span>,
      },
    ],
  },
  {
    id: 10,
    name: "Regular Jobs Board",
    icon: <MdAssuredWorkload size={22} className="text-primary" />,
    subMenus: [
      {
        name: "Active Jobs",
        url: "./all-active-regular-jobs",
        icon: <span>🧾</span>,
      },
      {
        name: "InActive Jobs",
        url: "./all-un-active-regular-jobs",
        icon: <span>🧾</span>,
      },
      {
        name: "Hired  Jobs",
        url: "./all-hired-regular-jobs",
        icon: <span>🧾</span>,
      },
    ],
  },
  {
    id: 11,
    name: "Mock Test Jobs Board",
    icon: <MdOutlineAddHomeWork size={22} className="text-primary" />,
    subMenus: [
      {
        name: "Active Jobs",
        url: "./all-active-mock-test-jobs",
        icon: <span>🧾</span>,
      },
      {
        name: "InActive Jobs",
        url: "./all-un-active-mock-test-jobs",
        icon: <span>🧾</span>,
      },
      {
        name: "Hired Jobs",
        url: "./all-hired-mock-test-jobs",
        icon: <span>🧾</span>,
      },
    ],
  },
  {
    id: 12,
    name: "Settings",
    icon: <MdOutlineSettings size={22} className="text-primary" />,
    subMenus: [
      {
        name: "Dashboard Widgets",
        url: "./settings/dashboard-widgets",
      },
    ],
  },
];

export function SettingIcon({ id, open }) {
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
