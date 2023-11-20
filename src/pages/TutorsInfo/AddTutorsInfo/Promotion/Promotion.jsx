/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import {
  useUploadPromotionInfoMutation,
} from "../../../../store/service/tutorInfo/promotion/promotionApiService";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import { MdCloudUpload } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import toast from "react-hot-toast";


import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./Promotion.css"

const Promotion = () => {
  const [number, setNumber] = useState(null);
  const [numberError, setNumberError] = useState(false);

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const [addPromotionVideo, { isLoading }] = useUploadPromotionInfoMutation();

  const { handleSubmit } = useForm();

  useEffect(() => {
    if (number && !isValidPhoneNumber(number) && number?.length < 14) {
      setNumberError(true);
    }
  }, [number]);

  const onSubmit = async () => {
    if (!number || numberError) {
      toast.error("Please add a valid phone number");
      return;
    }
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
    formData.append("phoneNumber", number.substring(1));

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


  return (
    <div className="p-10">
      {/* number */}
      <div className="w-full relative mt-5 lg:mt-0 mb-10">
        <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
          Number
        </label>
        <PhoneInput
          className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full ps-2 flex  items-center gap-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          international
          countryCallingCodeEditable={true}
          defaultCountry="BD"
          value={number}
          onChange={setNumber}
        />

        {number && isValidPhoneNumber(number) ? (
          ""
        ) : (
          <p className={`text-red-500 ${!numberError && "hidden"}`}>
            Please enter a valid number
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Image Preview */}
        <div className="mb-10">
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
            </div>
          ) : (
            <div>
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
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
                    Drag and drop an image here <br /> or <br /> click to select
                    an image
                  </p>
                </div>
              </div>
            </div>
          )}
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
        </div>

        {/* Submit Button */}
        <button
          className="bg-blue-500 text-white py-2 mt-5 px-5 rounded-full"
          type="submit"
        >
          {isLoading ? (
            <ImSpinner9 className="animate-spin my-1 mx-4" />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default Promotion;
