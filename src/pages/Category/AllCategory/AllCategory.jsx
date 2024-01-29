import React, { useState } from "react";
import { FaRegImage } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import {
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
} from "../../../store/service/category/categoryApiservice";
import DataTable from "../../../components/Shared/DataTable/DataTable";
import { FaTrash } from "react-icons/fa6";
import DeleteModal from "../../../components/Shared/DeleteModal/DeleteModal";
import AddCategory from "../AddCategory/AddCategory";
import UpdateCategory from "../UpdateCateGory/UpdateCategory";

const AllCategory = () => {
  const [categoryData, setCategoryData] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [updateModal, setUpdateModal] = useState(false);

  // category data
  const { data: categoryInfo, isLoading } = useGetAllCategoryQuery();
  const allCategories = categoryInfo?.data;
  // delete category
  const [deleteCategory] = useDeleteCategoryMutation();

  return (
    <div className="py-10 w-full">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-xl md:text-2xl text-white">
          All Categories
        </h1>
        <div
          className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          Add Category
        </div>
      </div>

      <DataTable
        isLoading={isLoading}
        error={false}
        tableData={allCategories}
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
                  setCategoryData(item), setOpenDeleteModal(true);
                }}
                className="cursor-pointer hover:text-red-500"
              />
            ),
          },
        ]}
      />
      {/* add category Modal */}
      {modalOpen && (
        <AddCategory modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
      {/* edit category data */}
      {updateModal && (
        <UpdateCategory
          updateModal={updateModal}
          setUpdateModal={setUpdateModal}
          updateData={updateData}
        />
      )}
      {/* delete Category */}

      {openDeleteModal && (
        <DeleteModal
          id={categoryData?._id}
          name={categoryData?.name}
          setDeleteData={setCategoryData}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          deleteFunction={deleteCategory}
        />
      )}
    </div>
  );
};

export default AllCategory;
