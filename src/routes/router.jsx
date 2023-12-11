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
import AddUniversity from "../pages/University/AddUniversity/AddUniversity";
import AllUniversity from "../pages/University/AllUniversity/AllUniversity";
import AddTutoringClass from "../pages/TutoringClasses/AddTutoringClasses/AddTutoringClasses";
import AllTutoringClass from "../pages/TutoringClasses/AllTutoringClasses/AllTutoringClasses";
import AllTutoringClassPM from "../pages/TutoringClassPM/AllTutoringClassPM/AllTutoringClassPM";
import AllSchoolPM from "../pages/SchoolPM/AllSchoolPM/AllSchoolPM";
import AllCollageHC from "../pages/CollageHC/AllCollageHC/AllCollageHC";
import AllTutoringClassHC from "../pages/TutoringClassHC/AllTutoringClassHC/AllTutoringClassHC";
import AllCurriculumBoard from "../pages/CurriculumBoard/AllCurriculumBoard/AllCurriculumBoard";
import AllMainSubject from "../pages/MainSubject/AllMainSubject/AllMainSubject";
import AllSubSubject from "../pages/SubSubject/AllSubSubject/AllSubSubject";
import AllTutoringCurriculum from "../pages/TutoringCurriculum/AllTutoringCurriculum/AllTutoringCurriculum";
import AllSubjectClassVariantModal from "../pages/SubjectClassVariant/AllSubjectClassVariant/AllSubjectClassVariantModal";
import AllSubjectVariant from "../pages/SubjectVariant/AllSubjectVariant/AllSubjectVariant";
import AllTutoringLocation from "../pages/TutoringLocation/AllTutoringLocation/AllTutoringLocation";
import Tutors from "../pages/Tutors/Tutors";
import TutorProfile from "../pages/TutorProfile/TutorProfile";

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
        path: "/all-tutoring-categories",
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
        element: <AddUniversity />,
      },
      {
        path: "/all-universities",
        element: <AllUniversity />,
      },
      {
        path: "/add-semester",
        element: <AddSemester />,
      },
      {
        path: "/all-semesters",
        element: <AllSemester />,
      },
      {
        path: "/add-tutoring-class",
        element: <AddTutoringClass />,
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
        path: "/tutors",
        element: <Tutors />,
      },
      {
        path: "/tutor-profile/:number",
        element: <TutorProfile />,
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
