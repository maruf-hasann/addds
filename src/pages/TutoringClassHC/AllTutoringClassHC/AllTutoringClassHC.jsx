import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { educationVariants } from "../../../data/educationVariant";
import { tutoringSubjects } from "../../../data/tutoringSubjects";
import AddTutoringClassHCModal from "./AddTutoringClassHCModal/AddTutoringClassHCModal";
import DeleteModal from "../../../components/Shared/DeleteModal/DeleteModal";
import { useDeleteTutoringClassHCMutation, useGetTutoringClassHCQuery } from "../../../store/service/tutoringClassHC/tutoringClassHCApiService";

const AllTutoringClassHC = () => {
  const [openTutoringClassHCModal, setOpenTutoringClassHCModal] =
    useState(false);

  const [deleteTutoringClassHCData, setDeleteTutoringClassHCData] =
    useState(null);
  const [openDeleteTutoringClassHCModal, setOpenDeleteTutoringClassHCModal] =
    useState(false);

  const [deleteTutoringClassHC] = useDeleteTutoringClassHCMutation();

  const { data: allTutoringClassHCData } = useGetTutoringClassHCQuery();
  const allTutoringClassHC = allTutoringClassHCData?.data;

  return (
    <div className="py-10">
      <div className="flex justify-between items-center border-b pb-3">
        <h1 className="font-bold">All Tutoring Class HC</h1>
        <div
          className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 bg-white cursor-pointer"
          onClick={() => setOpenTutoringClassHCModal(true)}
        >
          Add New
        </div>
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

              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Education Variant
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Curriculum Board
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-[120px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allTutoringClassHC?.map((tutoringClassHC, idx) => {
              const classes = "p-4 border-b border-blue-gray-50";
              return (
                <tr className={classes} key={tutoringClassHC?._id}>
                  <th className={classes}>{idx + 1}</th>
                  <td className={classes}>{tutoringClassHC.className}</td>
                  <td className={classes}>
                    {tutoringClassHC?.educationVariant}
                  </td>
                  <td className={classes}>
                    {tutoringClassHC?.curriculumBoard}
                  </td>
                  <td className={`${classes} w-[120px]`}>
                    <div className="flex justify-evenly items-center">
                      <FaTrash
                        onClick={() => {
                          setDeleteTutoringClassHCData(tutoringClassHC),
                            setOpenDeleteTutoringClassHCModal(true);
                        }}
                        className="cursor-pointer hover:text-red-500"
                      />{" "}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {openTutoringClassHCModal && (
        <AddTutoringClassHCModal
          openAddTutoringClassHCModal={openTutoringClassHCModal}
          setOpenAddTutoringClassHCModal={setOpenTutoringClassHCModal}
        />
      )}

      {openDeleteTutoringClassHCModal && (
        <DeleteModal
          id={deleteTutoringClassHCData?._id}
          name={deleteTutoringClassHCData?.className}
          setDeleteData={setDeleteTutoringClassHCData}
          openDeleteModal={openDeleteTutoringClassHCModal}
          setOpenDeleteModal={setOpenDeleteTutoringClassHCModal}
          deleteFunction={deleteTutoringClassHC}
        />
      )}
    </div>
  );
};

export default AllTutoringClassHC;
