import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, Option, Select } from "@material-tailwind/react";
import { FaRegCircleXmark } from "react-icons/fa6";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";
import { FaSpinner } from "react-icons/fa";
import { useAddSubCategoryMutation } from "../../../store/service/subCategory/subCategoryApiService";
import { useGetMainSubjectQuery } from "../../../store/service/mainSubject/mainSubjectApiService";
import { useGetAllCategoryQuery } from "../../../store/service/category/categoryApiservice";
import MaterialSelectInput from "../../../components/Shared/Form/MaterialSelectInput";

const AddSubCategory = ({ modalOpen, setModalOpen }) => {
  // subcategory Image
  const [imageShow, setImageShow] = useState("");
  // main subject data
  const { data: mainSubjectInfo, isLoading: subCategoryLoading } =
    useGetMainSubjectQuery();
  const mainSubjectData = mainSubjectInfo?.data || [];

  // category data
  const { data: categoryInfo, isLoading: categoryLoading } =
    useGetAllCategoryQuery();
  const allCategories = categoryInfo?.data || [];

  // add subcategory
  const [addSubCategory, { isLoading }] = useAddSubCategoryMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  // from data
  const onSubmit = async (data) => {
    //   image
    const subCategoryImage = data?.post_image[0];
    // name
    const name = data?.name;
    const formData = new FormData();
    const categoryId = data?.id;
    formData.append("name", name);
    formData.append("subCategoryImage", subCategoryImage);
    formData.append("categoryId", categoryId);
    //   addCategory result
    const result = await addSubCategory(formData);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setModalOpen(false);
      reset();
    } else {
      toast.error(result?.error?.data?.message);
    }
  };
  // handle close modal
  const handleClose = () => {
    setModalOpen(!modalOpen);
  };
  // show image after changing
  const post_image = watch("post_image");
  useEffect(() => {
    if (post_image?.length > 0) {
      setImageShow(URL.createObjectURL(post_image[0]));
    }
  }, [watch, post_image]);
  return (
    <div
      className={`fixed top-0 left-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%)] max-h-full backdrop-blur-sm ${
        modalOpen ? "block" : "hidden"
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
                  Add Sub Category
                </h1>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-md mx-auto p-4 border rounded-md mt-5 bg-white text-black"
              >
                {/* category */}
                <div>
                  <MaterialSelectInput
                    error={errors?.category}
                    label={" Category Name"}
                    register={register}
                    selectName={"id"}
                    errorMessage={"Post Type is required"}
                    setValue={setValue}
                  >
                    {allCategories?.map((item) => (
                      <Option key={item?._id} value={item?.categoryId}>
                        {item?.name}
                      </Option>
                    ))}
                  </MaterialSelectInput>
                </div>
                {/* subcategory */}
               
                <div>
                  <MaterialSelectInput
                    error={errors?.category}
                    label={" Sub Category Name"}
                    register={register}
                    selectName={"name"}
                    errorMessage={"Post Type is required"}
                    setValue={setValue}
                  >
                    {mainSubjectData?.map((item) => (
                      <Option key={item?._id} value={item?.name}>
                        {item?.name}
                      </Option>
                    ))}
                  </MaterialSelectInput>
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

export default AddSubCategory;
