import {
    MdOutlineAddHomeWork,
    MdAssuredWorkload,
    MdPermMedia,
    MdDashboardCustomize,
    MdDashboard,
} from "react-icons/md";
import { FaBlog } from "react-icons/fa6";
import { FaBook, FaChalkboardTeacher, FaHouseUser } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { RiParentFill } from "react-icons/ri";
import { PiStudentBold } from "react-icons/pi";
import { MdCastForEducation } from "react-icons/md";

// menu
export const menus = [
    {
        id: 0,
        name: "Dashboard",
        url: "./",
        icon: <MdDashboard size={23} className="text-primary" />,
    },
    {
        id: 1,
        name: "Media Library",
        url: "./media-library",
        icon: <MdPermMedia size={22} className="text-primary" />,
    },

    {
        id: 2,
        name: "Parents",
        icon: <RiParentFill size={22} className="text-primary" />,
        url: "./all-parent-account",
    },
    {
        id: 3,
        name: "Students",
        icon: <PiStudentBold size={22} className="text-primary" />,
        url: "./all-student-account",
    },
    {
        id: 4,
        name: "Register Tutor",
        icon: <FaHouseUser size={21} className="text-primary" />,
        url: "./add-tutor-info",
    },
];

// setting menu
export const withSubmenu = [
    {
        id: 1,
        name: "Tutor",
        icon: <GiTeacher size={22} className="text-primary" />,
        subMenus: [
            {
                name: "Tutor Account",
                url: "./tutor-account",
            },
            {
                name: "Tutoring Info",
                url: "./academic-tutoring",
            },
        ],
    },
    {
        id: 2,
        name: "Tutoring Setting",
        icon: <FaChalkboardTeacher size={22} className="text-primary" />,
        subMenus: [
            {
                name: "Education Variant",
                url: "./all-education-variants",
            },
            {
                name: "Tutoring Variant",
                url: "./all-tutoring-variants",
            },
            // {
            //     name: "Add Tutor Info",
            //     url: "./add-tutor-info",
            // },
            {
                name: "Tutoring Place",
                url: "./all-tutoring-places",
            },
            // {
            //     name: "Tutoring Program",
            //     url: "./all-tutoring-programs",
            // },
            {
                name: "Tutoring Category",
                url: "./all-tutoring-categories",
            },
            {
                name: "Additional Program",
                url: "./all-tutoring-programs",
            },
            // {
            //     name: "Tutoring Class",
            //     url: "./all-tutoring-classes",
            // },
            {
                name: "Tutoring Class",
                url: "./all-tutoring-class-pm",
            },
            {
                name: "Tutoring Curriculum",
                url: "./tutoring-curriculum",
            },
            {
                name: "Tutoring Location",
                url: "./all-tutoring-location",
            },
        ],
    },
    {
        id: 3,
        name: "Subject Setting",
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
                name: "Main Subject",
                url: "./all-main-subject",
            },
            {
                name: "Sub Subject",
                url: "./all-sub-subject",
            },
            {
                name: "Mock Pricing",
                url: "./mock-pricing",
            },
        ],
    },
    {
        id: 4,
        name: "Account Setting",
        icon: <MdCastForEducation size={22} className="text-primary" />,
        subMenus: [
            {
                name: "Curriculum Board",
                url: "./all-curriculum-board",
            },
            {
                name: "School",
                url: "./all-school-pm",
            },
            {
                name: "Collage",
                url: "./all-collage-hc",
            },
            {
                name: "University",
                url: "./all-universities",
            },
            {
                name: "Semester",
                url: "./all-semesters",
            },

            {
                name: "Current Affair",
                url: "./all-current-affairs",
            },
        ],
    },

    {
        id: 5,
        name: "Blog Setting",
        icon: <FaBlog size={21} className="text-primary" />,
        subMenus: [
            {
                name: "All Blog",
                url: "./blog",
            },
            {
                name: "Category",
                url: "./category",
            },    {
                name: "Sub Category",
                url: "./sub-category",
            },
            {
                name: "Video",
                url: "./video",
            },
            {
                name: "Banner",
                url: "./blog-banner",
            },
        ],
    },
    {
        id: 6,
        name: "Tutoring Job",
        icon: <MdAssuredWorkload size={22} className="text-primary" />,
        subMenus: [
            {
                name: "Active Jobs",
                url: "./all-active-regular-jobs",
            },
            {
                name: "InActive Jobs",
                url: "./all-un-active-regular-jobs",
            },
            {
                name: "Hired  Jobs",
                url: "./all-hired-regular-jobs",
            },
        ],
    },
    {
        id: 7,
        name: "Mock Jobs",
        icon: <MdOutlineAddHomeWork size={22} className="text-primary" />,
        subMenus: [
            {
                name: "Active Jobs",
                url: "./all-active-mock-test-jobs",
            },
            {
                name: "InActive Jobs",
                url: "./all-un-active-mock-test-jobs",
            },
            {
                name: "Hired Jobs",
                url: "./all-hired-mock-test-jobs",
            },
        ],
    },
    {
        id: 8,
        name: "Dashboard Setting",
        icon: <MdDashboardCustomize size={22} className="text-primary" />,
        subMenus: [
            {
                name: "Widgets",
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
