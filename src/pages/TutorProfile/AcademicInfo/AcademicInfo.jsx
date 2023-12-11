import React from "react";

const AcademicInfo = ({ academicInfo }) => {
  return (
    <div>
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        Education Variant:{" "}
        <span className="font-semibold"> {academicInfo?.educationVariant}</span>
      </p>
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        School Name:{" "}
        <span className="font-semibold"> {academicInfo?.schoolName}</span>
      </p>
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        High School Board:{" "}
        <span className="font-semibold"> {academicInfo?.highSchoolBoard}</span>
      </p>
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        High School Result:{" "}
        <span className="font-semibold"> {academicInfo?.highSchoolResult}</span>
      </p>
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        Collage Name:{" "}
        <span className="font-semibold"> {academicInfo?.collageName}</span>
      </p>
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        Collage Board:{" "}
        <span className="font-semibold"> {academicInfo?.collageBoard}</span>
      </p>
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        Collage Result:
        <span className="font-semibold"> {academicInfo?.collageResult}</span>
      </p>
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        University Name:{" "}
        <span className="font-semibold"> {academicInfo?.universityName}</span>
      </p>
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        Subject Name:{" "}
        <span className="font-semibold"> {academicInfo?.subjectsName}</span>
      </p>
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        University Running Year:
        <span className="font-semibold">
          {" "}
          {academicInfo?.universityRunningYear}
        </span>
      </p>
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        Current Affair:
        <span className="font-semibold"> {academicInfo?.currentAffair}</span>
      </p>
    </div>
  );
};

export default AcademicInfo;
