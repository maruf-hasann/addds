import React from "react";
import { TbSquareRoundedCheckFilled } from "react-icons/tb";

const AdditionalTutoringInfoCV = ({ additionalTutoringInfo }) => {
  return (
    <div>
      {/* is grow tutoring Program */}
      <div className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Grow Tutoring Program: </span>{" "}
        {additionalTutoringInfo?.isGrowTutoringProgram ? "Yes" : "No"}
      </div>

      {/* tutoring Program */}
      <div className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex gap-2 ">
        <div className="flex gap-2">
          <TbSquareRoundedCheckFilled className="whitespace-nowrap" />{" "}
          <span className="font-semibold whitespace-nowrap">
            Tutoring Programs:{" "}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {additionalTutoringInfo?.tutoringProgram?.map((program, idx) => (
            <p key={idx + 1} className="bg-blue-50 px-3 hover:bg-blue-100 ">
              {" "}
              {program?.programName}
            </p>
          ))}
        </div>
      </div>

      {/* Have tutoring training */}
      <div className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Have Tutoring Training: </span>{" "}
        {additionalTutoringInfo?.isTutoringTraining ? "Yes" : "No"}
      </div>

      {/* have teaching experience */}
      <div className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Have Teaching Experience: </span>{" "}
        {additionalTutoringInfo?.isTeachingExperience ? "Yes" : "No"}
      </div>
      {/* teaching experience */}
      {additionalTutoringInfo?.isTeachingExperience ? (
        <>
          <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
            <TbSquareRoundedCheckFilled />{" "}
            <span className="font-semibold">Years Of Experience: </span>
            {additionalTutoringInfo?.yearsOfExperience}
          </p>

          <div className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex gap-2 ">
            <div className="flex gap-2">
              <TbSquareRoundedCheckFilled className="whitespace-nowrap" />{" "}
              <span className="font-semibold whitespace-nowrap">
                Teaching History:{" "}
              </span>
            </div>
            {additionalTutoringInfo?.teachingHistory}
          </div>
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

      <div className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Min Expected Salary: </span>
        {additionalTutoringInfo?.minExpectedSalary}
      </div>

      {/* max expected salary*/}
      <div className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Max Expected Salary: </span>
        {additionalTutoringInfo?.maxExpectedSalary}
      </div>

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

      <div className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex gap-2 ">
        <div className="flex gap-2">
          <TbSquareRoundedCheckFilled className="whitespace-nowrap" />{" "}
          <span className="font-semibold whitespace-nowrap">
            Personal Statement:{" "}
          </span>
        </div>
        {additionalTutoringInfo?.personalStatement}
      </div>
    </div>
  );
};

export default AdditionalTutoringInfoCV;
