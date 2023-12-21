import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";

import toast from "react-hot-toast";
import DeleteCurrentAffairModal from "./DeleteCurrentAffair/DeleteCurrentAffairModal";
import { useGetCurrentAffairsQuery } from "../../../store/service/currentAffair/currentAffairApiService";
import AddCurrentAffairModal from "./AddCurrentAffairModal/AddCurrentAffairModal";

const AllCurrentAffair = () => {
  const [openAddCurrentAffairModal, setOpenAddCurrentAffairModal] =
    useState(false);
  const [deleteCurrentAffairData, setDeleteCurrentAffairData] = useState(null);
  const [openDeleteCurrentAffairModal, setOpenDeleteCurrentAffairModal] =
    useState(false);

  const { data: currentAffairsData } = useGetCurrentAffairsQuery();
  const currentAffairs = currentAffairsData?.data;

  return (
    <>
      <div className="py-10">
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-bold text-xl md:text-2xl text-white">
            All Current Affairs
          </h1>
          <div
            className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
            onClick={() => setOpenAddCurrentAffairModal(true)}
          >
            Add New
          </div>
        </div>
        <div className="overflow-x-auto border-x rounded bg-white">
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
              {currentAffairs?.map((affair, idx) => {
                const classes =
                  "p-4 text-base text-gray-800 font-normal border-b";
                return (
                  <tr key={affair?._id} className={` hover:bg-blue-50`}>
                    <th className={`${classes} w-[120px]`}>{idx + 1}</th>
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
      {openAddCurrentAffairModal && (
        <AddCurrentAffairModal
          openAddCurrentAffairModal={openAddCurrentAffairModal}
          setOpenAddCurrentAffairModal={setOpenAddCurrentAffairModal}
        />
      )}
    </>
  );
};

export default AllCurrentAffair;
