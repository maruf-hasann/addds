import React from "react";
import CommonIdentityInfo from "../../../../../components/Shared/TutorProfile/IdentityInfo/CommonIdentityInfo";
import { Link } from "react-router-dom";

const IdentityInfo = ({ identityInfo, isLoading, number }) => {
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
            <div>
              <Link
                to={`/edit/identity-info/${number}`}
                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-0 focus:outline-none focus:ring-cyan-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Edit
              </Link>
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
