import React from "react";
import { TbSquareRoundedCheckFilled } from "react-icons/tb";

const ContactInfoCV = ({ contactInfo }) => {
  return (
    <div>
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Whatsapp Number: </span>{" "}
        {contactInfo?.whatsappNumber}
      </p>
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Facebook URL:: </span>{" "}
        {contactInfo?.facebookUrl}
      </p>
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Google Meet URL: </span>{" "}
        {contactInfo?.googleMeetUrl}
      </p>
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Interview Convenient Time: </span>{" "}
        {contactInfo?.interviewConvenientTime}
      </p>
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Emergency Contact Name: </span>{" "}
        {contactInfo?.emergencyContactName}
      </p>
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Emergency Contact Number: </span>{" "}
        {contactInfo?.emergencyContactNumber}
      </p>
      <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
        <TbSquareRoundedCheckFilled />{" "}
        <span className="font-semibold">Emergency Contact Relation: </span>{" "}
        {contactInfo?.emergencyContactRelation}
      </p>
    </div>
  );
};

export default ContactInfoCV;
