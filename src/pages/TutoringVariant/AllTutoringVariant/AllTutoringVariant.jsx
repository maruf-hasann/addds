import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

import { useState } from "react";
import DeleteTutoringVariantModal from "./DeleteTutoringVariant/DeleteTutoringVariantModal";
import EditTutoringVariantModal from "./EditTutoringVariant/EditTutoringVariant";
import { useGetTutoringVariantsQuery } from "../../../store/service/tutoringVariant/tutoringVariantApiService";
import AddTutoringVariantModal from "./AddTutoringVariantModal/AddTutoringVariantModal";
import DataTable from "../../../components/Shared/DataTable/DataTable";

const AllTutoringVariant = () => {
  const [openTutoringVariantModal, setOpenTutoringVariantModal] =
    useState(false);
  const [deleteTutoringVariantData, setDeleteTutoringVariantData] =
    useState(null);
  const [openDeleteTutoringVariantModal, setOpenDeleteTutoringVariantModal] =
    useState(false);
  const [editTutoringVariantData, setEditTutoringVariantData] = useState(null);
  const [openEditTutoringVariantModal, setOpenEditTutoringVariantModal] =
    useState(false);

  const { data: tutoringVariantsData, isLoading } = useGetTutoringVariantsQuery();
  const tutoringVariants = tutoringVariantsData?.data;

  return (
    <>
      <div className="py-10">
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-bold text-xl md:text-2xl text-white">
            All Tutoring Variant
          </h1>
          <div
            className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
            onClick={() => setOpenTutoringVariantModal(true)}
          >
            Add New
          </div>
        </div>
        <DataTable
        isLoading={isLoading}
        error={false}
        tableData={tutoringVariants}
        handleSelectedRowItem={(data) => console.log(data)}
        columns={[
          { name: "Name", dataIndex: "variantName", key: "_id" },
          {
            name: "Actions",
            render: ({ item }) => (
              <div className="flex gap-2">
                <button
                  className=" text-red-500"
                  onClick={() => {
                    setOpenDeleteTutoringVariantModal(true),
                      setDeleteTutoringVariantData(item);
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            ),
          },
        ]}
      />
      </div>
      {openDeleteTutoringVariantModal && deleteTutoringVariantData && (
        <DeleteTutoringVariantModal
          deleteTutoringVariantData={deleteTutoringVariantData}
          openDeleteTutoringVariantModal={openDeleteTutoringVariantModal}
          setDeleteTutoringVariantData={setDeleteTutoringVariantData}
          setOpenDeleteTutoringVariantModal={setOpenDeleteTutoringVariantModal}
        />
      )}
      {openEditTutoringVariantModal && editTutoringVariantData && (
        <EditTutoringVariantModal
          editTutoringVariantData={editTutoringVariantData}
          openEditTutoringVariantModal={openEditTutoringVariantModal}
          setEditTutoringVariantData={setOpenEditTutoringVariantModal}
          setOpenEditTutoringVariantModal={setOpenEditTutoringVariantModal}
        />
      )}
      {openTutoringVariantModal && (
        <AddTutoringVariantModal
          openAddTutoringVariantModal={openTutoringVariantModal}
          setOpenAddTutoringVariantModal={setOpenTutoringVariantModal}
        />
      )}
    </>
  );
};

export default AllTutoringVariant;
