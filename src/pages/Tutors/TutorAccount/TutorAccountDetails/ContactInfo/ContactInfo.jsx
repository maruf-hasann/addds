import React from "react";
import { Link } from "react-router-dom";
import CommonContactInfo from "../../../../../components/Shared/TutorProfile/ContactInfo/CommonContactInfo";

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
          <CommonContactInfo contactInfo={contactInfo} />
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
