import React from "react";
import CommonTutoringInfo from "../../../components/Shared/TutorProfile/TutoringInfo/CommonTutoringInfo";

const TutoringInfo = ({ tutoringInfo }) => {
  return (
    <div className="shadow-md rounded-lg">
      <div className="flex justify-between bg-white shadow-md pt-7 pb-3 px-4">
        <div>
          <h2 className="capitalize text-2xl font-semibold text-gray-800 ">
            Tutoring Info
          </h2>
        </div>
      </div>
      <CommonTutoringInfo tutoringInfo={tutoringInfo} />
    </div>
  );
};

export default TutoringInfo;
