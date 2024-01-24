import React from "react";
import CommonAcademicInfo from "../../../components/Shared/TutorProfile/AcademicInfo/CommonAcademicInfo";

const AcademicInfo = ({ academicInfo }) => {
  return (
    <div className="shadow-md rounded-lg">
      <div className="flex justify-between bg-white shadow-md pt-7 pb-3 px-4">
        <div>
          <h2 className="capitalize text-2xl font-semibold text-gray-800 ">
            Academic Info
          </h2>
        </div>
      </div>
      <CommonAcademicInfo academicInfo={academicInfo} />
    </div>
  );
};

export default AcademicInfo;
