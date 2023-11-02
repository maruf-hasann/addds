import React from "react";
import { useForm } from "react-hook-form";

import { PhoneNumberInput } from "../PhoneNumberInput";

const PersonalInfo = ({ setActiveTab }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    setActiveTab(2);
    console.log(data);
  };

  return (
    <div className="p-10">
      <div className="text-2xl font-medium mb-3">Personal Information</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="lg:w-1/2"></div>

        <div className="lg:flex gap-5">
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Full Name
            </label>
            <input
              defaultValue={"Full name"}
              type="text"
              {...register("name", { required: "Name is required" })}
              className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Full Name"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Gender Selection
            </label>
            <select
              {...register("gender")}
              className="bg-gray-50 mb-6 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="lg:flex gap-5 my-10">
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Select Country
            </label>
            <select
              className="bg-gray-50 mb-6 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("country")}
            >
              <option value="bangladesh">Bangladesh</option>
              <option value="canada">Canada</option>
              <option value="usa">USA</option>
            </select>
          </div>
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Select City
            </label>
            <select
              className="bg-gray-50 mb-6 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("city")}
            >
              <option value="dhaka">Dhaka</option>
              <option value="sylhet">Sylhet</option>
              <option value="khulna">Khulna</option>
            </select>
          </div>
        </div>
        <div className="lg:flex gap-5 my-10">
          <div className="w-full relative">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Phone Number
            </label>

            <PhoneNumberInput />
          </div>
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              readOnly
              title="Email can't be changed"
              defaultValue={"info@gmail.com"}
              {...register("email", { required: "Email is required" })}
              className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="info@gmail.com"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="w-full">
          <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
            Home Address
          </label>
          <input
            type="text"
            defaultValue={"address 1"}
            {...register("address", { required: "Address is required" })}
            className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Home Address"
          />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
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

export default PersonalInfo;
