import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AcademicInfo = ({setActiveTab}) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [selected, setSelected] = useState("");
  const handleSelect = (e) => {
    setSelected(id);
    console.log(e.target.value);
  };
  console.log(selected);
  const onSubmit = (data) => {
    console.log(data);
    setActiveTab(4)
    // router.push('apply?section=Experience')
  };

  return (
    <div className="p-10">
      <div className="text-2xl font-medium mb-3">Academic Information</div>
      {/* <p className=' mb-5'>Thank you for your interest in tutoring! By filling out this application you're just a few steps away from supporting learners.</p> */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Education Variant
            </label>
            <select
              onChange={handleSelect}
              className="bg-gray-50 mb-6 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("variant")}
            >
              <option onClick={() => console.log("english")} value="english">
                English Medium
              </option>
              <option onClick={() => console.log("bangla")} value="bangla">
                Bangla Medium
              </option>
            </select>
          </div>
          <div className={`w-full`}>
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              School Name
            </label>
            <select
              className="bg-gray-50 mb-6 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("country")}
            >
              <option value="english">English Medium School</option>
              <option value="bangla">Bangla Medium School</option>
            </select>
          </div>

          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              O Level Curriculum Board
            </label>
            <input
              type="text"
              {...register("oLevel")}
              className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="O Level Curriculum Board"
              required
            />
          </div>
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Result
            </label>
            <input
              type="text"
              {...register("oLevelResult")}
              className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Result"
              required
            />
          </div>
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              A Level Curriculum Board
            </label>
            <input
              type="text"
              {...register("aLevelResult")}
              className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="O Level Curriculum Board"
              required
            />
          </div>
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Result
            </label>
            <input
              type="text"
              {...register("lastName")}
              className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Result"
              required
            />
          </div>

          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              University Name
            </label>
            <select
              className="bg-gray-50 mb-6 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("country")}
            >
              <option value="english">English Medium School</option>
              <option value="bangla">Bangla Medium School</option>
            </select>
          </div>
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              University Subject
            </label>
            <select
              className="bg-gray-50 mb-6 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("country")}
            >
              <option value="english">English</option>
              <option value="bangla">Bangla</option>
              <option value="economics">Economics</option>
            </select>
          </div>

          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Semester or Year
            </label>
            <input
              type="number"
              {...register("Semester or Year")}
              className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Semester or Year"
              required
            />
          </div>
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Current Affairs
            </label>
            <input
              type="text"
              {...register("lastName")}
              className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Current Affairs"
              required
            />
          </div>
        </div>
        <button
          className="bg-blue-500 text-white py-2 mt-5 px-5 rounded-full"
          type="submit"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default AcademicInfo;
