import React, { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeletePromotionInfoObjectMutation,
  useLazyGetPromotionInfoQuery,
  useUploadPromoVideoMutation,
  useUploadSingleImageMutation,
  useUploadSingleVideoMutation,
} from "../../../../../store/service/tutorInfo/promotion/promotionApiService";
import { useForm } from "react-hook-form";
import { MdCloudUpload } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import DeleteConfirmationModal from "./DeleteConfirmationModal/DeleteConfirmationModal";
import toast from "react-hot-toast";

const EditPromoInfo = () => {
  const { number } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [promoInfo, setPromoInfo] = useState(null);
  const [mediaGallery, setMediaGallery] = useState([]);
  const [videoGallery, setVideoGallery] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState(null);

  const [addPromotionVideo, { isLoading }] = useUploadPromoVideoMutation();
  const [deletePromoObject, { isLoading: promoObjectDeleteLoading }] =
    useDeletePromotionInfoObjectMutation();
  const [uploadSingleImage, { isLoading: uploadSingleImageLoading }] =
    useUploadSingleImageMutation();

  const [uploadSingleVideo, { isLoading: uploadSingleVideoLoading }] =
    useUploadSingleVideoMutation();
  const [getPromoInfo] = useLazyGetPromotionInfoQuery();

  useEffect(() => {
    if (number) {
      const fetch = async () => {
        const result = await getPromoInfo(number);
        if (result?.data?.success) {
          const promoInfo = result?.data?.data;
          setPromoInfo(promoInfo);
          setMediaGallery(promoInfo?.mediaGallery);
          setVideoGallery(promoInfo?.videoGallery);
        }
      };

      fetch();
    }
  }, [number]);

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    if (!video) {
      toast.error("Please upload video");
      return;
    }
    if (!image) {
      toast.error("Please upload image");
      return;
    }
    const formData = new FormData();
    formData.append("video", video);
    formData.append("image", image);
    formData.append("phoneNumber", number);

    const result = await addPromotionVideo(formData);
    if (result.data) {
      toast.success(result.data?.message);
      setImage(null);
      setVideo(null);
      setImagePreview(null);
      setVideoPreview(null);
    } else {
      toast.error(result.error?.data?.message);
    }
  };

  const handleUploadSingleImage = async () => {
    if (!image) {
      toast.error("Please upload image");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);

    const result = await uploadSingleImage({ number, data: formData });
    if (result.data) {
      toast.success(result.data?.message);
      setImage(null);
      setImagePreview(null);
      const currentPromoInfo = result?.data?.data;
      setPromoInfo(currentPromoInfo);
      setMediaGallery(currentPromoInfo?.mediaGallery);
    } else {
      toast.error(result.error?.data?.message);
    }
  };

  const handleUploadSingleVideo = async () => {
    if (!video) {
      toast.error("Please upload video");
      return;
    }
    const formData = new FormData();
    formData.append("video", video);

    const result = await uploadSingleVideo({ number, data: formData });
    if (result.data) {
      toast.success(result.data?.message);
      setVideo(null);
      setVideoPreview(null);
      const currentPromoInfo = result?.data?.data;
      setPromoInfo(currentPromoInfo);
      setVideoGallery(currentPromoInfo?.videoGallery);
    } else {
      toast.error(result.error?.data?.message);
    }
  };

  const handleAddImage = async (e) => {
    e.preventDefault();
    let files;
    if (e?.type === "drop" || e?.type === "dragover") {
      files = e.dataTransfer.files;
    } else {
      files = e.target.files;
    }
    if (files.length > 0) {
      const selectedImage = files[0];
      setImage(selectedImage);

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    let files;
    if (e?.type === "drop" || e?.type === "dragover") {
      files = e.dataTransfer.files;
    } else {
      files = e.target.files;
    }
    if (files.length > 0) {
      const selectedVideo = files[0];
      setVideo(selectedVideo);

      const videoUrl = URL.createObjectURL(selectedVideo);
      setVideoPreview(videoUrl);
    }
  };

  const handleDelete = async () => {
    const result = await deletePromoObject(deleteData);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      const currentPromoInfo = result?.data?.data;
      setPromoInfo(currentPromoInfo);
      setMediaGallery(currentPromoInfo?.mediaGallery);
      setVideoGallery(currentPromoInfo?.videoGallery);
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
      toast.error(result?.error?.data?.message);
    }
  };

  const handleCancelDelete = () => {
    // Close the modal without performing the delete action
    setDeleteData(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-xl md:text-2xl text-white">
          Update Promo Info
        </h1>
        <Link
          to={`/academic-tutoring-details/${number}`}
          className="bg-white text-[#1E6CB3] px-5 py-1 rounded-sm font-semibold"
        >
          Back
        </Link>
      </div>
      <div className="border rounded-md bg-white p-2 sm:p-5 md:p-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Image Preview */}
          <div>
            {imagePreview ? (
              <div>
                <div className="border-2 border-dashed border-gray-300 p-4 relative">
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="w-auto max-h-80 mx-auto"
                  />
                  <span
                    onClick={() => {
                      setImage(null), setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 border-2 border-red-300 p-1 rounded-full cursor-pointer z-30"
                  >
                    <BsTrash className="text-red-500" />
                  </span>
                </div>
                <div className="my-5">
                  {!promoInfo ? (
                    ""
                  ) : (
                    <div className="flex justify-end">
                      <span
                        onClick={handleUploadSingleImage}
                        className="bg-blue-500 text-white py-3 px-5 rounded-full cursor-pointer"
                      >
                        {uploadSingleImageLoading ? (
                          <ImSpinner9 className="animate-spin my-1 mx-4" />
                        ) : (
                          "Upload"
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <label className="block mb-3 text-sm font-semibold outline-none text-gray-800 ">
                  Upload Image
                </label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-10 text-center cursor-pointer w-full"
                  onDragOver={handleAddImage}
                  onDrop={handleAddImage}
                  onClick={() => {
                    const fileInput =
                      document.getElementById("primary-file-input");
                    fileInput.click();
                  }}
                >
                  <input
                    type="file"
                    accept="image/png"
                    onChange={(e) => {
                      handleAddImage(e);
                    }}
                    id="primary-file-input"
                    name="image"
                    className="hidden"
                  />
                  <div
                    className={`grid grid-cols-1  items-center justify-center gap-5`}
                  >
                    <div className="text-gray-400 text-4xl mx-auto">
                      <MdCloudUpload />
                    </div>
                    <p>
                      Drag and drop an image here <br /> or <br /> click to
                      select an image
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 w-full">
              {promoInfo && mediaGallery?.length
                ? mediaGallery?.map((media) => (
                    <div key={media?._id} className="max-h-60 relative">
                      <img
                        src={media?.imgUrl}
                        alt="Image gallery"
                        className="max-h-60"
                      />
                      <span
                        onClick={() => {
                          setIsDeleteModalOpen(true),
                            setDeleteData({
                              type: "image",
                              id: media?._id,
                              phoneNumber: number,
                            });
                        }}
                        className="absolute top-2 right-2 border-2 border-red-500 bg-white p-2 rounded-full cursor-pointer z-30"
                      >
                        <BsTrash className="text-red-500" />
                      </span>
                    </div>
                  ))
                : ""}
            </div>
          </div>

          {/* Video Preview */}
          <div>
            <div className="mb-10">
              {videoPreview ? (
                <div>
                  <div className="mb-5 border-2 border-dashed border-gray-300 p-4 relative">
                    <video
                      controls
                      width="100%"
                      className="w-auto max-h-80 mx-auto"
                    >
                      <source src={videoPreview} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <span
                      onClick={() => {
                        setVideo(null), setVideoPreview(null);
                      }}
                      className="absolute top-2 right-2 border-2 border-red-300 p-1 rounded-full cursor-pointer z-30"
                    >
                      <BsTrash className="text-red-500" />
                    </span>
                  </div>
                  <div className="my-5">
                    {!promoInfo ? (
                      ""
                    ) : (
                      <div className="flex justify-end">
                        <span
                          onClick={handleUploadSingleVideo}
                          className="bg-blue-500 text-white py-3 px-5 rounded-full cursor-pointer"
                        >
                          {uploadSingleVideoLoading ? (
                            <ImSpinner9 className="animate-spin my-1 mx-4" />
                          ) : (
                            "Upload"
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                    Upload Video
                  </label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer w-full"
                    onDragOver={handleAddVideo}
                    onDrop={handleAddVideo}
                    onClick={() => {
                      const fileInput = document.getElementById(
                        "primary-file-input1"
                      );
                      fileInput.click();
                    }}
                  >
                    <input
                      type="file"
                      accept="video/mp4"
                      onChange={(e) => {
                        handleAddVideo(e);
                      }}
                      id="primary-file-input1"
                      name="video"
                      className="hidden"
                    />
                    <div
                      className={`grid grid-cols-1  items-center justify-center gap-5`}
                    >
                      <div className="text-gray-400 text-4xl mx-auto">
                        <MdCloudUpload />
                      </div>
                      <p>
                        Drag and drop a video here <br /> or <br /> click to
                        select a video
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
              {promoInfo && videoGallery?.length
                ? videoGallery?.map((video) => (
                    <div key={video?._id} className="max-h-60 relative">
                      <video
                        controls
                        width="100%"
                        className="w-auto max-h-80 mx-auto"
                      >
                        <source src={video?.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <span
                        onClick={() => {
                          setIsDeleteModalOpen(true),
                            setDeleteData({
                              type: "video",
                              id: video?._id,
                              phoneNumber: number,
                            });
                        }}
                        className="absolute top-2 right-2 border-2 border-red-500 bg-white p-2 rounded-full cursor-pointer z-30"
                      >
                        <BsTrash className="text-red-500" />
                      </span>
                    </div>
                  ))
                : ""}
            </div>
          </div>

          {/* Submit Button */}
          {promoInfo ? (
            ""
          ) : (
            <button
              className="bg-blue-500 text-white py-2 mt-2 px-5 rounded-full"
              type="submit"
            >
              {isLoading ? (
                <ImSpinner9 className="animate-spin my-1 mx-4" />
              ) : (
                "Update"
              )}
            </button>
          )}
        </form>
      </div>
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isLoading={promoObjectDeleteLoading}
          onDelete={handleDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default EditPromoInfo;
