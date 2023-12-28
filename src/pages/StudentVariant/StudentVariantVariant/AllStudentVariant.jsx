import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import DeleteStudentVariantModal from "./DeleteStudentVariant/DeleteStudentVariantModal";
import EditStudentVariantModal from "./EditStudentVariant/EditStudentVariant";
import { useGetStudentVariantsQuery } from "../../../store/service/studentVariant/studentVariantApiService";
import AddStudentVariantModal from "./AddStudentVariantModal/AddStudentVariantModal";
import DataTable from "../../../components/Shared/DataTable/DataTable";

const AllStudentVariant = () => {
  const [openStudentVariantModal, setOpenStudentVariantModal] = useState(false);

  const [deleteStudentVariantData, setDeleteStudentVariantData] =
    useState(null);
  const [openDeleteStudentVariantModal, setOpenDeleteStudentVariantModal] =
    useState(false);

  const [editStudentVariantData, setEditStudentVariantData] = useState(null);
  const [openEditStudentVariantModal, setOpenEditStudentVariantModal] =
    useState(false);

  const { data: studentVariantsData, isLoading } = useGetStudentVariantsQuery();
  const studentVariants = studentVariantsData?.data;

  return (
    <>
      <div className="py-10">
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-bold text-xl md:text-2xl text-white">
            All Tutoring Category
          </h1>
          <div
            // to={"/add-student-variant"}
            className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
            onClick={() => setOpenStudentVariantModal(true)}
          >
            Add New
          </div>
        </div>
        <DataTable
          isLoading={isLoading}
          error={false}
          tableData={studentVariants}
          handleSelectedRowItem={(data) => console.log(data)}
          columns={[
            { name: "Name", dataIndex: "variantName", key: "_id" },
            {
              name: "Actions",
              render: ({ item }) => (
                <FaTrash
                  onClick={() => {
                    setDeleteStudentVariantData(item),
                      setOpenDeleteStudentVariantModal(true);
                  }}
                  className="cursor-pointer hover:text-red-500"
                />
              ),
            },
          ]}
        />
      </div>
      {openDeleteStudentVariantModal && deleteStudentVariantData && (
        <DeleteStudentVariantModal
          deleteStudentVariantData={deleteStudentVariantData}
          openDeleteStudentVariantModal={openDeleteStudentVariantModal}
          setDeleteStudentVariantData={setDeleteStudentVariantData}
          setOpenDeleteStudentVariantModal={setOpenDeleteStudentVariantModal}
        />
      )}
      {openEditStudentVariantModal && editStudentVariantData && (
        <EditStudentVariantModal
          editStudentVariantData={editStudentVariantData}
          openEditStudentVariantModal={openEditStudentVariantModal}
          setEditStudentVariantData={setOpenEditStudentVariantModal}
          setOpenEditStudentVariantModal={setOpenEditStudentVariantModal}
        />
      )}
      {openStudentVariantModal && (
        <AddStudentVariantModal
          openAddStudentVariantModal={openStudentVariantModal}
          setOpenAddStudentVariantModal={setOpenStudentVariantModal}
        />
      )}
    </>
  );
};

export default AllStudentVariant;
