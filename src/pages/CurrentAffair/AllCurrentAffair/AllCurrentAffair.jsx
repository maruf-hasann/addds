import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";

import toast from "react-hot-toast";
import DeleteCurrentAffairModal from "./DeleteCurrentAffair/DeleteCurrentAffairModal";
import { useGetCurrentAffairsQuery } from "../../../store/service/currentAffair/currentAffairApiService";

const AllCurrentAffair = () => {
  const [deleteCurrentAffairData, setDeleteCurrentAffairData] =
    useState(null);
  const [openDeleteCurrentAffairModal, setOpenDeleteCurrentAffairModal] =
    useState(false);

  const { data: currentAffairsData } = useGetCurrentAffairsQuery();
  const currentAffairs = currentAffairsData?.data;

  return (
    <>
      <div className="py-10">
        <div className="flex justify-between items-center pb-3">
          <h1 className="font-bold text-gray-800">All Current Affairs</h1>
          <Link
            to={"/add-current-affair"}
            className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 hover:text-sky-700 bg-white"
          >
            Add New
          </Link>
        </div>
        <div className="overflow-x-auto border-x rounded bg-white">
          <table className="w-full min-w-max table-auto text-left">
            {/* head */}
            <thead>
              <tr>
                <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold">
                  Sl
                </th>
                <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold">
                  Name
                </th>
                <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold w-[120px] text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {currentAffairs?.map((affair, idx) => {
                const classes = "p-4 border-b border-blue-gray-50 text-base text-gray-800 font-normal";
                return (
                  <tr key={affair?._id} className={` ${idx % 2 !== 0 && 'bg-gray-50'}`}>
                    <th className={classes}>{idx + 1}</th>
                    <td className={classes}>{affair?.affair}</td>
                    <td className={`${classes} w-[120px]`}>
                      <div className="flex justify-evenly items-center">
                        <FaTrash
                          onClick={() => {
                            setDeleteCurrentAffairData(affair),
                              setOpenDeleteCurrentAffairModal(true);
                          }}
                          className="cursor-pointer hover:text-red-500"
                        />{" "}
                        <FaEdit
                          onClick={() =>
                            toast.success("Current Affair updated successfully")
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
      {openDeleteCurrentAffairModal && deleteCurrentAffairData && (
        <DeleteCurrentAffairModal
          deleteCurrentAffairData={deleteCurrentAffairData}
          openDeleteCurrentAffairModal={openDeleteCurrentAffairModal}
          setDeleteCurrentAffairData={setDeleteCurrentAffairData}
          setOpenDeleteCurrentAffairModal={setOpenDeleteCurrentAffairModal}
        />
      )}
    </>
  );
};

export default AllCurrentAffair;
