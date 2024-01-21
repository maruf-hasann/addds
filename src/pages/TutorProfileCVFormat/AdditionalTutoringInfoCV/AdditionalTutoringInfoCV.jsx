import React from "react";
import { TbSquareRoundedCheckFilled } from "react-icons/tb";

const AdditionalTutoringInfoCV = ({ additionalTutoringInfo }) => {
  return (
    <div>
      {/* is grow tutoring Program */}
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Grow Tutoring Program: </span>{" "}
        {additionalTutoringInfo?.isGrowTutoringProgram ? "Yes" : "No"}
      </p>

      {/* tutoring Program */}
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Tutoring Programs: </span>{" "}
        {additionalTutoringInfo?.tutoringProgram?.map((program, idx) => (
          <p key={idx} className="bg-blue-50 px-3 hover:bg-blue-100">
            {" "}
            {program?.programName}
          </p>
        ))}
      </p>

      {/* Have tutoring training */}
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Have Tutoring Training: </span>{" "}
        {additionalTutoringInfo?.isTutoringTraining ? "Yes" : "No"}
      </p>

      {/* have teaching experience */}
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Have Teaching Experience: </span>{" "}
        {additionalTutoringInfo?.isTeachingExperience ? "Yes" : "No"}
      </p>
      {/* teaching experience */}
      {additionalTutoringInfo?.isTeachingExperience ? (
        <>
          <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
            <TbSquareRoundedCheckFilled />{" "}
            <span className="font-semibold">Years Of Experience: </span>
            {additionalTutoringInfo?.yearsOfExperience}
          </p>
          <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
            <TbSquareRoundedCheckFilled />{" "}
            <span className="font-semibold">Teaching History: </span>
            {additionalTutoringInfo?.teachingHistory}
          </p>
        </>
      ) : (
        ""
      )}

      {/* tutoring place */}
      <div className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Tutoring Place: </span>{" "}
        {additionalTutoringInfo?.tutoringPlace?.map((place, idx) => (
          <p key={idx} className="bg-blue-50 px-3 hover:bg-blue-100">
            {" "}
            {place?.placeName}
          </p>
        ))}
      </div>

      {/* student variant */}

      <div className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Student Variant: </span>{" "}
        {additionalTutoringInfo?.studentVariant?.map((variant, idx) => (
          <p key={idx} className="bg-blue-50 px-3 hover:bg-blue-100">
            {variant?.variantName}
          </p>
        ))}
      </div>

      {/* min expected salary*/}

      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Min Expected Salary: </span>
        {additionalTutoringInfo?.minExpectedSalary}
      </p>

      {/* max expected salary*/}
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Max Expected Salary: </span>
        {additionalTutoringInfo?.maxExpectedSalary}
      </p>

      {/* tutoring location */}

      <div className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Tutoring Location: </span>{" "}
        {additionalTutoringInfo?.tutoringLocation?.map((location, idx) => (
          <p key={idx} className="bg-blue-50 px-3 hover:bg-blue-100">
            {location?.locationName}
          </p>
        ))}
      </div>

      {/* personal statement*/}

      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex gap-2 ">
        <div className="flex gap-2">
        <TbSquareRoundedCheckFilled className="whitespace-nowrap text-xl"/>{" "}
        <span className="font-semibold whitespace-nowrap">Personal Statement: </span>
        </div>
        {additionalTutoringInfo?.personalStatement}
      </p>
    </div>
  );
};

export default AdditionalTutoringInfoCV;
