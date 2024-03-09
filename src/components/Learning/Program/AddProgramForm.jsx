import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdPermMedia } from "react-icons/md";
import { Button, Option, Select } from "@material-tailwind/react";
import JoditReact from "../../Jodit/JoditReact";
import { categoryData } from "../../../data/learningCategoryData";
const AddProgramForm = () => {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const isLoading = false;

  const data = categoryData;
  /* React hook form */
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm();

  // from data
  const onSubmit = async (data) => {};

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-3">
          {/* program category */}
          <div>
            <label
              htmlFor="className"
              className="block mb-2 font-semibold text-sm text-gray-900"
            >
              Category Name
            </label>

            <div className="my-3">
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: "Name is required",
                }}
                render={({ field, fieldState }) => (
                  <Select
                    label="Select Category"
                    error={fieldState.error?.message}
                    {...field}
                  >
                    {data?.map((item) => (
                      <Option key={item?.id} value={item?.name}>
                        {item?.name}
                      </Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            <p className="text-pinkRed text-xs mt-1">{errors.name?.message}</p>
          </div>
          {/* batch number */}
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Batch No
            </label>
            <input
              type="text"
              {...register("title", {
                required: " Title is required",
              })}
              className="w-full p-2 mb-4 text-black border rounded-md outline-none outline focus:outline-primaryAlfa-50"
              placeholder="Progamoy Quran for all"
            />
            {errors.title && (
              <p className="text-red-500 text-sm absolute">
                {errors?.title?.message}
              </p>
            )}
          </div>
        </div>
        {/* note start */}
        <div className="grid md:grid-cols-2 gap-3">
          {/* starting date */}
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Starting Day & Date
            </label>
            <input
              type="date"
              className="w-full p-2 mb-4 text-black border rounded-md outline-none outline focus:outline-primaryAlfa-50"
              {...register("startingDate", {
                required: "Starting date is required",
              })}
            />
            {errors.startingDate && (
              <p className="text-red-500 text-sm absolute">
                {errors?.startingDate?.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Starting Time
            </label>
            <input
              type="time"
              className="w-full p-2 mb-4 text-black border rounded-md outline-none outline focus:outline-primaryAlfa-50"
              {...register("startingDate", {
                required: "Starting date is required",
              })}
            />
            {errors.startingDate && (
              <p className="text-red-500 text-sm absolute">
                {errors?.startingDate?.message}
              </p>
            )}
          </div>
        </div>
        {/* time and schedule */}
        <div className="grid md:grid-cols-2 gap-3">
          {/* note*/}
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Session Note
            </label>
            <input
              type="text"
              {...register("note", {
                required: " Note is required",
              })}
              className="w-full p-2 mb-4 text-black border rounded-md outline-none outline focus:outline-primaryAlfa-50"
              placeholder="Sura 45 - 70 l Para-5 l Ayat 125 -215 l Ruku 45 - 65"
            />
            {errors.title && (
              <p className="text-red-500 text-sm absolute">
                {errors?.note?.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Schedule
            </label>
            <input
              type="time"
              className="w-full p-2 mb-4 text-black border rounded-md outline-none outline focus:outline-primaryAlfa-50"
              {...register("startingDate", {
                required: "Starting date is required",
              })}
            />
            {errors.startingDate && (
              <p className="text-red-500 text-sm absolute">
                {errors?.startingDate?.message}
              </p>
            )}
          </div>
        </div>
        {/* channel url */}
        <div>
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Channel YouTube URL
            </label>
            <input
              type="url"
              {...register("url", {
                required: " Url is required",
              })}
              className="w-full p-2 mb-4 text-black border rounded-md outline-none outline focus:outline-primaryAlfa-50"
              placeholder="https://www.youtube.com/watch?v=cDdGGthGA6M"
            />
            {errors.title && (
              <p className="text-red-500 text-sm absolute">
                {errors?.url?.message}
              </p>
            )}
          </div>
        </div>
        {/* title */}
        <div className="w-full">
          <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
            Title
          </label>
          <input
            type="text"
            {...register("title", {
              required: " Title is required",
            })}
            className="w-full p-2 mb-4 text-black border rounded-md outline-none outline focus:outline-primaryAlfa-50"
            placeholder="Progamoy Quran for all"
          />
          {errors.title && (
            <p className="text-red-500 text-sm absolute">
              {errors?.title?.message}
            </p>
          )}
        </div>
        {/* description */}
        <div className="mb-6 text-black">
          <label className="block mb-2 font-semibold text-sm text-gray-500">
            Description
          </label>
          <JoditReact content={content} setContent={setContent} />
        </div>
        {/* media and button */}
        <div className="grid grid-cols-2">
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

          <div className="flex justify-end">
            {isLoading ? (
              <Button
                disabled
                className="bg-white text-blue-gray-700 border py-2 px-[39px] rounded-sm font-semibold cursor-wait "
              >
                <FaSpinner className="animate-spin" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-white text-blue-gray-700 border py-2 px-8 rounded-sm font-semibold cursor-pointer"
              >
                Add
              </Button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default AddProgramForm;
