import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { MdCloudUpload } from "react-icons/md";

const Promotion = ({setActiveTab}) => {
  const [variant, setVariant] = useState([]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    data.variant = variant;
    console.log(data);
    setActiveTab(1)
    // router.push('apply?section=r')
  };

  const handleAddPrimaryImage = async (e) => {
    e.preventDefault();
    let files;
    console.log(e.target.files[0]);
    if (e?.type === "drop" || e?.type === "dragover") {
      files = e.dataTransfer.files;
    } else {
      files = e.target.files;
    }

    if (files.length > 0) {
      console.log(files[0]);
    }
  };

  return (
    <div className="p-10">
      <div className="text-2xl font-medium mb-3">Promotion</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`w-full`}>
          <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
            Video Link
          </label>
          <input
            type="url"
            {...register("video")}
            className={`shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light `}
            placeholder="Select video"
          />
        </div>
        <div className={`w-full my-5`}>
          <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
            Your Personal Statement
          </label>
          <input
            type="textarea"
            {...register("location", { required: "Location is required" })}
            className={`shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light `}
            placeholder="A brief introduction. Why Schooling should hire you?"
          />
        </div>

        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer w-full"
          onDragOver={handleAddPrimaryImage}
          onDrop={handleAddPrimaryImage}
          onClick={() => {
            const fileInput = document.getElementById("primary-file-input");
            fileInput.click();
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleAddPrimaryImage(e);
            }}
            id="primary-file-input"
            className="hidden"
          />
          <div
            className={`grid grid-cols-1  items-center justify-center gap-5`}
          >
            <div className="text-gray-400 text-4xl mx-auto">
              <MdCloudUpload />
            </div>
            <p>
              Drag and drop an image here <br /> or <br /> click to select an
              image
            </p>
          </div>
        </div>

        <button
          className="bg-blue-500 text-white py-2 mt-5 px-5 rounded-full"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Promotion;
