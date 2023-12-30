import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import AddMockPricingModal from "./AddMockPricingModal/AddMockPricingModal";

import DeleteMockPricingModal from "./DeleteMockPricingModal/DeleteMockPricingModal";
import EditMockPricingModal from "./EditMockPricingModal/EditMockPricingModal";
import {
  useDeleteMockPricingMutation,
  useGetMockPricingQuery,
} from "../../../store/service/mockPricing/mockPricingApiService";
import DataTable from "../../../components/Shared/DataTable/DataTable";

const AllMockPricing = () => {
  /* handle delete state handle */
  const [openMockPricingModal, setOpenMockPricingModal] = useState(false);
  const [deleteMockPricingData, setDeleteMockPricingData] = useState(null);
  const [openDeleteMockPricingModal, setOpenDeleteMockPricingModal] =
    useState(false);

  /* Edit state handle */
  const [editMockPricingData, setEditMockPricingData] = useState(null);
  const [openEditMockPricingModal, setOpenEditMockPricingModal] =
    useState(false);

  /* redux api call */
  const [deleteMockPricing] = useDeleteMockPricingMutation();
  const { data: allMockPricingData, isLoading } = useGetMockPricingQuery();
  const allMockPricing = allMockPricingData?.data;

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-xl md:text-2xl text-white">
          All Mock Pricing
        </h1>
        <div
          className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
          onClick={() => setOpenMockPricingModal(true)}
        >
          Add New
        </div>
      </div>
      <DataTable
        isLoading={isLoading}
        error={false}
        tableData={allMockPricing}
        handleSelectedRowItem={(data) => console.log(data)}
        columns={[
          {
            name: "Education Variant",
            dataIndex: "educationVariant",
            key: "_id",
          },
          { name: "Main Subject", dataIndex: "mainSubject", key: "_id" },
          { name: "Sub Subject", dataIndex: "subSubject", key: "_id" },
          { name: "Grade", dataIndex: "grade", key: "_id" },
          { name: "Price", dataIndex: "price", key: "_id" },
          {
            name: "Actions",
            render: ({ item }) => (
              <FaTrash
                onClick={() => {
                  setDeleteMockPricingData(item),
                    setOpenDeleteMockPricingModal(true);
                }}
                className="cursor-pointer hover:text-red-500"
              />
            ),
          },
        ]}
      />

      {/* open add tutoring curriculum Modal */}
      {openMockPricingModal && (
        <AddMockPricingModal
          openAddMockPricingModal={openMockPricingModal}
          setOpenAddMockPricingModal={setOpenMockPricingModal}
        />
      )}

      {/* open edit tutoring curriculum Modal */}
      {openEditMockPricingModal && (
        <EditMockPricingModal
          editData={editMockPricingData}
          openEditMockPricingModal={openEditMockPricingModal}
          setOpenEditMockPricingBoard={setOpenEditMockPricingModal}
        />
      )}
      {/* open delete tutoring curriculum Modal */}
      {openDeleteMockPricingModal && (
        <DeleteMockPricingModal
          id={deleteMockPricingData?.mockId}
          name={deleteMockPricingData?.price}
          setDeleteData={setDeleteMockPricingData}
          openDeleteModal={openDeleteMockPricingModal}
          setOpenDeleteModal={setOpenDeleteMockPricingModal}
          deleteFunction={deleteMockPricing}
        />
      )}
    </div>
  );
};

export default AllMockPricing;
