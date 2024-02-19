import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";

import { commonSelectClassName } from "../../../../../libs/commonSelectClassName";
import { commonInputClassName } from "../../../../../libs/commonInputClassName";
import { convertToAMPM } from "../../../../../libs/convertTimeToAMPM";
import { useCreateCoachingScheduleMutation } from "../../../../../store/service/tutorInfo/coaching/coachingSchedule/coachingScheduleApiService";

const AddSchedule = ({ isOpen, setIsOpen, coaching }) => {
  const [isLoading, setIsLoading] = useState(false);
  const days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const [createSchedule] = useCreateCoachingScheduleMutation();

  //   handle close
  const closeModal = () => {
    const userConfirmed = window.confirm("Are you sure you want to cancel?");

    if (userConfirmed) {
      setIsOpen(false);
    }
  };

  const handleAddSchedule = async (data) => {
    setIsLoading(true);
    data.startTime = convertToAMPM(data?.startTime);
    data.endTime = convertToAMPM(data?.endTime);
    data.day = data?.day?.toLowerCase();

    const result = await createSchedule({
      phoneNumber: coaching?.phoneNumber,
      coachingId: coaching?.coachingId,
      ...data,
    });

    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setIsOpen(false);
      reset();
    } else {
      toast.error(result?.error?.data?.message);
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } transition-opacity duration-300 ease-in-out flex items-center justify-center z-50`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div
        className="bg-white rounded-md z-10  max-w-[600px] w-full relative mx-1 overflow-y-auto"
        style={{ maxHeight: "460px" }}
      >
        <div className="px-4 py-3 border-b sticky top-0 z-50 backdrop-filter backdrop-blur-sm">
          <div className="overflow-hidden">
            <p className="font-semibold">{coaching?.title}</p>
          </div>
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 text-gray-500 text-2xl hover:text-red-500"
          >
            <RxCross2 />
          </button>
        </div>
        <div className="px-4 pt-4 pb-2">
          <form onSubmit={handleSubmit(handleAddSchedule)}>
            <div className="mb-10">
              <label className="block mb-2 text-sm font-semibold outline-none text-gray-700 dark:text-white">
                Schedule Day*
              </label>
              <select
                className={commonSelectClassName}
                {...register("day", {
                  required: "Schedule day is required",
                })}
                defaultValue={""}
              >
                <option value={""} disabled>
                  Select Day
                </option>
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              {errors.day && (
                <p className="text-red-500 text-sm absolute">
                  {errors?.day?.message}
                </p>
              )}
            </div>

            <div className="mb-10">
              <label className="block mb-2 text-sm font-semibold outline-none text-gray-700 dark:text-white">
                Slot Title*
              </label>
              <input
                className={commonInputClassName}
                {...register("slotTitle", {
                  required: "Slot title is required",
                })}
                placeholder="Bangla"
              />

              {errors.slotTitle && (
                <p className="text-red-500 text-sm absolute">
                  {errors?.slotTitle?.message}
                </p>
              )}
            </div>

            <div className="mb-10 grid grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 text-sm font-semibold outline-none text-gray-700 dark:text-white">
                  Start Time*
                </label>
                <input
                  type="time"
                  className={commonInputClassName}
                  {...register("startTime", {
                    required: "Start time is required",
                  })}
                />

                {errors.startTime && (
                  <p className="text-red-500 text-sm absolute">
                    {errors?.startTime?.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold outline-none text-gray-700 dark:text-white">
                  End Time*
                </label>
                <input
                  type="time"
                  className={commonInputClassName}
                  {...register("endTime", {
                    required: "End time is required",
                  })}
                />

                {errors.endTime && (
                  <p className="text-red-500 text-sm absolute">
                    {errors?.endTime?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-10 mb-5 flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                {isLoading ? (
                  <ImSpinner9 className="animate-spin my-1 mx-4" />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSchedule;
