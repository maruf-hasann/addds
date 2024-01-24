import React from "react";
import CommonContactInfo from "../../../components/Shared/TutorProfile/ContactInfo/CommonContactInfo";

const ContactInfo = ({ contactInfo }) => {
  return (
    <div className="shadow-md rounded-lg">
      <div className="flex justify-between bg-white shadow-md pt-7 pb-3 px-4">
        <div>
          <h2 className="capitalize text-2xl font-semibold text-gray-800 ">
            Contact Info
          </h2>
        </div>
      </div>
      <CommonContactInfo contactInfo={contactInfo}/>
    </div>
  );
};

export default ContactInfo;
