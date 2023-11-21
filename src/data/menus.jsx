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

// menu
export const menus = [
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
    name: "Tutoring Subject",
    url: "./all-tutoring-subjects",
    icon: <MdAccountBox />,
  },
  {
    id: 6,
    name: "Student Variant",
    url: "./all-student-variants",
    icon: <MdPerson />,
  },
  {
    id: 7,
    name: "Extra Subject",
    url: "./all-extra-subjects",
    icon: <MdSubject />,
  },
  {
    id: 8,
    name: "Subject",
    url: "./all-board-wise-subjects",
    icon: <MdLibraryBooks />,
  },
  {
    id: 9,
    name: "Current Affair",
    url: "./all-current-affairs",
    icon: <MdToday />,
  },
  {
    id: 10,
    name: "University",
    url: "./all-universities",
    icon: <MdAccountBalance />,
  },
  {
    id: 11,
    name: "Semester",
    url: "./all-semesters",
    icon: <MdClass />,
  },
  {
    id: 12,
    name: "Tutoring Class",
    url: "./all-tutoring-classes",
    icon: <MdClass />,
  },
  {
    id: 13,
    name: "Tutor Info",
    url: "./all-tutor-infos",
    icon: <MdAccountBox />,
  },
];

// setting menu
export const withSubmenu = [
  {
    id: 1,
    name: "Tutor Settings",
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
