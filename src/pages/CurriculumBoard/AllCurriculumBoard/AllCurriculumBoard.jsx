import { useState } from "react";
import { FaTrash } from "react-icons/fa";

import AddCurriculumBoardModal from "./AddCurriculumBoardModal/AddCurriculumBoardModal";
import {
  useDeleteCurriculumBoardMutation,
  useGetCurriculumBoardsQuery,
} from "../../../store/service/curriculumBoard/curriculumBoardApiService";
import DeleteModal from "../../../components/Shared/DeleteModal/DeleteModal";

const AllCurriculumBoard = () => {
  const [openCurriculumBoardModal, setOpenCurriculumBoardModal] =
    useState(false);

  const [deleteCurriculumBoardData, setDeleteCurriculumBoardData] =
    useState(null);
  const [openDeleteCurriculumBoardModal, setOpenDeleteCurriculumBoardModal] =
    useState(false);

  const [deleteCurriculumBoard] = useDeleteCurriculumBoardMutation();

  const { data: allCurriculumBoardData } = useGetCurriculumBoardsQuery();
  const allCurriculumBoard = allCurriculumBoardData?.data;

  return (
    <div className="py-10">
      <div className="flex justify-between items-center border-b pb-3">
        <h1 className="font-bold">All Curriculum Board</h1>
        <div
          className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 bg-white cursor-pointer"
          onClick={() => setOpenCurriculumBoardModal(true)}
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
            {allCurriculumBoard?.map((curriculumBoard, idx) => {
              const classes = "p-4 border-b border-blue-gray-50";
              return (
                <tr className={classes} key={curriculumBoard?._id}>
                  <th className={classes}>{idx + 1}</th>
                  <td className={classes}>{curriculumBoard.boardName}</td>
                  <td className={classes}>
                    {curriculumBoard?.educationVariant}
                  </td>
                  <td className={`${classes} w-[120px]`}>
                    <div className="flex justify-evenly items-center">
                      <FaTrash
                        onClick={() => {
                          setDeleteCurriculumBoardData(curriculumBoard),
                            setOpenDeleteCurriculumBoardModal(true);
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
      {openCurriculumBoardModal && (
        <AddCurriculumBoardModal
          openAddCurriculumBoardModal={openCurriculumBoardModal}
          setOpenAddCurriculumBoardModal={setOpenCurriculumBoardModal}
        />
      )}

      {openDeleteCurriculumBoardModal && (
        <DeleteModal
          id={deleteCurriculumBoardData?._id}
          name={deleteCurriculumBoardData?.boardName}
          setDeleteData={setDeleteCurriculumBoardData}
          openDeleteModal={openDeleteCurriculumBoardModal}
          setOpenDeleteModal={setOpenDeleteCurriculumBoardModal}
          deleteFunction={deleteCurriculumBoard}
        />
      )}
    </div>
  );
};

export default AllCurriculumBoard;
