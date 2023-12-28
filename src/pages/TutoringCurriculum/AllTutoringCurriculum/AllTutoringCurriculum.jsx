import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import AddTutoringCurriculumModal from "./AddTutoringCurriculumModal/AddTutoringCurriculumModal";

import DeleteModal from "../../../components/Shared/DeleteModal/DeleteModal";
import EditTutoringCurriculumModal from "./EditTutoringCurriculumModal/EditTutoringCurriculumModal";
import {
  useDeleteTutoringCurriculumMutation,
  useGetTutoringCurriculumQuery,
} from "../../../store/service/tutoringCurriculum/tutoringCurriculumApiService";
import DataTable from "../../../components/Shared/DataTable/DataTable";

const AllTutoringCurriculum = () => {
  /* handle delete state handle */
  const [openTutoringCurriculumModal, setOpenTutoringCurriculumModal] =
    useState(false);
  const [deleteTutoringCurriculumData, setDeleteTutoringCurriculumData] =
    useState(null);
  const [
    openDeleteTutoringCurriculumModal,
    setOpenDeleteTutoringCurriculumModal,
  ] = useState(false);

  /* Edit state handle */
  const [editTutoringCurriculumData, setEditTutoringCurriculumData] =
    useState(null);
  const [openEditTutoringCurriculumModal, setOpenEditTutoringCurriculumModal] =
    useState(false);

  /* redux api call */
  const [deleteTutoringCurriculum] = useDeleteTutoringCurriculumMutation();
  const { data: allTutoringCurriculumData, isLoading } =
    useGetTutoringCurriculumQuery();
  const allTutoringCurriculum = allTutoringCurriculumData?.data;

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-xl md:text-2xl text-white">
          All Tutoring Curriculum
        </h1>
        <div
          className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
          onClick={() => setOpenTutoringCurriculumModal(true)}
        >
          Add New
        </div>
      </div>
      <DataTable
        isLoading={isLoading}
        error={false}
        tableData={allTutoringCurriculum}
        handleSelectedRowItem={(data) => console.log(data)}
        columns={[
          { name: "Curriculum Name", dataIndex: "curriculumName", key: "_id" },
          { name: "Variant", dataIndex: "educationVariant", key: "_id" },
          {
            name: "Actions",
            render: ({ item }) => (
              <FaTrash
                onClick={() => {
                  setDeleteTutoringCurriculumData(item),
                    setOpenDeleteTutoringCurriculumModal(true);
                }}
                className="cursor-pointer hover:text-red-500"
              />
            ),
          },
        ]}
      />

      {/* open add tutoring curriculum Modal */}
      {openTutoringCurriculumModal && (
        <AddTutoringCurriculumModal
          openAddTutoringCurriculumModal={openTutoringCurriculumModal}
          setOpenAddTutoringCurriculumModal={setOpenTutoringCurriculumModal}
        />
      )}

      {/* open edit tutoring curriculum Modal */}
      {openEditTutoringCurriculumModal && (
        <EditTutoringCurriculumModal
          editData={editTutoringCurriculumData}
          openEditTutoringCurriculumModal={openEditTutoringCurriculumModal}
          setOpenEditTutoringCurriculumBoard={
            setOpenEditTutoringCurriculumModal
          }
        />
      )}
      {/* open delete tutoring curriculum Modal */}
      {openDeleteTutoringCurriculumModal && (
        <DeleteModal
          id={deleteTutoringCurriculumData?._id}
          name={deleteTutoringCurriculumData?.curriculumName}
          setDeleteData={setDeleteTutoringCurriculumData}
          openDeleteModal={openDeleteTutoringCurriculumModal}
          setOpenDeleteModal={setOpenDeleteTutoringCurriculumModal}
          deleteFunction={deleteTutoringCurriculum}
        />
      )}
    </div>
  );
};

export default AllTutoringCurriculum;
