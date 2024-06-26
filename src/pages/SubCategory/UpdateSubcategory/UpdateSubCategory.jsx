import React, { useEffect, useState } from "react";
import { Button, Option, Select } from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import { BsImage } from "react-icons/bs";
import { FaRegCircleXmark } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { useUpdateSubCategoryMutation } from "../../../store/service/subCategory/subCategoryApiService";
import { useGetMainSubjectQuery } from "../../../store/service/mainSubject/mainSubjectApiService";
import { useGetAllCategoryQuery } from "../../../store/service/category/categoryApiservice";

const UpdateSubCategory = ({ updateModal, setUpdateModal, updateData }) => {
  // Sub category Id
  const id = updateData?._id;
  // sub category Image
  const [imageShow, setImageShow] = useState("");
  // redux api
  // main subject data
  const { data: mainSubjectInfo, isLoading: subCategoryLoading } =
    useGetMainSubjectQuery();
  const mainSubjectData = mainSubjectInfo?.data || [];

  // category data
  const { data: categoryInfo, isLoading: categoryLoading } =
    useGetAllCategoryQuery();

  const allCategories = categoryInfo?.data || [];
  // update sub category
  const [updateSubCategory, { isLoading }] = useUpdateSubCategoryMutation(id);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();
  // show image after changing
  const post_image = watch("post_image");
  useEffect(() => {
    if (post_image?.length > 0) {
      setImageShow(URL.createObjectURL(post_image[0]));
    }
  }, [watch, post_image]);
  // from data
  const onSubmit = async (data) => {
    //   image
    const subCategoryImage = data?.post_image[0];
    // name
    const name = data?.name;
    const categoryId = data?.id;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("subCategoryImage", subCategoryImage);
    formData.append("categoryId", categoryId);

    //   addCategory result
    const result = await updateSubCategory({ formData, id });

    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setUpdateModal(false);
    } else {
      toast.error(result?.error?.data?.message);
    }
  };
  // handle close modal
  const handleClose = () => {
    setUpdateModal(!updateModal);
  };
  // reset value
  useEffect(() => {
    reset({
      name: updateData?.name,
      id: updateData?.category?.categoryId,
    });
    setImageShow(updateData?.imageURL);
  }, [reset]);

  return (
    <div
      className={`fixed top-0 left-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%)] max-h-full backdrop-blur-sm ${
        updateModal ? "block" : "hidden"
      }`}
    >
      <div
        className="w-full h-full z-0 absolute top-0 left-0"
        onClick={handleClose}
      ></div>

      <div className="relative z-50 w-full max-w-5xl  max-h-full mt-[20vh] mx-auto px-2 md:w-1/2 lg:w-1/3 md:px-0">
        <div
          className={`relative  rounded-lg shadow text-primary px-10 bg-white`}
        >
          {/* modal close button */}
          <button
            onClick={handleClose}
            type="button"
            className="absolute top-3 right-2.5  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <FaRegCircleXmark className="text-3xl text-red-400 hover:text-red-500" />
          </button>
          <>
            <div className="py-10">
              <div className="flex justify-between items-center mb-5">
                <h1 className="font-bold text-blue-gray-800">
                  Update Sub Category
                </h1>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-md mx-auto p-4 border rounded-md mt-5 bg-white text-black"
              >
                {/* category */}
                <div>
                  <label
                    htmlFor="className"
                    className="block mb-2 font-semibold text-sm text-gray-500"
                  >
                    Category Name
                  </label>

                  <div className="my-3">
                    <Controller
                      name="id"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Category is required",
                      }}
                      render={({ field, fieldState }) => (
                        <Select
                          label="Select Category"
                          error={fieldState.error?.message}
                          {...field}
                        >
                          {allCategories?.map((item) => (
                            <Option key={item?._id} value={item?.categoryId}>
                              {item?.name}
                            </Option>
                          ))}
                        </Select>
                      )}
                    />
                  </div>
                  <p className="text-pinkRed text-xs mt-1">
                    {errors.name?.message}
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="className"
                    className="block mb-2 font-semibold text-sm text-gray-500"
                  >
                    Sub Category Name
                  </label>

                  <div className="my-3">
                    <Controller
                      name="name"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Sub Category is required",
                      }}
                      render={({ field, fieldState }) => (
                        <Select
                          label="Select Sub Category"
                          error={fieldState.error?.message}
                          {...field}
                        >
                          {mainSubjectData?.map((item) => (
                            <Option key={item?._id} value={item?.name}>
                              {item?.name}
                            </Option>
                          ))}
                        </Select>
                      )}
                    />
                  </div>
                  <p className="text-pinkRed text-xs mt-1">
                    {errors.name?.message}
                  </p>
                </div>

                {/* Image */}
                <div className="cursor-pointer ">
                  {imageShow ? (
                    <>
                      <div
                        className="flex  relative left-52 cursor-pointer p-[2px] rounded-full"
                        onClick={() => setImageShow("")}
                      >
                        <IoIosClose size={24} />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  <div className="inline-block border-[1px] border-border p-1 rounded-md">
                    <label
                      htmlFor="post_image"
                      className={`flex flex-col items-center justify-center    cursor-pointer ${
                        errors.post_image ? " border-red" : ""
                      }`}
                    >
                      <>
                        {imageShow ? (
                          <div className="relative">
                            <img
                              className="h-[92px] w-[200px] object-cover"
                              src={imageShow}
                            />
                          </div>
                        ) : (
                          <>
                            <div className="w-[200px] h-[92px]">
                              <div className="text-center">
                                <IoCloudUploadOutline
                                  size={50}
                                  className={`inline-block ${
                                    errors.post_image
                                      ? " text-red"
                                      : "text-gray"
                                  }`}
                                />
                              </div>
                              <div className="text-center mb-2">
                                <h2 className="mb-2">Upload Image </h2>
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    </label>
                    <input
                      id="post_image"
                      type="file"
                      required=""
                      accept="image/*"
                      {...register("post_image")}
                      name="post_image"
                      className="hidden"
                    />
                  </div>
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
              </form>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default UpdateSubCategory;
