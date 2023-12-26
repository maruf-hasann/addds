import React from "react";
import { Link } from "react-router-dom";

const CommonComponent = ({ name, value }) => {
  return (
    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
      <h4 className="font-medium text-sm mb-1">{name}</h4>
      <h2 className="font-bold text-lg">{value}</h2>
    </div>
  );
};

const ContactInfo = ({ contactInfo, number }) => {
  return (
    <div>
      <div className="col-span-12 xl:col-span-8 bg-white  my-10">
        <div className="shadow-md rounded-lg">
          <div className="flex justify-between bg-white shadow-md pt-7 pb-3 px-4">
            <div>
              <h2 className="capitalize text-2xl font-semibold text-gray-800 ">
                Contact Info
              </h2>
            </div>
            <div>
              <Link
                to={`/edit/contact-info/${number}`}
                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-0 focus:outline-none focus:ring-cyan-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Edit
              </Link>
            </div>
          </div>
          <div className="px-5 py-5 bg-[#f1f5f9]">
            <div className="w-full rounded-md grid grid-cols-1 lg:grid-cols-2  gap-x-2">
              <CommonComponent
                name={"Whatsapp Number"}
                value={contactInfo?.whatsappNumber}
              />
              <CommonComponent
                name={"Facebook URL"}
                value={contactInfo?.facebookUrl}
              />
              <CommonComponent
                name={"Google Meet URL"}
                value={contactInfo?.googleMeetUrl}
              />
              <CommonComponent
                name={"Interview Convenient Time"}
                value={contactInfo?.interviewConvenientTime}
              />
              <CommonComponent
                name={"Emergency Contact Name"}
                value={contactInfo?.emergencyContactName}
              />
              <CommonComponent
                name={"Emergency Contact Number"}
                value={contactInfo?.emergencyContactNumber}
              />

              <CommonComponent
                name={"Emergency Contact Relation"}
                value={contactInfo?.emergencyContactRelation}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
    //     <TbSquareRoundedCheckFilled />{" "}
    //     <span className="font-semibold">Whatsapp Number: </span>{" "}
    //     {contactInfo?.whatsappNumber}
    //   </p>
    //   <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
    //     <TbSquareRoundedCheckFilled />{" "}
    //     <span className="font-semibold">Facebook URL:: </span>{" "}
    //     {contactInfo?.facebookUrl}
    //   </p>
    //   <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
    //     <TbSquareRoundedCheckFilled />{" "}
    //     <span className="font-semibold">Google Meet URL: </span>{" "}
    //     {contactInfo?.googleMeetUrl}
    //   </p>
    //   <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
    //     <TbSquareRoundedCheckFilled />{" "}
    //     <span className="font-semibold">Interview Convenient Time: </span>{" "}
    //     {contactInfo?.interviewConvenientTime}
    //   </p>
    //   <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
    //     <TbSquareRoundedCheckFilled />{" "}
    //     <span className="font-semibold">Emergency Contact Name: </span>{" "}
    //     {contactInfo?.emergencyContactName}
    //   </p>
    //   <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
    //     <TbSquareRoundedCheckFilled />{" "}
    //     <span className="font-semibold">Emergency Contact Number: </span>{" "}
    //     {contactInfo?.emergencyContactNumber}
    //   </p>
    //   <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
    //     <TbSquareRoundedCheckFilled />{" "}
    //     <span className="font-semibold">Emergency Contact Relation: </span>{" "}
    //     {contactInfo?.emergencyContactRelation}
    //   </p>
    // </div>
  );
};

export default ContactInfo;
