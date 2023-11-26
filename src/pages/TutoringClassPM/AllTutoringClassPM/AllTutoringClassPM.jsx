import { useState } from "react";
import { FaTrash } from "react-icons/fa";

import AddTutoringClassPMModal from "./AddTutoringClassPMModal/AddTutoringClassPMModal";
import {
  useDeleteTutoringClassPMMutation,
  useGetTutoringClassPMQuery,
} from "../../../store/service/tutoringClassPM/tutoringClassPMApiService";
import DeleteModal from "../../../components/Shared/DeleteModal/DeleteModal";

const AllTutoringClassPM = () => {
  const [openTutoringClassPMModal, setOpenTutoringClassPMModal] =
    useState(false);

  const [deleteTutoringClassPMData, setDeleteTutoringClassPMData] =
    useState(null);
  const [openDeleteTutoringClassPMModal, setOpenDeleteTutoringClassPMModal] =
    useState(false);

  const [deleteTutoringClassPM] = useDeleteTutoringClassPMMutation();

  const { data: allTutoringClassPMData } = useGetTutoringClassPMQuery();
  const allTutoringClassPM = allTutoringClassPMData?.data;

  return (
    <div className="py-10">
      <div className="flex justify-between items-center border-b pb-3">
        <h1 className="font-bold">All Tutoring Class PM</h1>
        <div
          className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 bg-white cursor-pointer"
          onClick={() => setOpenTutoringClassPMModal(true)}
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
                Variant
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-[120px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {/* row 1 */}
            {allTutoringClassPM?.map((tutoringClassPM, idx) => {
              const classes = "p-4 border-b border-blue-gray-50";
              return (
                <tr className={classes} key={tutoringClassPM?._id}>
                  <th className={classes}>{idx + 1}</th>
                  <td className={classes}>{tutoringClassPM.className}</td>
                  <td className={classes}>
                    {tutoringClassPM?.educationVariant}
                  </td>
                  <td className={`${classes} w-[120px]`}>
                    <div className="flex justify-evenly items-center">
                      <FaTrash
                        onClick={() => {
                          setDeleteTutoringClassPMData(tutoringClassPM),
                            setOpenDeleteTutoringClassPMModal(true);
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
      {openTutoringClassPMModal && (
        <AddTutoringClassPMModal
          openAddTutoringClassPMModal={openTutoringClassPMModal}
          setOpenAddTutoringClassPMModal={setOpenTutoringClassPMModal}
        />
      )}

      {openDeleteTutoringClassPMModal && (
        <DeleteModal
          id={deleteTutoringClassPMData?._id}
          name={deleteTutoringClassPMData?.className}
          setDeleteData={setDeleteTutoringClassPMData}
          openDeleteModal={openDeleteTutoringClassPMModal}
          setOpenDeleteModal={setOpenDeleteTutoringClassPMModal}
          deleteFunction={deleteTutoringClassPM}
        />
      )}
    </div>
  );
};

export default AllTutoringClassPM;
