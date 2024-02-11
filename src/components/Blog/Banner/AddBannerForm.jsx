import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosClose } from "react-icons/io";
import { Button } from "@material-tailwind/react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa6";
import { useAddBannerMutation } from "../../../store/service/banner/bannerApiService";

const AddBannerForm = ({ setModalOpen }) => {
  const [imageShow, setImageShow] = useState("");
  //    redux api
  const [addBanner, { isLoading }] = useAddBannerMutation();

  const {
    register,
    handleSubmit,
    watch,
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

  // submit blogs
  const blogSubmit = async (data) => {
    //   image
    const bannerImage = data?.post_image[0];
    const position = data?.position;
    const formData = new FormData();
    formData.append("bannerImage", bannerImage);
    formData.append("position", position);

    const result = await addBanner(formData);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setModalOpen(false);
      reset();
    } else {
      toast.error(result?.error?.data?.message);
    }
  };
  // show image after changing
  const post_image = watch("post_image");
  useEffect(() => {
    if (post_image?.length > 0) {
      setImageShow(URL.createObjectURL(post_image[0]));
    }
  }, [watch, post_image]);
  return (
    <form
      onSubmit={handleSubmit(blogSubmit)}
      className="w-full mx-auto p-4 border rounded-md mt-5 bg-white"
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
      <div className="flex mt-5">
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
  );
};

export default AddBannerForm;
