import React from "react";

const AdditionalTutoringInfo = ({ additionalTutoringInfo }) => {
  return (
    <div>
      {/* is grow tutoring Program */}
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        Grow Tutoring Program:{" "}
        <span className="font-semibold">
          {" "}
          {additionalTutoringInfo?.isGrowTutoringProgram ? "Yes" : "No"}
        </span>
      </p>
      {/* tutoring Program */}
      {additionalTutoringInfo?.isGrowTutoringProgram ? (
        <div className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer flex gap-2">
          Tutoring Program:{" "}
          <div className="font-semibold flex gap-3">
            {" "}
            {additionalTutoringInfo?.tutoringProgram?.map((program, idx) => (
              <p key={idx} className="bg-gray-300 px-3 hover:bg-blue-100">
                {" "}
                {program?.programName}
              </p>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}

      {/* Have tutoring training */}
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        Have Tutoring Training:{" "}
        <span className="font-semibold">
          {" "}
          {additionalTutoringInfo?.isTutoringTraining ? "Yes" : "No"}
        </span>
      </p>

      {/* have teaching experience */}
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        Have Teaching Experience:{" "}
        <span className="font-semibold">
          {" "}
          {additionalTutoringInfo?.isTeachingExperience ? "Yes" : "No"}
        </span>
      </p>
      {/* tutoring Program */}
      {additionalTutoringInfo?.isTeachingExperience ? (
        <>
          <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
            Years Of Experience:{" "}
            <span className="font-semibold">
              {" "}
              {additionalTutoringInfo?.yearsOfExperience}
            </span>
          </p>
          <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
            Teaching History:{" "}
            <span className="font-semibold">
              {" "}
              {additionalTutoringInfo?.teachingHistory}
            </span>
          </p>
        </>
      ) : (
        ""
      )}

      {/* tutoring place */}
      <div className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer flex gap-2">
        Tutoring Place:{" "}
        <div className="font-semibold flex gap-3">
          {" "}
          {additionalTutoringInfo?.tutoringPlace?.map((place, idx) => (
            <p key={idx} className="bg-gray-300 px-3 hover:bg-blue-100">
              {" "}
              {place?.placeName}
            </p>
          ))}
        </div>
      </div>

      {/* student variant */}
      <div className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer flex gap-2">
        Student Variant:{" "}
        <div className="font-semibold flex gap-3">
          {" "}
          {additionalTutoringInfo?.studentVariant?.map((variant, idx) => (
            <p key={idx} className="bg-gray-300 px-3 hover:bg-blue-100">
              {" "}
              {variant?.variantName}
            </p>
          ))}
        </div>
      </div>

      {/* min expected salary*/}
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        Min Expected Salary:{" "}
        <span className="font-semibold">
          {" "}
          {additionalTutoringInfo?.minExpectedSalary}
        </span>
      </p>
      {/* max expected salary*/}
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        Max Expected Salary:{" "}
        <span className="font-semibold">
          {" "}
          {additionalTutoringInfo?.maxExpectedSalary}
        </span>
      </p>
      {/* tutoring location */}
      <div className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer flex gap-2">
        Tutoring Location:{" "}
        <div className="font-semibold flex gap-3">
          {" "}
          {additionalTutoringInfo?.tutoringLocation?.map((location, idx) => (
            <p key={idx} className="bg-gray-300 px-3 hover:bg-blue-100">
              {" "}
              {location?.locationName}
            </p>
          ))}
        </div>
      </div>
      {/* max expected salary*/}
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        Personal Statement:{" "}
        <span className="font-semibold">
          {" "}
          {additionalTutoringInfo?.personalStatement}
        </span>
      </p>
    </div>
  );
};

export default AdditionalTutoringInfo;
