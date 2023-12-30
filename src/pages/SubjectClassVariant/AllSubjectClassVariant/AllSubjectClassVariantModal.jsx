import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

import { useState } from "react";
import EditSubjectClassVariantModal from "./EditTutoringVariantModal/EditTutoringVariantModal";
import { useGetSubjectClassVariantsQuery } from "../../../store/service/subjectClassVariant/subjectClassVariantApiService";
import AddSubjectClassVariantModal from "./AddSubjectClassVariantModal/AddSubjectClassVariantModal";
import DeleteSubjectClassVariant from "./DeleteSubjectClassVariant/DeleteSubjectClassVariant";
import DataTable from "../../../components/Shared/DataTable/DataTable";

const AllSubjectClassVariantModal = () => {
  /* delete state handling  */
  const [openSubjectClassVariantModal, setOpenSubjectClassVariantModal] =
    useState(false);
  const [deleteSubjectClassVariantData, setDeleteSubjectClassVariantData] =
    useState(null);
  const [
    openDeleteSubjectClassVariantModal,
    setOpenDeleteSubjectClassVariantModal,
  ] = useState(false);
  /* edit state handling*/
  const [editSubjectClassVariantData, setEditSubjectClassVariantData] =
    useState(null);
  const [
    openEditSubjectClassVariantModal,
    setOpenEditSubjectClassVariantModal,
  ] = useState(false);

  /* redux api call */
  const { data: subjectClassVariantsData, isLoading } =
    useGetSubjectClassVariantsQuery();
  const SubjectClassVariants = subjectClassVariantsData?.data;

  return (
    <>
      <div className="py-10">
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-bold text-xl md:text-2xl text-white">
            All Subject Class Variant
          </h1>
          <div
            className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
            onClick={() => setOpenSubjectClassVariantModal(true)}
          >
            Add New
          </div>
        </div>
        <DataTable
          isLoading={isLoading}
          error={false}
          tableData={SubjectClassVariants}
          handleSelectedRowItem={(data) => console.log(data)}
          columns={[
            { name: "Name", dataIndex: "variant", key: "_id" },
            {
              name: "Actions",
              render: ({ item }) => (
                <FaTrash
                  onClick={() => {
                    setDeleteSubjectClassVariantData(item),
                      setOpenDeleteSubjectClassVariantModal(true);
                  }}
                  className="cursor-pointer hover:text-red-500"
                />
              ),
            },
          ]}
        />
      </div>

      {/* Open Delete Subject Class Variant Modal */}
      {openDeleteSubjectClassVariantModal && deleteSubjectClassVariantData && (
        <DeleteSubjectClassVariant
          deleteSubjectClassVariantData={deleteSubjectClassVariantData}
          openDeleteSubjectClassVariantModal={
            openDeleteSubjectClassVariantModal
          }
          setDeleteSubjectClassVariantData={setDeleteSubjectClassVariantData}
          setOpenDeleteSubjectClassVariantModal={
            setOpenDeleteSubjectClassVariantModal
          }
        />
      )}

      {/* Open Edit Subject Class Variant Modal */}
      {openEditSubjectClassVariantModal && editSubjectClassVariantData && (
        <EditSubjectClassVariantModal
          editData={editSubjectClassVariantData}
          openEditSubjectClassVariantModal={openEditSubjectClassVariantModal}
          setOpenEditSubjectClassVariantModal={
            setOpenEditSubjectClassVariantModal
          }
        />
      )}

      {/* Open Add Subject Class Variant Modal */}
      {openSubjectClassVariantModal && (
        <AddSubjectClassVariantModal
          openAddSubjectClassVariantModal={openSubjectClassVariantModal}
          setOpenAddSubjectClassVariantModal={setOpenSubjectClassVariantModal}
        />
      )}
    </>
  );
};

export default AllSubjectClassVariantModal;
