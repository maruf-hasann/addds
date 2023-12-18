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
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-xl md:text-2xl text-white">
          All Tutoring Class PM
        </h1>
        <div
          className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
          onClick={() => setOpenTutoringClassPMModal(true)}
        >
          Add New
        </div>
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

              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold">
                Variant
              </th>
              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold w-[120px] text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {allTutoringClassPM?.map((tutoringClassPM, idx) => {
              const classes =
                "p-4 text-base text-gray-800 font-normal border-b";
              return (
                <tr className={`hover:bg-blue-50`} key={tutoringClassPM?._id}>
                  <th className={`${classes} w-[120px]`}>{idx + 1}</th>
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
