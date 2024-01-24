import React from "react";
import CommonAdditionalTutoringInfo from "../../../components/Shared/TutorProfile/AdditionalTutoringInfo/CommonAdditionalTutoringInfo";

const AdditionalTutoringInfo = ({ additionalTutoringInfo }) => {
  return (
    <div className="shadow-md rounded-lg">
      <div className="flex justify-between bg-white shadow-md pt-7 pb-3 px-4">
        <div>
          <h2 className="capitalize text-2xl font-semibold text-gray-800 ">
            Additional Tutoring Info
          </h2>
        </div>
      </div>
      <CommonAdditionalTutoringInfo
        additionalTutoringInfo={additionalTutoringInfo}
      />
    </div>
  );
};

export default AdditionalTutoringInfo;
