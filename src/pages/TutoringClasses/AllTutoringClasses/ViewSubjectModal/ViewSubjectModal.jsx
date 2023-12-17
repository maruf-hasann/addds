import React from "react";
import { FaRegCircleXmark } from "react-icons/fa6";
import DeleteTutoringClassModal from "../DeleteTutoringClasses/DeleteTutoringClassesModal";
import { Link } from "react-router-dom";
import { useGetSubjectsByClassQuery } from "../../../../store/service/tutoringClasses/tutoringClassesApiService";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";

const ViewSubjectModal = ({
  setViewSubjectData,
  viewSubjectData,
  setOpenViewSubjectModal,
  openViewSubjectModal,
}) => {
  const [openDeleteTutoringClassModal, setOpenDeleteTutoringClassModal] =
    useState(false);
  const [deleteTutoringClassData, setDeleteTutoringClassData] = useState(null);

  const { data: allSubjectByClass } = useGetSubjectsByClassQuery(
    viewSubjectData?.className
  );
  const subjects = allSubjectByClass?.data[0]?.subjects;

  // handle close modal
  const handleClose = () => {
    setViewSubjectData(null);
    setOpenViewSubjectModal(!openViewSubjectModal);
  };

  return (
    <div
      className={`fixed top-0 left-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm bg-white/5 ${
        openViewSubjectModal ? "block" : "hidden"
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
              <div className="flex justify-between items-center pb-3">
                <h1 className="font-bold text-2xl text-white">
                  All Subjects ({viewSubjectData?.className})
                </h1>
              </div>
              <div className="overflow-x-auto rounded bg-white">
                <table className="w-full min-w-max table-auto text-left border">
                  {/* head */}
                  <thead>
                    <tr>
                      <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold w-[120px]">
                        Sl
                      </th>

                      <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold">
                        Name
                      </th>
                      <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold w-[120px] text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {subjects?.map((subject, idx) => {
                      const classes =
                        "p-4 text-base text-gray-800 font-normal border-b";
                      return (
                        <tr key={subject._id} className="hover">
                          <th className={`${classes} w-[120px]`}>{idx + 1}</th>
                          <td className={classes}>{subject}</td>

                          <td className={`${classes} w-[120px]`}>
                            <div className="flex justify-evenly items-center">
                              <FaTrash
                                onClick={() => {
                                  setDeleteTutoringClassData({
                                    subject,
                                    className: viewSubjectData?.className,
                                  }),
                                    setOpenDeleteTutoringClassModal(true);
                                }}
                                className="cursor-pointer hover:text-red-500"
                              />{" "}
                              <FaEdit
                                onClick={() =>
                                  toast.success("Subject updated successfully")
                                }
                                className="cursor-pointer hover:text-sky-500"
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            {openDeleteTutoringClassModal && deleteTutoringClassData && (
              <DeleteTutoringClassModal
                deleteTutoringClassData={deleteTutoringClassData}
                openDeleteTutoringClassModal={openDeleteTutoringClassModal}
                setDeleteTutoringClassData={setDeleteTutoringClassData}
                setOpenDeleteTutoringClassModal={
                  setOpenDeleteTutoringClassModal
                }
              />
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default ViewSubjectModal;
