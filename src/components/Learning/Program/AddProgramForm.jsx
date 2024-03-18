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
  const [state, setState] = useState({
    content: "",
    media: null,
    mediaPreview: null,
    mediaType: null,
    mediaModalOpen: false,
    isDraggingOver: false,
    thumbnail: null,
    thumbnailPreview: null,
    isPublished: {
      facebook: false,
      instagram: false,
      tiktok: false,
      youtube: false,
    },
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
  const handleAddMedia = async (e) => {
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
      const mediaTypes = selectedMedia.type; // Get the MIME type

      const maxSizeImage = 5 * 1024 * 1024; // 5MB in bytes
      const maxSizeVideo = 100 * 1024 * 1024; // 100MB in bytes
      if (
        mediaTypes.startsWith("image/") &&
        selectedMedia.size <= maxSizeImage &&
        selectedMedia.type === "image/jpeg"
      ) {
        setState({
          ...state,
          media: selectedMedia,
          mediaPreview: mediaUrl,
          mediaType: "image",
        });
      } else if (
        mediaTypes.startsWith("video/") &&
        selectedMedia.size <= maxSizeVideo &&
        selectedMedia.type === "video/mp4"
      ) {
        setState({
          ...state,
          media: selectedMedia,
          mediaPreview: mediaUrl,
          mediaType: "video",
        });
      } else {
        toast.error(
          ` Invalid file format or size. Please upload a PNG image (max 5MB) or an MP4 video (max 100MB).`
        );
      }
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setState({
      ...state,
      isDraggingOver: true,
    });
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setState({
      ...state,
      isDraggingOver: false,
    });
  };

  // from data
  const onSubmit = async (data) => {
    let number = "8801711223344";

    if (state.media) {
      const formData = new FormData();
      formData.append("title", data?.title);
      formData.append("phoneNumber", number);
      formData.append("description", state.content);
      formData.append("batchNo", data?.batchNo);
      formData.append("programCategory", data?.programCategory);
      formData.append("sessionNote", data?.sessionNote);
      formData.append("startingTime", data?.startingTime);
      formData.append("scheduleTime", data?.scheduleTime);
      formData.append("media", state.media);
      formData.append("mediaType", state.mediaType);
      formData.append("externalInfoUrl", data?.externalInfoUrl);
      const result = await addLearningProgram(formData);

      if (result?.data?.success) {
        toast.success(result?.data?.message);
        setModalOpen(false);
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
        {/* note and url */}
        <div className="grid md:grid-cols-2 gap-3 my-4">
          {/* note */}
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

        <div>
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

          {/* Number*/}
          <div className="w-full my-4">
            <label className="block mb-2 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Number
            </label>
            <input
              type="text"
              className="w-full p-2  text-black border rounded-md outline-none outline focus:outline-primaryAlfa-50"
              placeholder="8801711223344"
              disabled
            />
          </div>
        </div>
        {/* description */}
        <div className="mb-6 text-black">
          <label className="block mb-2 font-semibold text-sm ">
            Description
          </label>
          <JoditReact content={state.content} setState={setState} />
        </div>

        {state.media && state.mediaPreview && (
          <Media
            mediaPreview={state.mediaPreview}
            mediaType={state.mediaType}
           setState={setState}
          />
        )}
        {/* media and button */}

        <div className="mt-4 mb-5 flex justify-between items-center">
          <div className="flex items-center gap-5 text-2xl text-gray-600 ms-2">
            {!state.media && !state.mediaPreview && (
              <div
                onClick={() =>
                  setState({
                    ...state,
                    mediaModalOpen: true,
                  })
                }
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
      {!state.mediaType && state.mediaModalOpen && (
        <BeforeSelectMedia
          handleDragEnter={handleDragEnter}
          handleDragLeave={handleDragLeave}
          isDraggingOver={state.isDraggingOver}
          isOpen={state.mediaModalOpen}
          setState={setState}
          handleAddMedia={handleAddMedia}
        />
      )}

      {state.mediaType && state.mediaType === "image" && (
        <AfterSelectPhoto
          imagePreview={state.mediaPreview}
          isPublished={state.isPublished}
          isOpen={state.mediaModalOpen}
          setState={setState}
        />
      )}

      {state.mediaType && state.mediaType === "video" && (
        <AfterSelectVideo
          videoPreview={state.mediaPreview}
          isOpen={state.mediaModalOpen}
          setState={setState}
        />
      )}
    </>
  );
};

export default AddProgramForm;
