import ArrayCommonComponent from "../../../../libs/TutorProfile/ArrayCommonComponent";
import CommonComponent from "../../../../libs/TutorProfile/CommonComponent";
import SubjectCommonComponent from "../../../../libs/TutorProfile/SubjectCommonComponent";
import { transformSubjectArray } from "../../../../libs/TutorProfile/transformSubjectArray";



const CommonTutoringInfo = ({ tutoringInfo }) => {
  return (
    <div className="px-5 py-5 bg-[#f1f5f9] ">
      <div className="w-full rounded-md grid grid-cols-1 lg:grid-cols-2  gap-x-2">
        <ArrayCommonComponent
          name={"Tutoring Variants"}
          values={tutoringInfo?.tutoringVariant}
          valueName={"variantName"}
        />
        <ArrayCommonComponent
          name={"Tutoring Grades"}
          values={tutoringInfo?.tutoringGrade}
          valueName={"gradeName"}
        />
        <SubjectCommonComponent
          name={"Tutoring Subjects"}
          allSubject={transformSubjectArray(tutoringInfo?.tutoringSubjects)}
        />
        <ArrayCommonComponent
          name={"Tutoring Curriculum"}
          values={tutoringInfo?.tutoringCurriculum}
          valueName={"curriculumBoard"}
        />
        <CommonComponent
          name={"Teach Admission Test"}
          value={tutoringInfo?.isTeachAdmissionTest ? "Yes" : "No"}
        />
        {tutoringInfo?.isTeachAdmissionTest ? (
          <SubjectCommonComponent
            name={"Tutoring Subjects"}
            allSubject={transformSubjectArray(tutoringInfo?.teachAdmissionTest)}
          />
        ) : (
          ""
        )}
        <CommonComponent
          name={"Teach Test Paper"}
          value={tutoringInfo?.isTeachTestPapers ? "Yes" : "No"}
        />
        {tutoringInfo?.isTeachAdmissionTest ? (
          <SubjectCommonComponent
            name={"Tutoring Subjects"}
            allSubject={transformSubjectArray(tutoringInfo?.teachTestPapers)}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CommonTutoringInfo;
