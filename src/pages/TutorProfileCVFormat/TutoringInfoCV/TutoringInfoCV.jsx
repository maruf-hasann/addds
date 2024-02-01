import React from "react";
import { TbSquareRoundedCheckFilled } from "react-icons/tb";

const TutoringInfoCV = ({ tutoringInfo }) => {
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
    <div>
      {/* tutoring variant */}
      <div className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Tutoring Variant: </span>{" "}
        {tutoringInfo?.tutoringVariant?.map((variant, idx) => (
          <p key={idx} className="bg-blue-50 px-3 hover:bg-blue-100">
            {" "}
            {variant?.variantName}
          </p>
        ))}
      </div>
      {/* tutoring grade */}
      <div className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Tutoring Grade: </span>{" "}
        {tutoringInfo?.tutoringGrade?.map((grade, idx) => (
          <p key={idx} className="bg-blue-50 px-3 hover:bg-blue-100">
            {" "}
            {grade?.gradeName}
          </p>
        ))}
      </div>
      {/* tutoring subject */}
      <div className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex gap-2 ">
        <div className="flex gap-2">
          <TbSquareRoundedCheckFilled className="whitespace-nowrap" />{" "}
          <span className="font-semibold whitespace-nowrap">
            Tutoring Subjects:{" "}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {transformSubjectArray(tutoringInfo?.tutoringSubjects)?.map(
            (subject, idx) => (
              <span key={idx} className="bg-blue-50 px-3 hover:bg-blue-100">
                {subject.subSubjects?.length
                  ? `${subject.mainSubject}(${subject?.subSubjects?.map(
                      (subSub) => subSub
                    )})`
                  : subject?.mainSubject}
              </span>
            )
          )}
        </div>
      </div>

      {/* tutoring curriculum */}
      <div className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Tutoring Curriculum: </span>{" "}
        {tutoringInfo?.tutoringCurriculum?.map((curriculum, idx) => (
          <p key={idx} className="bg-blue-50 px-3 hover:bg-blue-100">
            {" "}
            {curriculum?.curriculumBoard}
          </p>
        ))}
      </div>
      {/* is teach admission test */}
      <div className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Teach Admission Test: </span>{" "}
        {tutoringInfo?.isTeachAdmissionTest ? "Yes" : "No"}
      </div>
      {/* admission test subject */}
      <div className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Admission Test Subjects: </span>{" "}
        {transformSubjectArray(tutoringInfo?.teachAdmissionTest)?.map(
          (subject, idx) => (
            <span key={idx} className="bg-blue-50 px-3 hover:bg-blue-100">
              {subject.subSubjects?.length
                ? `${subject.mainSubject}(${subject?.subSubjects?.map(
                    (subSub) => subSub
                  )})`
                : subject?.mainSubject}
            </span>
          )
        )}
      </div>
      {/* teach test paper */}
      <div className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Teach Test Paper: </span>{" "}
        {tutoringInfo?.isTeachTestPapers ? "Yes" : "No"}
      </div>
      {/* Test paper subjects */}
      <div className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Test Paper Subjects: </span>{" "}
        {transformSubjectArray(tutoringInfo?.teachTestPapers)?.map(
          (subject, idx) => (
            <span key={idx} className="bg-blue-50 px-3 hover:bg-blue-100">
              {subject.subSubjects?.length
                ? `${subject.mainSubject}(${subject?.subSubjects?.map(
                    (subSub) => subSub
                  )})`
                : subject?.mainSubject}
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default TutoringInfoCV;
