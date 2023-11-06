import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import SecondLayout from "../Layout/SecondLayout";
import LoginPage from "../pages/Login/LoginPage";
import AddEducationVariant from "../pages/EducationVariant/AddEducationVariant/AddEducationVariant";
import AllEducationVariant from "../pages/EducationVariant/AllEducationVariant/AllEducationVariant";
import AllCollege from "../pages/College/AllCollege/AllCollege";
import AddCollege from "../pages/College/AddCollege/AddCollege";
import AddSchool from "../pages/School/AddSchool/AddSchool";
import AllSchool from "../pages/School/AllSchool/AllSchool";
import AddAcademicClass from "../pages/AcademicClass/AddAcademicClass/AddAcademicClass";
import AllAcademicClass from "../pages/AcademicClass/AllAcademicClass/AllAcademicClass";
import AddAcademicGrade from "../pages/AcademicGrade/AddAcademicGrade/AddAcademicGrade";
import AllAcademicGrade from "../pages/AcademicGrade/AllAcademicGrade/AllAcademicGrade";
import AddTutoringSubject from "../pages/TutoringSubject/AddTutoringSubject/AddTutoringSubject";
import AllTutoringSubject from "../pages/TutoringSubject/AllTutoringSubject/AllTutoringSubject";
import AddCurriculumBoard from "../pages/CurriculumBoard/AddCurriculumBoard/AddCurriculumBoard";
import AllCurriculumBoard from "../pages/CurriculumBoard/AllCurriculumBoard/AllCurriculumBoard";
import AddTutorsInfo from "../pages/TutorsInfo/AddTutorsInfo/AddTutorsInfo";
import AllTutoringInfo from "../pages/TutorsInfo/AllTutorsInfo/AllTutorsInfo";
import AddTutoringVariant from "../pages/TutoringVariant/AddTutoringVariant/AddTutoringVariant";
import AllTutoringVariant from "../pages/TutoringVariant/AllTutoringVariant/AllTutoringVariant";

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
        path: "/add-tutoring-variant",
        element: <AddTutoringVariant />,
      },
      {
        path: "/all-tutoring-variants",
        element: <AllTutoringVariant />,
      },
      {
        path: "/add-college",
        element: <AddCollege />,
      },
      {
        path: "/all-colleges",
        element: <AllCollege />,
      },
      {
        path: "/add-school",
        element: <AddSchool />,
      },
      {
        path: "/all-schools",
        element: <AllSchool />,
      },
      {
        path: "/add-academic-class",
        element: <AddAcademicClass />,
      },
      {
        path: "/all-academic-classes",
        element: <AllAcademicClass />,
      },
      {
        path: "/add-academic-grade",
        element: <AddAcademicGrade />,
      },
      {
        path: "/all-academic-grades",
        element: <AllAcademicGrade />,
      },
      {
        path: "/add-tutoring-subject",
        element: <AddTutoringSubject />,
      },
      {
        path: "/all-tutoring-subjects",
        element: <AllTutoringSubject />,
      },
      {
        path: "/add-curriculum-board",
        element: <AddCurriculumBoard />,
      },
      {
        path: "/all-curriculum-boards",
        element: <AllCurriculumBoard />,
      },
      {
        path: "/add-tutor-info",
        element: <AddTutorsInfo />,
      },
      {
        path: "/all-tutor-infos",
        element: <AllTutoringInfo />,
      },
      
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
