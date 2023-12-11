import React from "react";

const PersonalInfo = ({ personalInfo }) => {
  return (
    <div>
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        Name: <span className="font-semibold"> {personalInfo?.fullName}</span>
      </p>
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        Email: <span className="font-semibold"> {personalInfo?.email}</span>
      </p>
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        Gender: <span className="font-semibold"> {personalInfo?.gender}</span>
      </p>
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        Country: <span className="font-semibold"> {personalInfo?.country}</span>
      </p>
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        City: <span className="font-semibold"> {personalInfo?.city}</span>
      </p>
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        Area: <span className="font-semibold"> {personalInfo?.area}</span>
      </p>
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        Home Address:{" "}
        <span className="font-semibold"> {personalInfo?.homeAddress}</span>
      </p>
    </div>
  );
};

export default PersonalInfo;
