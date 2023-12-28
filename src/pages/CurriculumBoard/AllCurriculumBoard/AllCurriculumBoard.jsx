import { useState } from "react";
import { FaTrash } from "react-icons/fa";

import AddCurriculumBoardModal from "./AddCurriculumBoardModal/AddCurriculumBoardModal";
import {
  useDeleteCurriculumBoardMutation,
  useGetCurriculumBoardsQuery,
} from "../../../store/service/curriculumBoard/curriculumBoardApiService";
import DeleteModal from "../../../components/Shared/DeleteModal/DeleteModal";
import DataTable from "../../../components/Shared/DataTable/DataTable";

const AllCurriculumBoard = () => {
  const [openCurriculumBoardModal, setOpenCurriculumBoardModal] =
    useState(false);

  const [deleteCurriculumBoardData, setDeleteCurriculumBoardData] =
    useState(null);
  const [openDeleteCurriculumBoardModal, setOpenDeleteCurriculumBoardModal] =
    useState(false);

  const [deleteCurriculumBoard] = useDeleteCurriculumBoardMutation();

  const { data: allCurriculumBoardData, isLoading } =
    useGetCurriculumBoardsQuery();
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
      <DataTable
        isLoading={isLoading}
        error={false}
        tableData={allCurriculumBoard}
        handleSelectedRowItem={(data) => console.log(data)}
        columns={[
          { name: "Name", dataIndex: "boardName", key: "_id" },
          { name: "Variant", dataIndex: "educationVariant", key: "_id" },
          {
            name: "Actions",
            render: ({ item }) => (
              <FaTrash
                onClick={() => {
                  setDeleteCurriculumBoardData(item),
                    setOpenDeleteCurriculumBoardModal(true);
                }}
                className="cursor-pointer hover:text-red-500"
              />
            ),
          },
        ]}
      />
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
