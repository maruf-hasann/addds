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
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-xl md:text-2xl text-white">
          All Curriculum Board
        </h1>
        <div
          className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
          onClick={() => setOpenCurriculumBoardModal(true)}
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
            {allCurriculumBoard?.map((curriculumBoard, idx) => {
              const classes =
                "p-4 text-base text-gray-800 font-normal border-b";
              return (
                <tr className={`hover:bg-blue-50`} key={curriculumBoard?._id}>
                  <th className={`${classes} w-[120px]`}>{idx + 1}</th>
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
