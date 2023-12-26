import React from "react";
import { TbSquareRoundedCheckFilled } from "react-icons/tb";
import {
  ArrayCommonComponent,
  CommonComponent,
  SubjectCommonComponent,
} from "../TutorProfile";

const TutoringInfo = ({ tutoringInfo }) => {
  const transformSubjectArray = (inputArray) => {
    // Check if the input is an array
    if (!Array.isArray(inputArray)) {
      return;
    }

    return inputArray.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.mainSubject === item.mainSubject);

      if (existingItem) {
        if (item.subSubject) {
          existingItem.subSubjects.push(item.subSubject);
        }
      } else {
        acc.push({
          mainSubject: item.mainSubject,
          subSubjects: item.subSubject ? [item.subSubject] : [],
        });
      }

      return acc;
    }, []);
  };

  return (
    <div className="shadow-md rounded-lg">
      <div className="flex justify-between bg-white shadow-md pt-7 pb-3 px-4">
        <div>
          <h2 className="capitalize text-2xl font-semibold text-gray-800 ">
            Tutoring Info
          </h2>
        </div>
      </div>
      <div className="px-5 py-5 bg-[#f1f5f9]">
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
              allSubject={transformSubjectArray(
                tutoringInfo?.teachAdmissionTest
              )}
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
    </div>
  );
};

export default TutoringInfo;
