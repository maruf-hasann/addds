import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import {
  useDeleteBannerMutation,
  useGetAllBannersQuery,
} from "../../store/service/banner/bannerApiService";
import AddBanner from "./AddBanner/AddBanner";
import DeleteBanner from "../../components/Blog/Banner/DeleteBanner";
import EditBanner from "../../components/Blog/Banner/EditBanner";
import BannerSkeleton from "../../components/Blog/Banner/BannerSkeleton";

const BlogBanner = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [updateModal, setUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(null);

  // redux api
  const { data: bannerInfo, isLoading } = useGetAllBannersQuery();

  const [deleteBanner] = useDeleteBannerMutation();
  const bannerData = bannerInfo?.data;
 
  return (
    <div className="py-10 w-full">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-xl md:text-2xl text-white">All Banner</h1>
        <div
          className="font-semibold text-sm border px-6 py-2 text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          Add Banner
        </div>
      </div>
      {/* banner not found */}
      <>
        {!bannerData?.length && (
          <div className="text-red-500 font-semibold mb-3">
            <h3>Banner not Found!</h3>
          </div>
        )}
      </>

      {isLoading ? (
        <>
          <BannerSkeleton />
        </>
      ) : (
        <div className="bg-white  p-4 rounded-md">
          <div className="mt-7">
            {bannerData?.map((data) => (
              <div className="mb-6" key={data?._id}>
                <img
                  src={data?.image}
                  alt=""
                  className="rounded-md h-[215px] w-[1238px] object-cover"
                />
                <div className=" bg-white shadow  inline-block px-24 py-2 rounded-b-xl ">
                  <div className="flex items-center gap-4">
                    <FaRegEdit
                      className="cursor-pointer hover:text-red-500 text-gray-800"
                      size={30}
                      onClick={() => {
                        setUpdateModal(true);
                        setUpdateData(data);
                      }}
                    />
                    <RiDeleteBin6Line
                      size={30}
                      className="cursor-pointer hover:text-red-500 text-gray-800"
                      onClick={() => {
                        setDeleteData(data);
                        setOpenDeleteModal(true);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* add Banner */}
      {modalOpen && (
        <AddBanner modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
      {/* delete banner */}
      {openDeleteModal && (
        <DeleteBanner
          id={deleteData?._id}
          setDeleteData={setDeleteData}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          deleteFunction={deleteBanner}
        />
      )}
      {/* update */}
      {updateModal && (
        <EditBanner
          setUpdateModal={setUpdateModal}
          updateModal={updateModal}
          updateData={updateData}
          setUpdateStatus={setUpdateStatus}
        />
      )}
    </div>
  );
};

export default BlogBanner;
