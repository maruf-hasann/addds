import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { BsImage } from "react-icons/bs";
import { FaRegCircleXmark } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { useUpdateCategoryMutation } from "../../../store/service/category/categoryApiservice";
import toast from "react-hot-toast";

const UpdateCategory = ({ updateModal, setUpdateModal, updateData }) => {
  // category Id
  const id = updateData?._id;
  // category Image
  const [imageShow, setImageShow] = useState("");
  // update category
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation(id);

  const {
    register,
    handleSubmit,
    watch,
    reset,
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
    const categoryImage = data?.post_image[0];
    // name
    const name = data?.name;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("categoryImage", categoryImage);
    //   addCategory result
    const result = await updateCategory({ formData, id });
 
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
                  Update Category
                </h1>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-md mx-auto p-4 border rounded-md mt-5 bg-white"
              >
                {/* name area */}
                <div>
                  <label
                    htmlFor="className"
                    className="block mb-2 font-semibold text-sm text-gray-500"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="className"
                    name="className"
                    required
                    {...register("name")}
                    placeholder="Enter Category Name"
                    className="w-full p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
                  />
                  {errors.name?.type === "required" && (
                    <p role="alert" className="text-red-500 text-[14px]">
                      Category name is required
                    </p>
                  )}
                </div>
                {/* Image */}
                <div className="cursor-pointer">
                  {imageShow ? (
                    <>
                      <div
                        className="flex  relative left-20 cursor-pointer p-[2px] rounded-full"
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
                              className="h-[90px] w-[90px]"
                              src={imageShow}
                            />
                          </div>
                        ) : (
                          <>
                            <span>
                              <BsImage
                                size={50}
                                className={`${
                                  errors.post_image ? " text-red" : "text-gray"
                                }`}
                              />
                            </span>
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
                      Update
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

export default UpdateCategory;
