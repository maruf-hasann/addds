import React from "react";
import { TbSquareRoundedCheckFilled } from "react-icons/tb";

const PersonalInfoCV = ({ personalInfo }) => {
  return (
    <div>
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Name: </span> {personalInfo?.fullName}
      </p>
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 flex items-center gap-2">
        <TbSquareRoundedCheckFilled />
        <span className="font-semibold">Email: </span> {personalInfo?.email}
      </p>
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />
        <span className="font-semibold">Gender: </span> {personalInfo?.gender}
      </p>
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />
        <span className="font-semibold">Country: </span> {personalInfo?.country}
      </p>
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />
        <span className="font-semibold">City: </span> {personalInfo?.city}
      </p>
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />
        <span className="font-semibold">Area: </span> {personalInfo?.area}
      </p>
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />
        <span className="font-semibold">Home Address: </span>
        {personalInfo?.homeAddress}
      </p>
    </div>
  );
};

export default PersonalInfoCV;
