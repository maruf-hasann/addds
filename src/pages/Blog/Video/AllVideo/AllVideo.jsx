import React, { useState } from "react";
import DataTable from "../../../../components/Shared/DataTable/DataTable";
import {
  useDeleteVideoMutation,
  useGetBlogVideoQuery,
} from "../../../../store/service/blogVideo/blogVideoApiService";
import { FaStreetView, FaTrash, FaRegEdit } from "react-icons/fa";
import AddVideo from "../AddVideo/AddVideo";
import BlogDeleteModal from "../../../../components/Shared/DeleteModal/BlogDeleteModal";
import DetailsVideo from "../DetailsVideo/DetailsVideo";
import EditVideo from "../EditVideo/EditVideo";

const AllVideo = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [detailsData, setDetailsData] = useState(null);
  const [detailsModal, setDetailsModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editVideoData, setEditVideoData] = useState(null);
  // redux api
  const { data: blogInfo, isLoading } = useGetBlogVideoQuery();
  const allVideos = blogInfo?.data;
  // delete api
  const [deleteVideo] = useDeleteVideoMutation();

  return (
    <div className="py-10 w-full">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-xl md:text-2xl text-white">All Video</h1>
        <div
          className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          Add Video
        </div>
      </div>

      <DataTable
        isLoading={isLoading}
        error={false}
        tableData={allVideos}
        handleSelectedRowItem={(data) => console.log(data)}
        columns={[
          { name: "Title", dataIndex: "title", key: "_id" },

          {
            name: "Details",
            render: ({ item }) => (
              <FaStreetView
                onClick={() => {
                  setDetailsData(item);
                  setDetailsModal(true);
                }}
                className="cursor-pointer hover:text-red-500"
              />
            ),
          },
          {
            name: "Edit",
            render: ({ item }) => (
              <FaRegEdit
                size={20}
                onClick={() => {
                  setEditModal(true);
                  setEditVideoData(item);
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
                  setVideoData(item), setOpenDeleteModal(true);
                }}
                className="cursor-pointer hover:text-red-500"
              />
            ),
          },
        ]}
      />
      {/* add Video */}
      {modalOpen && (
        <AddVideo modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
      {/* details Modal */}
      {detailsModal && (
        <DetailsVideo
          detailsModal={detailsModal}
          detailsData={detailsData}
          setDetailsModal={setDetailsModal}
        />
      )}
      {/* edit Video */}
      {editModal && (
        <EditVideo
          editModal={editModal}
          setEditModal={setEditModal}
          editVideoData={editVideoData}
        />
      )}
      {/* delete Video using blog delete Modal  */}
      {openDeleteModal && (
        <BlogDeleteModal
          id={videoData?._id}
          title={videoData?.title}
          setDeleteData={setVideoData}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          deleteFunction={deleteVideo}
        />
      )}
    </div>
  );
};

export default AllVideo;
