import React, { useState } from "react";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import DataTable from "../../components/Shared/DataTable/DataTable";
import {
  useDeleteSubCategoryMutation,
  useGetAllSubCategoryQuery,
} from "../../store/service/subCategory/subCategoryApiService";
import AddSubCategory from "./AddSubCategory/AddSubCategory";
import DeleteModal from "../../components/Shared/DeleteModal/DeleteModal";
import UpdateSubCategory from "./UpdateSubcategory/UpdateSubCategory";

const SubCategory = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [updateModal, setUpdateModal] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState(null);

  // redux api
  const { data: subcategoryInfo, isLoading } = useGetAllSubCategoryQuery();
  const [deleteSubCategory] = useDeleteSubCategoryMutation();
  const allSubCategories = subcategoryInfo?.data;

  return (
    <div className="py-10 w-full">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-xl md:text-2xl text-white">
          All Sub Categories
        </h1>
        <div
          className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          Add Sub Category
        </div>
      </div>

      <DataTable
        isLoading={isLoading}
        error={false}
        tableData={allSubCategories}
        handleSelectedRowItem={(data) => console.log(data)}
        columns={[
          {
            name: "Image",
            render: ({ item }) => (
              <div>
                {item?.imageURL ? (
                  <img
                    class="w-10 h-10 rounded-full"
                    src={item?.imageURL}
                    alt={item?.name}
                  />
                ) : (
                  <FaRegImage class="w-10 h-10 rounded-full" />
                )}
              </div>
            ),
          },
          { name: "Name", dataIndex: "name", key: "_id" },

          {
            name: "Click",
            dataIndex: "clickedCount",
            key: "_id",
          },
          {
            name: "Edit",
            render: ({ item }) => (
              <FaRegEdit
                size={20}
                onClick={() => {
                  setUpdateData(item);
                  setUpdateModal(true);
                }}
                className="cursor-pointer hover:text-red-500"
              />
            ),
          },
          {
            name: "Delete",
            render: ({ item }) => (
              <FaTrash
                onClick={() => {
                  setSubCategoryData(item), setOpenDeleteModal(true);
                }}
                className="cursor-pointer hover:text-red-500"
              />
            ),
          },
        ]}
      />
      {/* add subCategory */}
      {modalOpen && (
        <AddSubCategory modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
      {/* update  */}
      {updateModal && (
        <UpdateSubCategory
          updateModal={updateModal}
          setUpdateModal={setUpdateModal}
          updateData={updateData}
        />
      )}
      {/* delete subcategory */}
      {openDeleteModal && (
        <DeleteModal
          id={subCategoryData?._id}
          name={subCategoryData?.name}
          setDeleteData={setSubCategoryData}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          deleteFunction={deleteSubCategory}
        />
      )}
    </div>
  );
};

export default SubCategory;
