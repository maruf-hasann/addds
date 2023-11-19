import React from "react";
import { FaRegCircleXmark } from "react-icons/fa6";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import moment from "moment";

const AllTutorInfoModal = ({
    setViewTutorInfos,
    viewTutorInfos,
    openTutorInfoModal,
    setOpenTutorInfoModal,
}) => {

    

    // handle close modal
    const handleClose = () => {
        setViewTutorInfos(null);
        setOpenTutorInfoModal(!openTutorInfoModal);
    };

    return (
        <div
            className={`fixed top-0 left-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm bg-white/5 ${openTutorInfoModal? "block" : "hidden"
                }`}
        >
            <div className="relative w-full max-w-5xl  max-h-full mt-20 mx-auto px-2 md:px-5 lg:px-10 xl:px-20">
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
                            <div className="flex justify-between items-center border-b pb-3">
                                <h1 className="font-bold">
                                    {/* All TutorInfos ({viewTutorInfos?.className}) */}
                                </h1>

                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-max table-auto text-left">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                                Sl
                                            </th>

                                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                                Name
                                            </th>
                                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-[120px] text-center">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {viewTutorInfos?.map((info, idx) => {
                                            const classes = "p-4 py-8 border-b border-blue-gray-50 text-base text-gray-800 font-normal";
                                            return (
                                                <tr key={info.id} className={` text-center ${idx % 2 !== 0 && 'bg-gray-50'}`}>
                                                    <th className={classes}>{idx + 1}</th>
                                                    <td className={classes}>{info.tutoringClass}</td>
                                                    <td className={classes}>{info.tutoringSubject}</td>
                                                    <td className={classes}>{info.meetLink}</td>
                                                    <td className={classes}>
                                                        {moment(info.interviewTime).format("DD MMM YYYY hh:mm A")}
                                                    </td>
                                                    <td className={classes}>{info.emergencyContactNumber}</td>
                                                    <td className={classes}>{info.homeAddress}</td>
                                                    
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                </div>
            </div>
        </div>
    );
};

export default AllTutorInfoModal;
