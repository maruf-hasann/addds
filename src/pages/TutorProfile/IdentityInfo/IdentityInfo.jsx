import React from "react";
import CommonIdentityInfo from "../../../components/Shared/TutorProfile/IdentityInfo/CommonIdentityInfo";


const IdentityInfo = ({ identityInfo, isLoading }) => {
  return (
    <div className="bg-white  my-10">
      <div className="">
        <div className="shadow-md rounded-lg">
          <div className="flex justify-between bg-white shadow-md pt-7 pb-3 px-4">
            <div>
              <h2 className="capitalize text-2xl font-semibold text-gray-800 ">
                Identity Info
              </h2>
            </div>
          </div>
          <CommonIdentityInfo
            identityInfo={identityInfo}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default IdentityInfo;
