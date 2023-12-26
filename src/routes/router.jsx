import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import SecondLayout from "../Layout/SecondLayout";
import LoginPage from "../pages/Login/LoginPage";

import AllEducationVariant from "../pages/EducationVariant/AllEducationVariant/AllEducationVariant";
import AddTutorsInfo from "../pages/TutorsInfo/AddTutorsInfo/AddTutorsInfo";
import AllTutoringVariant from "../pages/TutoringVariant/AllTutoringVariant/AllTutoringVariant";

import AllStudentVariant from "../pages/StudentVariant/StudentVariantVariant/AllStudentVariant";
import AllTutoringPlace from "../pages/TutoringPlace/AllTutoringPlace/AllTutoringPlace";

import AllTutoringProgram from "../pages/TutoringProgram/AllTutoringProgram/AllTutoringProgram";

import AllExtraSubject from "../pages/ExtraSubject/AllExtraSubject/AllExtraSubject";

import AllBoardWiseSubject from "../pages/BoardWiseSubject/AllBoardWiseSubject/AllBoardWiseSubject";

import AllCurrentAffair from "../pages/CurrentAffair/AllCurrentAffair/AllCurrentAffair";

import AllSemester from "../pages/Semester/AllSemester/AllSemester";

import AllUniversity from "../pages/University/AllUniversity/AllUniversity";

import AllTutoringClass from "../pages/TutoringClasses/AllTutoringClasses/AllTutoringClasses";
import AllTutoringClassPM from "../pages/TutoringClassPM/AllTutoringClassPM/AllTutoringClassPM";
import AllSchoolPM from "../pages/SchoolPM/AllSchoolPM/AllSchoolPM";
import AllCollageHC from "../pages/CollageHC/AllCollageHC/AllCollageHC";
import AllTutoringClassHC from "../pages/TutoringClassHC/AllTutoringClassHC/AllTutoringClassHC";
import AllCurriculumBoard from "../pages/CurriculumBoard/AllCurriculumBoard/AllCurriculumBoard";
import AllMainSubject from "../pages/MainSubject/AllMainSubject/AllMainSubject";
import AllTutoringCurriculum from "../pages/TutoringCurriculum/AllTutoringCurriculum/AllTutoringCurriculum";
import AllSubjectClassVariantModal from "../pages/SubjectClassVariant/AllSubjectClassVariant/AllSubjectClassVariantModal";
import AllSubjectVariant from "../pages/SubjectVariant/AllSubjectVariant/AllSubjectVariant";
import AllTutoringLocation from "../pages/TutoringLocation/AllTutoringLocation/AllTutoringLocation";
import TutorProfile from "../pages/TutorProfile/TutorProfile";
import TutorAccount from "../pages/Tutors/TutorAccount/TutorAccount";
import AcademicTutoring from "../pages/Tutors/AcademicTutoring/AcademicTutoring";
import ParentAccount from "../pages/Parents/ParentAccount/ParentAccount";
import StudentAccount from "../pages/StudentAccount/StudentAccount/StudentAccount";
import ParentDetails from "../pages/Parents/ParentDetails/ParentDetails";
import AllMockPricing from "../pages/MockPricing/AllMockPricing/AllMockPricing";

import AllSubSubject from "../pages/SubSubject/AllSubSubject";
import StudentDetails from "../pages/StudentAccount/StudentAccount/StudentDetails/StudentDetails";
import AcademicTutoringDetails from "../pages/Tutors/AcademicTutoring/AcademicTutoringDetails/AcademicTutoringDetails";
import TutorAccountDetails from "../pages/Tutors/TutorAccount/TutorAccountDetails/TutorAccountDetails";
import RegularActiveJobBoard from "../pages/JobBoard/RegularJobBoard/RegularActiveJobBoard";
import RegularUnActiveJobBoard from "../pages/JobBoard/RegularJobBoard/RegularUnActiveJobBoard";
import MockTesActiveJobBoard from "../pages/JobBoard/MockTestJobBoard/MockTesActiveJobBoard";
import MockTesUnActiveJobBoard from "../pages/JobBoard/MockTestJobBoard/MockTesUnActiveJobBoard";
import RegularHiredJobBoard from "../pages/JobBoard/RegularJobBoard/RegularHiredJobBoard";
import MockTestHiredJobBoard from "../pages/JobBoard/MockTestJobBoard/MockTestHiredJobBoard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <AllEducationVariant />,
      },
      {
        path: "/all-education-variants",
        element: <AllEducationVariant />,
      },
      {
        path: "/all-tutoring-variants",
        element: <AllTutoringVariant />,
      },
      {
        path: "/all-tutoring-programs",
        element: <AllTutoringProgram />,
      },

      {
        path: "/all-tutoring-places",
        element: <AllTutoringPlace />,
      },

      {
        path: "/all-tutoring-categories",
        element: <AllStudentVariant />,
      },

      {
        path: "/add-tutor-info",
        element: <AddTutorsInfo />,
      },

      {
        path: "/all-extra-subjects",
        element: <AllExtraSubject />,
      },

      {
        path: "/all-board-wise-subjects",
        element: <AllBoardWiseSubject />,
      },

      {
        path: "/all-current-affairs",
        element: <AllCurrentAffair />,
      },

      {
        path: "/all-universities",
        element: <AllUniversity />,
      },

      {
        path: "/all-semesters",
        element: <AllSemester />,
      },

      {
        path: "/all-tutoring-classes",
        element: <AllTutoringClass />,
      },
      {
        path: "/all-school-pm",
        element: <AllSchoolPM />,
      },
      {
        path: "/all-collage-hc",
        element: <AllCollageHC />,
      },
      {
        path: "/all-tutoring-class-pm",
        element: <AllTutoringClassPM />,
      },
      {
        path: "/all-tutoring-class-hc",
        element: <AllTutoringClassHC />,
      },
      {
        path: "/all-curriculum-board",
        element: <AllCurriculumBoard />,
      },
      {
        path: "/all-main-subject",
        element: <AllMainSubject />,
      },
      {
        path: "/all-sub-subject",
        element: <AllSubSubject />,
      },
      {
        path: "/tutoring-curriculum",
        element: <AllTutoringCurriculum />,
      },
      {
        path: "/subject-class-variant",
        element: <AllSubjectClassVariantModal />,
      },
      {
        path: "/subject-variant",
        element: <AllSubjectVariant />,
      },
      {
        path: "/all-tutoring-location",
        element: <AllTutoringLocation />,
      },

      {
        path: "/tutor-profile/:number",
        element: <TutorProfile />,
      },
      {
        path: "/mock-pricing",
        element: <AllMockPricing />,
      },
      {
        path: "/tutor-account",
        element: <TutorAccount />,
      },
      {
        path: "/academic-tutoring",
        element: <AcademicTutoring />,
      },
      {
        path: "/academic-tutoring-details/:number",
        element: <AcademicTutoringDetails />,
      },
      {
        path: "/tutor-account-details/:number",
        element: <TutorAccountDetails />,
      },
      {
        path: "/all-parent-account",
        element: <ParentAccount />,
      },
      {
        path: "/parent-profile/:number",
        element: <ParentDetails />,
      },
      {
        path: "/all-student-account",
        element: <StudentAccount />,
      },
      {
        path: "/student-profile/:number",
        element: <StudentDetails />,
      },
      {
        path: "/all-active-regular-jobs",
        element: <RegularActiveJobBoard />,
      },
      {
        path: "/all-un-active-regular-jobs",
        element: <RegularUnActiveJobBoard />,
      },
      {
        path: "/all-hired-regular-jobs",
        element: <RegularHiredJobBoard />,
      },
      {
        path: "/all-active-mock-test-jobs",
        element: <MockTesActiveJobBoard />,
      },
      {
        path: "/all-un-active-mock-test-jobs",
        element: <MockTesUnActiveJobBoard />,
      },
      {
        path: "/all-hired-mock-test-jobs",
        element: <MockTestHiredJobBoard />,
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
