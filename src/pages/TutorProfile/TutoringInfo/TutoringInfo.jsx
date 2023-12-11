import React from "react";

const TutoringInfo = ({ tutoringInfo }) => {
  return (
    <div>
      {/* tutoring variant */}
      <div className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer flex gap-2">
        Tutoring Variant:{" "}
        <div className="font-semibold flex gap-3">
          {" "}
          {tutoringInfo?.tutoringVariant?.map((variant, idx) => (
            <p key={idx} className="bg-gray-300 px-3 hover:bg-blue-100">
              {" "}
              {variant?.variantName}
            </p>
          ))}
        </div>
      </div>
      {/* tutoring grade */}
      <div className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer flex gap-2">
        Tutoring Grade:{" "}
        <div className="font-semibold flex gap-3">
          {" "}
          {tutoringInfo?.tutoringGrade?.map((grade, idx) => (
            <p key={idx} className="bg-gray-300 px-3 hover:bg-blue-100">
              {" "}
              {grade?.gradeName}
            </p>
          ))}
        </div>
      </div>
      {/* tutoring subject */}
      <div className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer flex gap-2">
        Tutoring Subject:{" "}
        <div className="font-semibold flex gap-3">
          {" "}
          {tutoringInfo?.tutoringSubjects?.map((subject, idx) => (
            <p key={idx} className="bg-gray-300 px-3 hover:bg-blue-100">
              {" "}
              {subject?.subSubject ? subject?.subSubject : subject?.mainSubject}
            </p>
          ))}
        </div>
      </div>
      {/* tutoring curriculum */}
      <div className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer flex gap-2">
        Tutoring Curriculum:{" "}
        <div className="font-semibold flex gap-3">
          {" "}
          {tutoringInfo?.tutoringCurriculum?.map((curriculum, idx) => (
            <p key={idx} className="bg-gray-300 px-3 hover:bg-blue-100">
              {" "}
              {curriculum?.curriculumBoard}
            </p>
          ))}
        </div>
      </div>
      {/* is teach admission test */}
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        Teach Admission Test:{" "}
        <span className="font-semibold">
          {" "}
          {tutoringInfo?.isTeachAdmissionTest ? "Yes" : "No"}
        </span>
      </p>
      {/* admission test subject */}
      {tutoringInfo?.isTeachAdmissionTest ? (
        <div className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer flex gap-2">
          Teach Admission Test Subject:{" "}
          <div className="font-semibold flex gap-3">
            {" "}
            {tutoringInfo?.teachAdmissionTest?.map((subject, idx) => (
              <p key={idx} className="bg-gray-300 px-3 hover:bg-blue-100">
                {" "}
                {subject?.subSubject
                  ? subject?.subSubject
                  : subject?.mainSubject}
              </p>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}

      {/* is teach test paper*/}
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        Teach Test Paper:{" "}
        <span className="font-semibold">
          {" "}
          {tutoringInfo?.isTeachTestPapers ? "Yes" : "No"}
        </span>
      </p>
      {/* admission test subject */}
      {tutoringInfo?.isTeachTestPapers ? (
        <div className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer flex gap-2">
          Teach Test Paper Subject:{" "}
          <div className="font-semibold flex gap-3">
            {" "}
            {tutoringInfo?.teachTestPapers?.map((subject, idx) => (
              <p key={idx} className="bg-gray-300 px-3 hover:bg-blue-100">
                {" "}
                {subject?.subSubject
                  ? subject?.subSubject
                  : subject?.mainSubject}
              </p>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TutoringInfo;
