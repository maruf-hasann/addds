import React, { useState } from "react";
import DataTable from "../../../components/Shared/DataTable/DataTable";
import {
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
} from "../../../store/service/blog/blogApiService";
import { FaStreetView, FaTrash } from "react-icons/fa6";
import BlogDeleteModal from "../../../components/Shared/DeleteModal/BlogDeleteModal";
import DetailsBlog from "../DetailsBlog/DetailsBlog";
import AddBlog from "../AddBlog/AddBlog";

const AllBlog = () => {
  const [blogdeleteData, setBlogdeleteData] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [blog, setBlog] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // all blog data
  const { data: blogData, isLoading } = useGetAllBlogsQuery();
  const allBlogs = blogData?.data;
  // delete blog
  const [deleteBlog] = useDeleteBlogMutation();

  return (
    <div className="py-10 w-full">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-xl md:text-2xl text-white">All Blogs</h1>
        <div
          className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          Add Blog
        </div>
      </div>

      <DataTable
        isLoading={isLoading}
        error={false}
        tableData={allBlogs}
        handleSelectedRowItem={(data) => console.log(data)}
        columns={[
          {
            name: "Title",
            render: ({ item }) => (
              <div>
                <h1 className=" font-semibold">
                  {item?.title.length > 60
                    ? item?.title?.slice(0, 60) + "..."
                    : item?.title}
                </h1>
              </div>
            ),
          },
          {
            name: "Category",
            dataIndex: "category",
            key: "_id",
            dataIndex2: "name",
          },
          {
            name: "Views",
            dataIndex: "views",
            key: "_id",
          },
          {
            name: "User Name",
            dataIndex: "user",
            key: "_id",
            dataIndex2: "fullName",
          },
          {
            name: "Role",
            dataIndex: "user",
            key: "_id",
            dataIndex2: "role",
          },
          {
            name: "Details",
            render: ({ item }) => (
              <FaStreetView
                onClick={() => {
                  setBlog(item), setDetailsModal(true);
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
                  setBlogdeleteData(item), setOpenDeleteModal(true);
                }}
                className="cursor-pointer hover:text-red-500"
              />
            ),
          },
        ]}
      />
      {/* add blog */}
      {modalOpen && (
        <AddBlog modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
      {/* blog details */}
      {detailsModal && (
        <DetailsBlog
          detailsModal={detailsModal}
          setDetailsModal={setDetailsModal}
          blog={blog}
        />
      )}
      {/* blog delete */}
      {openDeleteModal && (
        <BlogDeleteModal
          id={blogdeleteData?._id}
          title={blogdeleteData?.title}
          setDeleteData={setBlogdeleteData}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          deleteFunction={deleteBlog}
        />
      )}
    </div>
  );
};

export default AllBlog;
