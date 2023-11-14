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
import AddStudentVariant from "../pages/StudentVariant/AddStudentVariant/AddStudentVariant";
import AllStudentVariant from "../pages/StudentVariant/StudentVariantVariant/AllStudentVariant";
import AllTutoringPlace from "../pages/TutoringPlace/AllTutoringPlace/AllTutoringPlace";
import AddTutoringPlace from "../pages/TutoringPlace/AddTutoringPlace/AddTutoringPlace";
import AddTutoringProgram from "../pages/TutoringProgram/AddTutoringProgram/AddTutoringProgram";
import AllTutoringProgram from "../pages/TutoringProgram/AllTutoringProgram/AllTutoringProgram";
import AddExtraSubject from "../pages/ExtraSubject/AddExtraSubject/AddExtraSubject";
import AllExtraSubject from "../pages/ExtraSubject/AllExtraSubject/AllExtraSubject";
import AddBoardWiseSubject from "../pages/BoardWiseSubject/AddBoardWiseSubject/AddBoardWiseSubject";
import AllBoardWiseSubject from "../pages/BoardWiseSubject/AllBoardWiseSubject/AllBoardWiseSubject";
import AddCurrentAffair from "../pages/CurrentAffair/AddCurrentAffair/AddCurrentAffair";
import AllCurrentAffair from "../pages/CurrentAffair/AllCurrentAffair/AllCurrentAffair";
import AddSemester from "../pages/Semester/AddSemester/AddSemester";
import AllSemester from "../pages/Semester/AllSemester/AllSemester";

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
        path: "/add-tutoring-program",
        element: <AddTutoringProgram />,
      },
      {
        path: "/all-tutoring-programs",
        element: <AllTutoringProgram />,
      },
      {
        path: "/add-tutoring-place",
        element: <AddTutoringPlace />,
      },
      {
        path: "/all-tutoring-places",
        element: <AllTutoringPlace />,
      },
      {
        path: "/add-student-variant",
        element: <AddStudentVariant />,
      },
      {
        path: "/all-student-variants",
        element: <AllStudentVariant />,
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
      {
        path: "/add-extra-subject",
        element: <AddExtraSubject />,
      },
      {
        path: "/all-extra-subjects",
        element: <AllExtraSubject />,
      },
      {
        path: "/add-board-wise-subject",
        element: <AddBoardWiseSubject />,
      },
      {
        path: "/all-board-wise-subjects",
        element: <AllBoardWiseSubject />,
      },
      {
        path: "/add-current-affair",
        element: <AddCurrentAffair />,
      },
      {
        path: "/all-current-affairs",
        element: <AllCurrentAffair />,
      },
      {
        path: "/add-university",
        element: <AddCurrentAffair />,
      },
      {
        path: "/all-universities",
        element: <AllCurrentAffair />,
      },
      {
        path: "/add-semester",
        element: <AddSemester />,
      },
      {
        path: "/all-semesters",
        element: <AllSemester />,
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
