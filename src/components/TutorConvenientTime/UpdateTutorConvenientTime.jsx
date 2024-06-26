import React, { useEffect, useState } from "react";
import { Button,  } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRegCircleXmark } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";
import { useUpdateTutorConvenientTimeMutation } from "../../store/service/tutorConvenient/tutorConvenientTimeApiService";


const UpdateTutorConvenientTime = ({
  updateModal,
  setUpdateModal,
  updateData,
}) => {
  const id = updateData?._id

  // redux api
  const [updateTutorConvenientTime,{isLoading}] = useUpdateTutorConvenientTimeMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // from data
  const onSubmit = async (data) => {
    const submitData = {
      timer: data?.time
    };
    
    const result = await updateTutorConvenientTime({ submitData, id });

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
      time: updateData?.timer,
    });
   
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
                  Update Convenient Time
                </h1>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-md mx-auto p-4 border rounded-md mt-5 bg-white text-black"
              >
                <div className="mb-2">
                  <label
                    htmlFor="title"
                    className="block mb-2 font-semibold text-sm text-gray-500"
                  >
                    Convenient Time
                  </label>
                  <input
                    {...register("time")}
                    type="text"
                    id="time"
                    name="time"
                    className="w-full p-2 mb-4 text-black border rounded-md outline-none focus:outline-primaryAlfa-50"
                    placeholder="In Late Night"
                  />
                  <small className="text-red-500 text-xs font-medium my-2">
                    {errors?.time?.message}
                  </small>
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

export default UpdateTutorConvenientTime;
