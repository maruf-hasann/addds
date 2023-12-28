import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import {
  useDeleteSubSubjectMutation,
  useGetSubSubjectQuery,
} from "../../store/service/subSubject/subSubjectApiService";
import AddSubSubjectModal from "./AddSubSubjectModal/AddSubSubjectModal";
import EditSubSubjectModal from "./EditSubSubjectModal/EditSubSubjectModal";
import DeleteModal from "../../components/Shared/DeleteModal/DeleteModal";
import DataTable from "../../components/Shared/DataTable/DataTable";

const AllSubSubject = () => {
  const [openSubSubjectModal, setOpenSubSubjectModal] = useState(false);
  const [deleteSubSubjectData, setDeleteSubSubjectData] = useState(null);
  const [openDeleteSubSubjectModal, setOpenDeleteSubSubjectModal] =
    useState(false);

  /* Edit State */
  const [editSubSubjectData, setEditSubSubjectData] = useState(null);
  const [openEditSubSubjectModal, setOpenEditSubSubjectModal] = useState(false);

  const [deleteSubSubject] = useDeleteSubSubjectMutation();

  const { data: allSubSubjectData, isLoading } = useGetSubSubjectQuery();
  const allSubSubject = allSubSubjectData?.data;

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-xl md:text-2xl text-white">
          All Sub Subject
        </h1>
        <div
          className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
          onClick={() => setOpenSubSubjectModal(true)}
        >
          Add New
        </div>
      </div>
      <DataTable
        isLoading={isLoading}
        error={false}
        tableData={allSubSubject}
        handleSelectedRowItem={(data) => console.log(data)}
        columns={[
          { name: "Main Subject", dataIndex: "mainSubject", key: "_id" },
          { name: "Sub Subject", dataIndex: "subSubject", key: "_id" },
          {
            name: "Actions",
            render: ({ item }) => (
              <FaTrash
                onClick={() => {
                  setDeleteSubSubjectData(item),
                    setOpenDeleteSubSubjectModal(true);
                }}
                className="cursor-pointer hover:text-red-500"
              />
            ),
          },
        ]}
      />

      {openSubSubjectModal && (
        <AddSubSubjectModal
          openAddSubSubjectModal={openSubSubjectModal}
          setOpenAddSubSubjectModal={setOpenSubSubjectModal}
        />
      )}

      {/* Open Edit Subject Variant Modal  */}
      {openEditSubSubjectModal && (
        <EditSubSubjectModal
          editData={editSubSubjectData}
          openEditSubSubjectModal={openEditSubSubjectModal}
          setOpenEditSubSubject={setOpenEditSubSubjectModal}
        />
      )}

      {openDeleteSubSubjectModal && (
        <DeleteModal
          id={deleteSubSubjectData?._id}
          name={deleteSubSubjectData?.subSubject}
          setDeleteData={setDeleteSubSubjectData}
          openDeleteModal={openDeleteSubSubjectModal}
          setOpenDeleteModal={setOpenDeleteSubSubjectModal}
          deleteFunction={deleteSubSubject}
        />
      )}
    </div>
  );
};

export default AllSubSubject;
