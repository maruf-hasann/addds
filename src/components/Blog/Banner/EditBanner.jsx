import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRegCircleXmark } from "react-icons/fa6";
import { IoIosClose, IoIosInformationCircleOutline } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useUpdateBannerMutation } from "../../../store/service/banner/bannerApiService";
import { FaSpinner } from "react-icons/fa";

const EditBanner = ({
  setUpdateModal,
  updateModal,
  updateData,
  setUpdateStatus,
}) => {
  const [imageShow, setImageShow] = useState("");
  const id = updateData?._id;

  // redux api
  const [updateBanner, { isLoading }] = useUpdateBannerMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  // position
  const position = [
    {
      id: 1,
      position: "First",
    },
    {
      id: 2,
      position: "Second",
    },
  ];
  // from data
  const onSubmit = async (data) => {
    //   image
    const bannerImage = data?.post_image[0];

    const formData = new FormData();
    formData.append("bannerImage", bannerImage);

    const result = await updateBanner({ id, formData });
    const upDatedImage = result?.data?.data?.image

    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setUpdateStatus(upDatedImage);
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
      position: updateData?.position,
    });
    setImageShow(updateData?.image);
  }, [reset]);
  // show image after changing
  const post_image = watch("post_image");
  useEffect(() => {
    if (post_image?.length > 0) {
      setImageShow(URL.createObjectURL(post_image[0]));
    }
  }, [watch, post_image]);

  return (
    <div
      className={`fixed top-0 left-0 z-50 p-4  overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%)] max-h-full backdrop-blur-sm ${
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
          <div className="pb-6">
            <div className="pt-4">
              <div className="flex justify-between items-center mb-5">
                <h1 className="font-bold text-blue-gray-800">Update Banner</h1>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-md mx-auto p-4  border rounded-md mt-5 bg-white text-black"
            >
              <div className=" md:w-[330px]  ">
                <label
                  htmlFor="title"
                  className="block mb-2 font-semibold text-sm text-gray-500"
                >
                  Position
                </label>

                <select
                  id="position"
                  className="w-full text-black p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
                  {...register("position", {
                    required: "position are required!",
                  })}
                >
                  {position?.map((item) => (
                    <option key={item?.id} value={item?.id}>
                      {item?.position}
                    </option>
                  ))}
                </select>
                {errors?.category && (
                  <small className="text-red-500 text-xs font-medium my-2">
                    {errors?.position?.message}
                  </small>
                )}
              </div>
              {/* warn */}
              <div className="mb-2">
                <strong className="text-[14px] font-semibold flex  items-center gap-2">
                  <IoIosInformationCircleOutline /> First (818×210)
                </strong>
                <strong className="text-[14px] font-semibold flex  items-center gap-2">
                  <IoIosInformationCircleOutline /> Second (1239×205)
                </strong>
              </div>
              {/* Image */}
              <div className="cursor-pointer w-full">
                {imageShow ? (
                  <>
                    <div
                      className="flex  relative left-80 cursor-pointer p-[2px] rounded-full"
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
                          <img className="h-auto w-[320px]" src={imageShow} />
                        </div>
                      ) : (
                        <>
                          <div className="w-[320px]">
                            <div className="text-center">
                              <IoCloudUploadOutline
                                size={50}
                                className={`inline-block ${
                                  errors.post_image ? " text-red" : "text-gray"
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

              <div className="flex mt-4 ">
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
        </div>
      </div>
    </div>
  );
};

export default EditBanner;
