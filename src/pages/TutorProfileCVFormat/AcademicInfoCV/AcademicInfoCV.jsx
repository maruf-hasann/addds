import React from "react";
import { TbSquareRoundedCheckFilled } from "react-icons/tb";

const AcademicInfoCV = ({ academicInfo }) => {
  return (
    <div>
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Education Variant: </span>{" "}
        {academicInfo?.educationVariant}
      </p>
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">School Name: </span>{" "}
        {academicInfo?.schoolName}
      </p>
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">High School Board: </span>{" "}
        {academicInfo?.highSchoolBoard}
      </p>
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">High School Result: </span>{" "}
        {academicInfo?.highSchoolResult}
      </p>
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Collage Name: </span>{" "}
        {academicInfo?.collageName}
      </p>
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Collage Board: </span>{" "}
        {academicInfo?.collageBoard}
      </p>
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Collage Result: </span>{" "}
        {academicInfo?.collageResult}
      </p>
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">University Name: </span>{" "}
        {academicInfo?.universityName}
      </p>
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Subject Name: </span>{" "}
        {academicInfo?.subjectsName}
      </p>
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">University Running Year: </span>{" "}
        {academicInfo?.universityRunningYear}
      </p>
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Current Affair: </span>{" "}
        {academicInfo?.currentAffair}
      </p>
    </div>
  );
};

export default AcademicInfoCV;
