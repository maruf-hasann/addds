import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import SecondLayout from "../Layout/SecondLayout";
import LoginPage from "../pages/Login/LoginPage";
import AddEducationVariant from "../pages/EducationVariant/AddEducationVariant/AddEducationVariant";
import AllEducationVariant from "../pages/EducationVariant/AllEducationVariant/AllEducationVariant";
import AllCollege from "../pages/College/AllCollege/AllCollege";
import AddCollege from "../pages/College/AddCollege/AddCollege";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <AddEducationVariant />,
      },
      {
        path: "/add-education-variant",
        element: <AddEducationVariant />,
      },
      {
        path: "/all-education-variants",
        element: <AllEducationVariant />,
      },
      {
        path: "/add-college",
        element: <AddCollege />,
      },
      {
        path: "/all-colleges",
        element: <AllCollege />,
      },
      // {
      //   path: "/add-school",
      //   element: <AddSchool />,
      // },
      // {
      //   path: "/all-college",
      //   element: <AllCollege />,
      // },
      // {
      //   path: "/add-academic-class",
      //   element: <AddAcademicClass />,
      // },
      // {
      //   path: "/all-academic-class",
      //   element: <AllAcademicClass />,
      // },
      // {
      //   path: "/add-academic-grade",
      //   element: <AddAcademicGrade />,
      // },
      // {
      //   path: "/all-academic-grade",
      //   element: <AllAcademicGrade />,
      // },
      // {
      //   path: "/add-tutoring-subject",
      //   element: <AddTutoringSubject />,
      // },
      // {
      //   path: "/all-tutoring-subject",
      //   element: <AllTutoringSubject />,
      // },
      // {
      //   path: "/add-curriculum-board",
      //   element: <AddCurriculumBoard />,
      // },
      // {
      //   path: "/all-curriculum-board",
      //   element: <AllCurriculumBoard />,
      // },
      // {
      //   path: "/add-tutors-info",
      //   element: <AddTutorsInfo />,
      // },
      // {
      //   path: "/all-tutors-info",
      //   element: <AllTutorsInfo />,
      // },
      
    ],
  },
  {
    path: "/login",
    element: <SecondLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);
