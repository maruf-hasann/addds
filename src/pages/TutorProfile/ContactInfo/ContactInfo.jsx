import React from "react";

const ContactInfo = ({ contactInfo }) => {
  return (
    <div>
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        Whatsapp Number:{" "}
        <span className="font-semibold"> {contactInfo?.whatsappNumber}</span>
      </p>
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        Facebook URL:{" "}
        <span className="font-semibold"> {contactInfo?.facebookUrl}</span>
      </p>
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        Google Meet URL:{" "}
        <span className="font-semibold"> {contactInfo?.googleMeetUrl}</span>
      </p>
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        Interview Convenient Time:{" "}
        <span className="font-semibold">
          {" "}
          {contactInfo?.interviewConvenientTime}
        </span>
      </p>
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        Emergency Contact Name:{" "}
        <span className="font-semibold">
          {" "}
          {contactInfo?.emergencyContactName}
        </span>
      </p>
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        Emergency Contact Number:{" "}
        <span className="font-semibold">
          {" "}
          {contactInfo?.emergencyContactNumber}
        </span>
      </p>
      <p className="text-lg mb-3 hover:text-[#1E6CB3] cursor-pointer">
        Emergency Contact Relation
        <span className="font-semibold">
          {" "}
          {contactInfo?.emergencyContactRelation}
        </span>
      </p>
    </div>
  );
};

export default ContactInfo;
