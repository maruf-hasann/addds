import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import AddCollageHCModal from "./AddCollageHCModal/AddCollageHCModal";
import {
  useDeleteCollageHCMutation,
  useGetCollageHCQuery,
} from "../../../store/service/collageHC/collageHCApiService";
import DeleteModal from "../../../components/Shared/DeleteModal/DeleteModal";
import EditCollageHCModal from "./EditCollageHCModal/EditCollageHCModal";
import DataTable from "../../../components/Shared/DataTable/DataTable";

const AllCollageHC = () => {
  const [openCollageHCModal, setOpenCollageHCModal] = useState(false);

  const [deleteCollageHCData, setDeleteCollageHCData] = useState(null);
  const [openDeleteCollageHCModal, setOpenDeleteCollageHCModal] =
    useState(false);

  /* Edit */
  const [editCollageHCData, setEditCollageHCData] = useState(null);
  const [openEditCollageHCModal, setOpenEditCollageHCModal] = useState(false);

  const [deleteCollageHC] = useDeleteCollageHCMutation();

  const { data: allCollageHCData, isLoading } = useGetCollageHCQuery();
  const allCollageHC = allCollageHCData?.data;

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-xl md:text-2xl text-white">
          All Collage HC
        </h1>
        <div
          className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
          onClick={() => setOpenCollageHCModal(true)}
        >
          Add New
        </div>
      </div>
      <DataTable
        isLoading={isLoading}
        error={false}
        tableData={allCollageHC}
        handleSelectedRowItem={(data) => console.log(data)}
        columns={[
          { name: "Name", dataIndex: "collageName", key: "_id" },
          { name: "Variant", dataIndex: "educationVariant", key: "_id" },
          { name: "Division", dataIndex: "division", key: "_id" },
          {
            name: "Actions",
            render: ({ item }) => (
              <FaTrash
                onClick={() => {
                  setDeleteCollageHCData(item),
                    setOpenDeleteCollageHCModal(true);
                }}
                className="cursor-pointer hover:text-red-500"
              />
            ),
          },
        ]}
      />

      {openCollageHCModal && (
        <AddCollageHCModal
          openAddCollageHCModal={openCollageHCModal}
          setOpenAddCollageHCModal={setOpenCollageHCModal}
        />
      )}

      {openEditCollageHCModal && (
        <EditCollageHCModal
          editData={editCollageHCData}
          openEditCollageHCModal={openEditCollageHCModal}
          setOpenEditCollageHCModal={setOpenEditCollageHCModal}
        />
      )}

      {openDeleteCollageHCModal && (
        <DeleteModal
          id={deleteCollageHCData?._id}
          name={deleteCollageHCData?.collageName}
          setDeleteData={setDeleteCollageHCData}
          openDeleteModal={openDeleteCollageHCModal}
          setOpenDeleteModal={setOpenDeleteCollageHCModal}
          deleteFunction={deleteCollageHC}
        />
      )}
    </div>
  );
};

export default AllCollageHC;
