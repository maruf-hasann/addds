import React, { useState } from "react";
import { FaShareAlt, FaStreetView, FaTrash } from "react-icons/fa";
import { useDeleteBlogMutation, useGetTutorBlogsQuery } from "../../../../../store/service/blog/blogApiService";
import DataTable from "../../../DataTable/DataTable";
import DetailsBlog from "../../../../../pages/Blog/DetailsBlog/DetailsBlog";
import BlogDeleteModal from "../../../DeleteModal/BlogDeleteModal";
import ShareModal from "../../../../Blog/ShareModal/ShareModal";

const Post = ({ number }) => {
  const [detailsModal, setDetailsModal] = useState(false);
  const [blog, setBlog] = useState(null);
  // delete blog state
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [blogdeleteData, setBlogdeleteData] = useState(null);
  // show share modal
  const [shareModal, setShareModal] = useState(false);
  const [shareData, SetShareData] = useState(null)
  

  // redux api
  const { data: blogInfo, isLoading } = useGetTutorBlogsQuery(number);
  const allBlogs = blogInfo?.data;
  // delete blog
  const [deleteBlog] = useDeleteBlogMutation();

  return (
    <div className="relative bottom-8">
      <DataTable
        isLoading={isLoading}
        error={false}
        tableData={allBlogs}
        handleSelectedRowItem={(data) => console.log(data)}
        columns={[
          {
            name: "Image",
            render: ({ item }) => (
              <div className="w-[225px] h-[115px]">
                {item?.imageUrl ? (
                  <img
                    class=" w-[225px] h-[115px] object-cover rounded-md "
                    src={item?.imageUrl}
                    alt={item?.title}
                  />
                ) : (
                  <FaRegImage class="w-10 h-10 rounded-full" />
                )}
              </div>
            ),
          },
          {
            name: "Title",
            render: ({ item }) => (
              <div>
                <h1 className=" font-semibold">
                  {item?.title.length > 29
                    ? item?.title?.slice(0, 29) + "..."
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
            name: "Share",
            render: ({ item }) => (
              <FaShareAlt
                onClick={() => {
                  setShareModal(true)
                  SetShareData(item)
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

      {/* blog details */}
      {detailsModal && (
        <DetailsBlog
          detailsModal={detailsModal}
          setDetailsModal={setDetailsModal}
          blog={blog}
        />
      )}
      {/* show share */} 
      {
        shareModal && <ShareModal setShareModal={setShareModal} shareModal={shareModal} slug={shareData?.slug} />
      }
      {/* delete blog */}
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

export default Post;
