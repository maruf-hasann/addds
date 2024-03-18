import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdPermMedia } from "react-icons/md";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { Button, Option, Select } from "@material-tailwind/react";
import JoditReact from "../../Jodit/JoditReact";
import { categoryData } from "../../../data/learningCategoryData";
import Media from "../../Shared/Media/Media";
import BeforeSelectMedia from "../../Shared/Media/BeforeSelectMedia";
import AfterSelectPhoto from "../../Shared/Media/AfterSelectPhoto";
import AfterSelectVideo from "../../Shared/Media/AfterSelectVideo";
import { useAddLearningProgramMutation } from "../../../store/service/learningProgram/learningProgramApiService";

const AddProgramForm = ({ setModalOpen }) => {
  // jodit content
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isPublished, setIsPublished] = useState({
    facebook: false,
    instagram: false,
    tiktok: false,
    youtube: false,
  });
  //  redux api
  const [addLearningProgram, { isLoading }] = useAddLearningProgramMutation();
  // category
  const data = categoryData;
  /* React hook form */
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm();

  //   handle add media
  const handleAddMedia = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents further propagation of the current event.

    let files;
    if (e.type === "drop" || e.type === "dragover") {
      files = e.dataTransfer.files;
    } else {
      files = e.target.files;
    }

    if (files.length > 0) {
      const selectedMedia = files[0];
      const mediaUrl = URL.createObjectURL(selectedMedia);

      const mediaType = selectedMedia.type; // Get the MIME type

      if (mediaType.startsWith("image/")) {
        setMediaType("image");
        const reader = new FileReader();
        reader.onload = () => {
          setMediaPreview(reader.result);
        };
        reader.readAsDataURL(selectedMedia);
        setIsDraggingOver(false);
      } else if (mediaType.startsWith("video/")) {
        setMediaType("video");
        setMediaPreview(mediaUrl);
        setIsDraggingOver(false);
      }
      setMedia(selectedMedia);
    }
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  // from data
  const onSubmit = async (data) => {
   
    let number = "8801711223344";

    if (media) {
      const formData = new FormData();

      formData.append("title", data?.title);
      formData.append("phoneNumber", number);
      formData.append("description", content);
      formData.append("batchNo", data?.batchNo);
      formData.append("programCategory", data?.programCategory);
      formData.append("sessionNote", data?.sessionNote);
      formData.append("startingTime", data?.startingTime);
      formData.append("scheduleTime", data?.scheduleTime);
      formData.append("media", media);
      formData.append("mediaType", mediaType);
      formData.append("externalInfoUrl", data?.externalInfoUrl);
      const result = await addLearningProgram(formData);

      if (result?.data?.success) {
        toast.success(result?.data?.message);
        setModalOpen(false)
      } else {
        toast.error(result?.error?.data?.message);
      }
    } else {
      toast.error("Please Select Media");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-3 my-4">
          {/* program category */}
          <div>
            <label
              htmlFor="className"
              className="block mb-2  font-semibold text-sm text-gray-900"
            >
              Category Name
            </label>

            <div>
              <Controller
                name="programCategory"
                control={control}
                defaultValue=""
                rules={{
                  required: "Category Name is required",
                }}
                render={({ field, fieldState }) => (
                  <Select
                    label="Select Category"
                    error={fieldState.error?.message}
                    {...field}
                  >
                    {data?.map((item) => (
                      <Option key={item?.id} value={item?.value}>
                        {item?.name}
                      </Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            <p className="text-pinkRed text-[12px] mt-1">
              {errors.name?.message}
            </p>
          </div>
          {/* batch number */}
          <div className="w-full">
            <label className="block  mb-2 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Batch No
            </label>
            <input
              type="text"
              {...register("batchNo", {
                required: " Batch Number is required",
              })}
              className="w-full p-2  text-black border rounded-md outline-none outline focus:outline-primaryAlfa-50"
              placeholder="Progamoy Quran for all"
            />
            {errors.batchNo && (
              <p className="text-red-500 text-[12px] absolute">
                {errors?.batchNo?.message}
              </p>
            )}
          </div>
        </div>
        {/* time and schedule */}
        <div className="grid md:grid-cols-2 gap-3 my-4">
          <div className="w-full">
            <label className="block mb-2 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Starring day & date
            </label>
            <input
              type="date"
              className="w-full p-2  text-black border rounded-md outline-none outline focus:outline-primaryAlfa-50"
              {...register("startingTime", {
                required: "Starting date is required",
              })}
            />
            {errors.startingTime && (
              <p className="text-red-500 text-[12px] absolute">
                {errors?.startingTime?.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Schedule
            </label>
            <input
              type="time"
              className="w-full p-2  text-black border rounded-md outline-none outline focus:outline-primaryAlfa-50"
              {...register("scheduleTime", {
                required: " Schedule time is required",
              })}
            />
            {errors.scheduleTime && (
              <p className="text-red-500 text-[12px] absolute">
                {errors?.scheduleTime?.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3 my-4">
          {/* note*/}
          <div className="w-full">
            <label className="block mb-2 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Session Note
            </label>
            <input
              type="text"
              {...register("sessionNote", {
                required: " Note is required",
              })}
              className="w-full p-2  text-black border rounded-md outline-none outline focus:outline-primaryAlfa-50"
              placeholder="Sura 45 - 70 l Para-5 l Ayat 125 -215 l Ruku 45 - 65"
            />
            {errors.sessionNote && (
              <p className="text-red-500 text-[12px] absolute">
                {errors?.sessionNote?.message}
              </p>
            )}
          </div>

          <div className="w-full ">
            <label className="block mb-2 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Channel YouTube URL
            </label>
            <input
              type="url"
              {...register("externalInfoUrl", {
                required: " Url is required",
              })}
              className="w-full p-2  text-black border rounded-md outline-none outline focus:outline-primaryAlfa-50"
              placeholder="https://www.youtube.com/watch?v=cDdGGthGA6M"
            />
            {errors.externalInfoUrl && (
              <p className="text-red-500 text-[12px] absolute">
                {errors?.externalInfoUrl?.message}
              </p>
            )}
          </div>
        </div>

        {/* title */}
        <div className="w-full my-4">
          <label className="block mb-2 text-sm font-semibold outline-none text-gray-900 dark:text-white">
            Title
          </label>
          <input
            type="text"
            {...register("title", {
              required: " Title is required",
            })}
            className="w-full p-2  text-black border rounded-md outline-none outline focus:outline-primaryAlfa-50"
            placeholder="Progamoy Quran for all"
          />
          {errors.title && (
            <p className="text-red-500 text-[12px]  absolute">
              {errors?.title?.message}
            </p>
          )}
        </div>
        {/* description */}
        <div className="mb-6 text-black">
          <label className="block mb-2 font-semibold text-sm ">
            Description
          </label>
          <JoditReact content={content} setContent={setContent} />
        </div>

        {media && mediaPreview && (
          <Media
            mediaPreview={mediaPreview}
            mediaType={mediaType}
            setIsPublished={setIsPublished}
            setMedia={setMedia}
            setMediaPreview={setMediaPreview}
            setMediaType={setMediaType}
            setThumbnail={setThumbnail}
            setThumbnailPreview={setThumbnailPreview}
          />
        )}
        {/* media and button */}

        <div className="mt-4 mb-5 flex justify-between items-center">
          <div className="flex items-center gap-5 text-2xl text-gray-600 ms-2">
            {!media && !mediaPreview && (
              <div
                onClick={() => setMediaModalOpen(true)}
                className="cursor-pointer hover:text-primary grid grid-cols-1 items-center justify-center"
                title="Add Media"
              >
                <MdPermMedia className="mx-auto mb-1" />{" "}
                <p className="text-sm">Add Media</p>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-offset-2 focus:border-blue-300"
          >
            {isLoading ? (
              <ImSpinner9 className="animate-spin my-1 mx-2.5" />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
      {!mediaType && mediaModalOpen && (
        <BeforeSelectMedia
          handleDragEnter={handleDragEnter}
          handleDragLeave={handleDragLeave}
          isDraggingOver={isDraggingOver}
          isOpen={mediaModalOpen}
          setIsOpen={setMediaModalOpen}
          handleAddMedia={handleAddMedia}
        />
      )}

      {mediaType && mediaType === "image" && (
        <AfterSelectPhoto
          imagePreview={mediaPreview}
          setImagePreview={setMediaPreview}
          setImage={setMedia}
          isPublished={isPublished}
          setIsPublished={setIsPublished}
          setMediaType={setMediaType}
          isOpen={mediaModalOpen}
          setIsOpen={setMediaModalOpen}
        />
      )}

      {mediaType && mediaType === "video" && (
        <AfterSelectVideo
          videoPreview={mediaPreview}
          isPublished={isPublished}
          setIsPublished={setIsPublished}
          setThumbnail={setThumbnail}
          setThumbnailPreview={setThumbnailPreview}
          thumbnail={thumbnail}
          thumbnailPreview={thumbnailPreview}
          isOpen={mediaModalOpen}
          setIsOpen={setMediaModalOpen}
          setVideo={setMedia}
          setVideoPreview={setMediaPreview}
          setMediaType={setMediaType}
        />
      )}
    </>
  );
};

export default AddProgramForm;
