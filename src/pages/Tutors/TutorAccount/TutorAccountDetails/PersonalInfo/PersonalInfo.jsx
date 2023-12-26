import React from "react";
import { FaLocationPin, FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";

const CommonComponent = ({ name, value }) => {
  return (
    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
      <h4 className="font-medium text-sm mb-1">{name}</h4>
      <h2 className="font-bold text-lg">{value}</h2>
    </div>
  );
};

const PersonalInfo = ({ personalInfo, identityInfo }) => {
  return (
    // <div>
    //   <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
    //     <TbSquareRoundedCheckFilled />{" "}
    //     <span className="font-semibold">Name: </span> {personalInfo?.fullName}
    //   </p>
    //   <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 flex items-center gap-2">
    //     <TbSquareRoundedCheckFilled />
    //     <span className="font-semibold">Email: </span> {personalInfo?.email}
    //   </p>
    //   <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
    //     <TbSquareRoundedCheckFilled />
    //     <span className="font-semibold">Gender: </span> {personalInfo?.gender}
    //   </p>
    //   <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
    //     <TbSquareRoundedCheckFilled />
    //     <span className="font-semibold">Country: </span> {personalInfo?.country}
    //   </p>
    //   <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
    //     <TbSquareRoundedCheckFilled />
    //     <span className="font-semibold">City: </span> {personalInfo?.city}
    //   </p>
    //   <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
    //     <TbSquareRoundedCheckFilled />
    //     <span className="font-semibold">Area: </span> {personalInfo?.area}
    //   </p>
    //   <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
    //     <TbSquareRoundedCheckFilled />
    //     <span className="font-semibold">Home Address: </span>
    //     {personalInfo?.homeAddress}
    //   </p>
    // </div>
    <div>
      {/* personal info */}
      <div className="bg-white xl:hidden">
        <div className="flex justify-center p-10 ">
          <img
            src={
              identityInfo?.personalPhoto
                ? identityInfo?.personalPhoto
                : "http://admin.carbangla.com/img/placeholder-profile.png"
            }
            className="inline-block w-60 h-60 object-cover rounded-full"
            alt=""
          />
        </div>
        <div className="my-4 rounded-md shadow-md w-full flex-1">
          <div className="w-full ">
            <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
              <h4 className="font-medium text-sm mb-1">Full Name</h4>
              <h2 className="font-bold text-lg">{personalInfo?.fullName}</h2>
            </div>
            <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
              <h4 className="font-medium text-sm mb-1">Location</h4>
              <div className="font-bold text-lg flex  items-center gap-2">
                <FaLocationPin />{" "}
                <p>
                  {personalInfo?.homeAddress}, {personalInfo?.area},{" "}
                  {personalInfo?.city}
                </p>
              </div>
            </div>
            <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
              <h4 className="font-medium text-sm mb-1">Number</h4>
              <h2 className="font-bold text-lg flex  items-center gap-2">
                <FaPhone />
                <p>{personalInfo?.phoneNumber}</p>
              </h2>
            </div>
            <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
              <h4 className="font-medium text-sm mb-1 ">Email</h4>
              <h2 className="font-bold text-lg flex  items-center gap-2 ">
                <IoMdMail />
                <p>{personalInfo?.email}</p>
              </h2>
            </div>
          </div>
        </div>
      </div>
      {/* Info Image and Info */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 xl:col-span-8 bg-white rounded-sm">
          <div className="shadow-md rounded-sm">
            <div className="flex justify-between bg-white shadow-md pt-7 pb-3 px-4 rounded-sm">
              <div>
                <h2 className="capitalize text-2xl font-semibold text-gray-800 ">
                  personal Info
                </h2>
              </div>
              <div>
                <Link
                  to={`/edit/personal-info/${personalInfo?.phoneNumber}`}
                  className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-0 focus:outline-none focus:ring-cyan-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Edit
                </Link>
              </div>
            </div>
            <div className="px-5 py-5 bg-[#f1f5f9] ">
              <div className="w-full rounded-md grid grid-cols-1 lg:grid-cols-2  gap-x-2">
                <CommonComponent name={"Name"} value={personalInfo?.fullName} />
                <CommonComponent
                  name={"Phone Number"}
                  value={personalInfo?.phoneNumber}
                />
                <CommonComponent name={"Email"} value={personalInfo?.email} />
                <CommonComponent name={"Gender"} value={personalInfo?.gender} />
                <CommonComponent
                  name={"Country"}
                  value={personalInfo?.country}
                />
                <CommonComponent name={"City"} value={personalInfo?.city} />
                <CommonComponent name={"Area"} value={personalInfo?.area} />
                <CommonComponent
                  name={"Home Address"}
                  value={personalInfo?.homeAddress}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4 hidden xl:block rounded-sm">
          <div>
            <div className="p-3 w-full bg-white shadow-md rounded-sm flex justify-center">
              <img
                src={
                  identityInfo?.personalPhoto
                    ? identityInfo?.personalPhoto
                    : "http://admin.carbangla.com/img/placeholder-profile.png"
                }
                className="inline-block w-40 h-40  lg:w-60 lg:h-60 xl:h-80 xl:w-80  2xl:h-96 2xl:w-96 object-cover"
                alt=""
              />
            </div>
          </div>
          <div className="my-4 rounded-md shadow-md">
            <div className="w-full ">
              <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                <h4 className="font-medium text-sm mb-1">Full Name</h4>
                <h2 className="font-bold text-lg">{personalInfo?.fullName}</h2>
              </div>
              <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                <h4 className="font-medium text-sm mb-1">Location</h4>
                <div className="font-bold text-lg flex  items-center gap-2">
                  <p>
                    {personalInfo?.homeAddress}, {personalInfo?.area},{" "}
                    {personalInfo?.city}
                  </p>
                </div>
              </div>
              <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                <h4 className="font-medium text-sm mb-1">Number</h4>
                <h2 className="font-bold text-lg flex  items-center gap-2">
                  <p>{personalInfo?.phoneNumber}</p>
                </h2>
              </div>
              <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white overflow-hidden">
                <h4 className="font-medium text-sm mb-1 ">Email</h4>
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <p>{personalInfo?.email}</p>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
