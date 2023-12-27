import React from "react";

const MockTestJobUserInfo = ({ singleJobUserInfo }) => {
    return (
        <div className="shadow-md rounded-lg my-5">
            <div className="flex justify-between bg-white shadow-md pt-7 pb-3 px-4">
                <div>
                    <h2 className="capitalize text-2xl font-semibold text-gray-800 ">
                        User Info
                    </h2>
                </div>
                <div>
                    <button
                        type="button"
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-0 focus:outline-none focus:ring-cyan-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Edit
                    </button>
                </div>
            </div>
            <div className="px-5 py-5 bg-[#f1f5f9]">
                <div className="flex gap-5">
                    <div className="w-full rounded-md">
                        <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                            <h4 className="font-medium text-sm mb-1">
                                Full Name
                            </h4>
                            <h2 className="capitalize font-bold text-lg">
                                {singleJobUserInfo?.fullName
                                    ? singleJobUserInfo?.fullName
                                    : "No Info"}
                            </h2>
                        </div>
                        <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                            <h4 className="font-medium text-sm mb-1">Email</h4>
                            <h2 className="font-bold text-lg">
                                {singleJobUserInfo?.email
                                    ? singleJobUserInfo?.email
                                    : "No Info"}
                            </h2>
                        </div>
                        <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                            <h4 className="font-medium text-sm mb-1">Gender</h4>
                            <h2 className="capitalize font-bold text-lg">
                                {singleJobUserInfo?.gender
                                    ? singleJobUserInfo?.gender
                                    : "No Info"}
                            </h2>
                        </div>
                    </div>
                    <div className="w-full rounded-md">
                        <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                            <h4 className="font-medium text-sm mb-1">
                                Country
                            </h4>
                            <h2 className="capitalize font-bold text-lg">
                                {singleJobUserInfo?.country
                                    ? singleJobUserInfo?.country
                                    : "No Info"}
                            </h2>
                        </div>
                        <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                            <h4 className="capitalize font-medium text-sm mb-1">
                                City
                            </h4>
                            <h2 className="font-bold text-lg">
                                {singleJobUserInfo?.city
                                    ? singleJobUserInfo?.city
                                    : "No Info"}
                            </h2>
                        </div>
                        <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                            <h4 className="font-medium text-sm mb-1">Area</h4>
                            <h2 className="capitalize font-bold text-lg">
                                {singleJobUserInfo?.area
                                    ? singleJobUserInfo?.area
                                    : "No Info"}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MockTestJobUserInfo;
