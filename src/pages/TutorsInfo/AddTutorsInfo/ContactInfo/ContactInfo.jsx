import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { PhoneNumberInput } from "../PhoneNumberInput";

const ContactInfo = ({setActiveTab}) => {
  const [value, setValue] = useState();
  const [submit, setSubmit] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    data.phone = value;
    console.log(data);
    setActiveTab(3)
    // router.push('apply?section=r')
  };

  useEffect(() => {
    {
      value && isValidPhoneNumber(value) ? setSubmit(true) : setSubmit(false);
    }
    // console.log(value?.length)
    if (submit && value?.length < 14) {
      setPhoneError(true);
    }
  }, [value, submit]);

  return (
    <div className="p-10">
      <div className="text-2xl font-medium mb-3">Contact Information</div>
      <p className=" mb-5">
        Thank you for your interest in tutoring! By filling out this application
        you&apos;re just a few steps away from supporting learners.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="lg:flex gap-5">
          <div className="w-full relative">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Phone Number
            </label>
            <PhoneNumberInput />
          </div>
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Tutor's Facebook ID URL
            </label>
            <input
              type="url"
              {...register("facebook", {
                pattern: /^(ftp|http|https):\/\/[^ "]+$/,
              })}
              className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="https://www.facebook.com"
            />
            {errors.facebook && (
              <p className="text-red-500">{errors.facebook.message}</p>
            )}
          </div>
        </div>

        <div className="lg:flex gap-5 my-10">
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Emergency Contact Person Name
            </label>
            <input
              type="text"
              {...register("relativeName", { required: "Name is required" })}
              className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Relative Name"
            />
            {errors.relativeName && (
              <p className="text-red-500">{errors.relativeName.message}</p>
            )}
          </div>
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Relation
            </label>
            <select
              {...register("relation")}
              className="bg-gray-50 mb-6 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="male">Father</option>
              <option value="female">Mother</option>
              <option value="other">Brother</option>
              <option value="other">Sister</option>
            </select>
          </div>
        </div>
        <div className="lg:flex gap-5 my-10">
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Tutor's Online Google Meets Link
            </label>
            <input
              type="url"
              {...register("meet", {
                pattern: /^(ftp|http|https):\/\/[^ "]+$/,
              })}
              className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="https://meet.google.com/"
            />
            {errors.meet && (
              <p className="text-red-500">{errors.meet.message}</p>
            )}
          </div>
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Set your convenient time to interview
            </label>
            <input
              type="datetime-local"
              {...register("time", { required: "Time is required" })}
              className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Relative Name"
            />
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

export default ContactInfo;
