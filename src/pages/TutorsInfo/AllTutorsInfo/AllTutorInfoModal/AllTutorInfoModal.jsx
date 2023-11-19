import React from "react";
import { FaRegCircleXmark } from "react-icons/fa6";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import moment from "moment";

const AllTutorInfoModal = ({
    setViewTutorInfo,
    viewTutorInfo,
    openTutorInfoModal,
    setOpenTutorInfoModal,
}) => {

    console.log(viewTutorInfo)

    const { meetLink, interviewTime, homeAddress, emergencyContactNumber } = viewTutorInfo;
    // handle close modal
    const handleClose = () => {
        setViewTutorInfo(null);
        setOpenTutorInfoModal(!openTutorInfoModal);
    };

    return (
        <div
            className={`fixed top-0 left-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%)] max-h-full backdrop-blur-sm bg-primary ${openTutorInfoModal ? "block" : "hidden"
                }`}
        >
            <div
                className="w-full h-full z-0 absolute top-0 left-0"
                onClick={handleClose}
            >

            </div>
            <div className="relative z-50 w-full max-w-5xl  max-h-full mt-20 mx-auto px-2 lg:w-1/2 md:px-0">
                <div
                    className={`relative  rounded-lg shadow text-primary px-10 bg-white`}
                >
                    {/* modal close button */}
                    <button
                        onClick={handleClose}
                        type="button"
                        className="absolute top-3 right-2.5  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    >
                        <FaRegCircleXmark className="text-3xl text-red-400 hover:text-red-500" />
                    </button>
                    <>
                        <div className="py-10">
                            <div className="flex justify-between items-center pb-3">
                                <h1 className="font-bold text-blue-gray-800">
                                    All TutorInfo
                                </h1>

                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="" className="font-semibold text-blue-gray-800 p-2">Meet Link</label>
                                    <input readOnly className=" outline-none border-2 border-blue-500  text-gray-900 text-sm rounded-lg  focus:ring-0 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0" type="text" defaultValue={meetLink} />
                                </div>
                                <div>
                                    <label htmlFor="" className="font-semibold text-blue-gray-800 p-2">Ineterview Time</label>
                                    <input readOnly className=" outline-none border-2 border-blue-500  text-gray-900 text-sm rounded-lg  focus:ring-0 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0" type="text" defaultValue={moment(interviewTime).format("DD MMM YYYY hh:mm A")} />
                                </div>
                                <div>
                                    <label htmlFor="" className="font-semibold text-blue-gray-800 p-2">Home Address</label>
                                    <input readOnly className=" outline-none border-2 border-blue-500  text-gray-900 text-sm rounded-lg  focus:ring-0 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0" type="text" defaultValue={homeAddress} />
                                </div>
                                <div>
                                    <label htmlFor="" className="font-semibold text-blue-gray-800 p-2">Contact Number</label>
                                    <input readOnly className=" outline-none border-2 border-blue-500  text-gray-900 text-sm rounded-lg  focus:ring-0 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0" type="text" defaultValue={emergencyContactNumber} />
                                </div>
                            </div>


                        </div>
                    </>
                </div>
            </div>
        </div>
    );
};

export default AllTutorInfoModal;
