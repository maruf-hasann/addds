import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { useGetEducationVariantsQuery } from "../../../../store/service/educationVariant/educationVariantApiService";
import { useGetCurrentAffairsQuery } from "../../../../store/service/currentAffair/currentAffairApiService";
import { useGetUniversitiesQuery } from "../../../../store/service/university/universityApiService";
import { useGetSemestersQuery } from "../../../../store/service/semester/semesterApiService";
import { useSaveAcademicInfoMutation } from "../../../../store/service/tutorInfo/academicInfo/academicInfoApiService";
import { useEffect } from "react";

const AcademicInfo = () => {
  const [number, setNumber] = useState(null);
  const [numberError, setNumberError] = useState(false);

  const { data: allEducationVariantData } = useGetEducationVariantsQuery();
  const educationVariants = allEducationVariantData?.data;

  const { data: allCurrentAffairData } = useGetCurrentAffairsQuery();
  const currentAffairs = allCurrentAffairData?.data;

  const { data: allUniversityData } = useGetUniversitiesQuery();
  const universities = allUniversityData?.data;

  const { data: allSemesterData } = useGetSemestersQuery();
  const semesters = allSemesterData?.data;

  const [saveAcademicInfo, { isLoading }] = useSaveAcademicInfoMutation();

    // handle check valid number or not
    useEffect(() => {
      if (number && !isValidPhoneNumber(number) && number?.length < 14) {
        setNumberError(true);
      }
    }, [number]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const resultData = ["A+", "A", "A-", "B", "C", "D", "F"];

  const onSubmit = async (data) => {
    data.phoneNumber = number.substring(1);

    const result = await saveAcademicInfo(data);

    if (result.data) {
      toast.success(result.data.message);
      setNumber(null)
      reset()
    } else {
      toast.error(result.error?.data?.message);
    }
  };

  return (
    <div className="p-10">
      {/* number */}
      <div className="w-full relative mt-5 lg:mt-0 mb-10">
        <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
          Number
        </label>
        <PhoneInput
          className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full ps-2 flex  items-center gap-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          international
          countryCallingCodeEditable={true}
          defaultCountry="BD"
          value={number}
          onChange={setNumber}
        />

        {number && isValidPhoneNumber(number) ? (
          ""
        ) : (
          <p className={`text-red-500 ${!numberError && "hidden"}`}>
            Please enter a valid number
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {/* select education variant */}
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Education Variant
            </label>
            <select
              defaultValue={""}
              className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("educationVariant", {
                required: "Education Variant is Required",
              })}
            >
              <option disabled value="">
                Select Education Variant
              </option>
              {educationVariants?.map((variant, idx) => (
                <option
                  onClick={() => console.log(variant)}
                  key={idx}
                  
                  value={variant?.variantName}
                >
                  {variant?.variantName}
                </option>
              ))}
            </select>
            {errors.educationVariant ? (
              <p className="text-red-500">{errors.educationVariant.message}</p>
            ) : (
              ""
            )}
          </div>
          {/* school name */}
          <div className={`w-full`}>
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              School Name
            </label>
            <input
              type="text"
              {...register("schoolName", {
                required: "School name is Required",
              })}
            
              className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Enter your school name"
            />
            {errors.schoolName ? (
              <p className="text-red-500">{errors.schoolName.message}</p>
            ) : (
              ""
            )}
          </div>
          {/* university name */}
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              University Name
            </label>

            <select
              defaultValue={""}
              className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("universityName", {
                required: "University Name is Required",
              })}
            >
              <option disabled value="">
                Select University
              </option>
              {universities?.map((university, idx) => (
                <option
                  
                  key={idx}
                  value={university?.name}
                >
                  {university?.name}
                </option>
              ))}
            </select>

            {errors.universityName ? (
              <p className="text-red-500">{errors.universityName.message}</p>
            ) : (
              ""
            )}
          </div>
          {/* Subject name */}
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Subject Name
            </label>
            <input
              type="text"
              {...register("subjectsName", {
                required: "Subject name is Required",
              })}
              
              className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Computer Science"
            />
            {errors.subjectsName ? (
              <p className="text-red-500">{errors.subjectsName.message}</p>
            ) : (
              ""
            )}
          </div>
          {/* university running year */}
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              University Running Year
            </label>

            <select
              defaultValue={""}
              className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("universityRunningYear", {
                required: "University running year is Required",
              })}
            >
              <option disabled value="">
                Select University running year
              </option>
              {semesters?.map((semester, idx) => (
                <option
                  
                  key={idx}
                  value={semester?.value}
                >
                  {semester?.value}
                </option>
              ))}
            </select>

            {errors.universityRunningYear ? (
              <p className="text-red-500">
                {errors.universityRunningYear.message}
              </p>
            ) : (
              ""
            )}
          </div>
          {/* current affair */}
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Current Affair
            </label>

            <select
              defaultValue={""}
              className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("currentAffair", {
                required: "Current Affair is Required",
              })}
            >
              <option disabled value="">
                Select Current Affair
              </option>
              {currentAffairs?.map((affair, idx) => (
                <option
                  key={idx}
                  
                  value={affair?.affair}
                >
                  {affair?.affair}
                </option>
              ))}
            </select>
            {errors.currentAffair ? (
              <p className="text-red-500">{errors.currentAffair.message}</p>
            ) : (
              ""
            )}
          </div>

          {/* high school board */}
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              High School Board
            </label>
            <input
              type="text"
              {...register("highSchoolBoard", {
                required: "High School board is Required",
              })}
              
              className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="State Education Board"
            />
            {errors.highSchoolBoard ? (
              <p className="text-red-500">{errors.highSchoolBoard.message}</p>
            ) : (
              ""
            )}
          </div>
          {/* high school result */}
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              High School Result
            </label>
            <select
              defaultValue=""
              className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("highSchoolResult", {
                required: "High School result is Required",
              })}
            >
              <option disabled value="">
                Select High School Result
              </option>
              {resultData.map((data, idx) => (
                <option
                  
                  key={idx}
                  value={data}
                >
                  {data}
                </option>
              ))}
            </select>
            {errors.highSchoolResult ? (
              <p className="text-red-500">{errors.highSchoolResult.message}</p>
            ) : (
              ""
            )}
          </div>

          {/* collage board */}
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Collage Board
            </label>
            <input
              type="text"
              {...register("collageBoard", {
                required: "Collage board is Required",
              })}
            
              className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="National Collage Board"
            />
            {errors.collageBoard ? (
              <p className="text-red-500">{errors.collageBoard.message}</p>
            ) : (
              ""
            )}
          </div>
          {/* Collage result */}
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Collage Result
            </label>
            <select
              defaultValue=""
              className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("collageResult", {
                required: "Collage result is Required",
              })}
            >
              <option disabled value="">
                Select Collage Result
              </option>
              {resultData.map((data, idx) => (
                <option key={idx} value={data}>
                  {data}
                </option>
              ))}
            </select>
            {errors.collageResult ? (
              <p className="text-red-500">{errors.collageResult.message}</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            {isLoading ? (
              <ImSpinner9 className="animate-spin my-1 mx-4" />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AcademicInfo;
