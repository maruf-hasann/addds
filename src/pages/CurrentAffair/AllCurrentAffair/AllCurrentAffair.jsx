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
        <div className="flex justify-between items-center border-b pb-3">
          <h1 className="font-bold">All Current Affairs</h1>
          <Link
            to={"/add-current-affair"}
            className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 hover:text-sky-700"
          >
            Add New
          </Link>
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
              {/* row 1 */}
              {currentAffairs?.map((affair, idx) => {
                const classes = "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={affair?._id} className="hover">
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
