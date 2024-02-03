import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { useGetEducationVariantsQuery } from "../../../../store/service/educationVariant/educationVariantApiService";
import { useEffect } from "react";
import { useGetCurrentAffairsQuery } from "../../../../store/service/currentAffair/currentAffairApiService";
import { useGetUniversitiesQuery } from "../../../../store/service/university/universityApiService";
import { useGetSemestersQuery } from "../../../../store/service/semester/semesterApiService";
import { useGetSchoolPMQuery } from "../../../../store/service/schoolPM/schoolPMApiService";
import { useGetCollageHCQuery } from "../../../../store/service/collageHC/collageHCApiService";
import { useGetCurriculumBoardsQuery } from "../../../../store/service/curriculumBoard/curriculumBoardApiService";
import { useSaveAcademicInfoMutation } from "../../../../store/service/tutorInfo/academicInfo/academicInfoApiService";

const AcademicInfo = ({ setActiveTab }) => {
  const [number, setNumber] = useState(null);
  const [numberError, setNumberError] = useState(false);
  const [educationVariant, setEducationVariant] = useState(null);

  const { data: allEducationVariantData } = useGetEducationVariantsQuery();
  const educationVariants = allEducationVariantData?.data;

  const { data: allCurrentAffairData } = useGetCurrentAffairsQuery();
  const currentAffairs = allCurrentAffairData?.data;

  const { data: allUniversityData } = useGetUniversitiesQuery();
  const universities = allUniversityData?.data;

  const { data: allSemesterData } = useGetSemestersQuery();
  const semesters = allSemesterData?.data;

  const { data: allSchoolData } = useGetSchoolPMQuery();
  const schools = allSchoolData?.data;

  const { data: allCollageData } = useGetCollageHCQuery();
  const collages = allCollageData?.data;

  const { data: allCurriculumBoardData } = useGetCurriculumBoardsQuery();
  const curriculumBoards = allCurriculumBoardData?.data;

  const [saveAcademicInfo, { isLoading }] = useSaveAcademicInfoMutation();

  const commonInputClassName =
    "shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light h-10";

  const commonSelectClassName =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-10 focus:outline-none";

  // get previous tab number
  useEffect(() => {
    const number = localStorage.getItem("tutor-number");
    setNumber(number);
  }, []);

  //check number is valid or not
  useEffect(() => {
    number && isValidPhoneNumber(number)
      ? setNumberError(false)
      : setNumberError(true);

    if (number?.length < 14) {
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
    if (numberError) return;
    if (!number) return toast.error("Please enter a number");
    data.phoneNumber = number?.substring(1);

    const result = await saveAcademicInfo(data);

    if (result.data) {
      toast.success(result.data.message);
      localStorage.setItem("tutor-number", number);
      setNumber(null);
      reset();
      setActiveTab(4);
    } else {
      toast.error(result.error?.data?.message);
    }
  };

  return (
    <div className="p-2 lg:p-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {/* number */}
          <div className="w-full">
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
              <p
                className={`text-red-500 absolute ${!numberError && "hidden"}`}
              >
                Please enter a valid number
              </p>
            )}
          </div>
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
              onChange={(event) => setEducationVariant(event.target.value)}
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
              <p className="text-red-500 absolute">
                {errors.educationVariant.message}
              </p>
            ) : (
              ""
            )}
          </div>
          {/* school name */}
          <div className={`w-full`}>
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Select School
            </label>
            <select
              {...register("schoolName", {
                required: "School name is required",
              })}
              defaultValue={""}
              className={commonSelectClassName}
            >
              <option value="" disabled>
                Select School Name
              </option>
              {schools
                ?.filter(
                  (school) =>
                    school?.educationVariant?.toLowerCase() ===
                    educationVariant?.toLowerCase()
                )
                ?.map((school, idx) => (
                  <option key={idx} value={school?.schoolName}>
                    {school?.schoolName}
                  </option>
                ))}
            </select>
            {errors.schoolName && (
              <p className="text-red-500 text-sm absolute">
                {errors.schoolName?.message}
              </p>
            )}
          </div>

          {/* high school board */}
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              High School Board
            </label>
            <select
              {...register("highSchoolBoard", {
                required: "Hight School Board is required",
              })}
              defaultValue={""}
              className={commonSelectClassName}
            >
              <option value="" disabled>
                Select high school board
              </option>
              {curriculumBoards
                ?.filter(
                  (board) =>
                    board?.educationVariant?.toLowerCase() ===
                    educationVariant?.toLowerCase()
                )
                ?.map((board, idx) => (
                  <option key={idx} value={board?.boardName}>
                    {board?.boardName}
                  </option>
                ))}
            </select>
            {errors.highSchoolBoard ? (
              <p className="text-red-500 absolute">
                {errors.highSchoolBoard.message}
              </p>
            ) : (
              ""
            )}
          </div>

          {/* high school result */}
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              High School Result
            </label>
            <input
              type="text"
              {...register("highSchoolResult", {
                required: "High School Result is required",
              })}
              className={commonInputClassName}
              placeholder="Enter High School Result"
            />
            {errors.highSchoolResult ? (
              <p className="text-red-500 absolute">
                {errors.highSchoolResult.message}
              </p>
            ) : (
              ""
            )}
          </div>

          {/* collage name */}
          <div className={`w-full`}>
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Select Collage
            </label>
            <select
              {...register("collageName", {
                required: "Collage Name is required",
              })}
              defaultValue={""}
              className={commonSelectClassName}
            >
              <option value="" disabled>
                Select Collage Name
              </option>
              {collages
                ?.filter(
                  (collage) =>
                    collage?.educationVariant?.toLowerCase() ===
                    educationVariant?.toLowerCase()
                )
                ?.map((collage, idx) => (
                  <option key={idx} value={collage?.collageName}>
                    {collage?.collageName}
                  </option>
                ))}
            </select>
            {errors.collageName && (
              <p className="text-red-500 text-sm absolute">
                {errors.collageName?.message}
              </p>
            )}
          </div>

          {/* collage board */}
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Collage Board
            </label>
            <select
              {...register("collageBoard", {
                required: "Collage Board is required",
              })}
              defaultValue={""}
              className={commonSelectClassName}
            >
              <option value="" disabled>
                Select Collage board
              </option>
              {curriculumBoards
                ?.filter(
                  (board) =>
                    board?.educationVariant?.toLowerCase() ===
                    educationVariant?.toLowerCase()
                )
                ?.map((board, idx) => (
                  <option key={idx} value={board?.boardName}>
                    {board?.boardName}
                  </option>
                ))}
            </select>
            {errors.collageBoard ? (
              <p className="text-red-500 absolute">
                {errors.collageBoard.message}
              </p>
            ) : (
              ""
            )}
          </div>

          {/* Collage result */}
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Collage Result
            </label>
            <input
              type="text"
              {...register("collageResult", {
                required: "Collage Result is required",
              })}
              className={commonInputClassName}
              placeholder="Enter Collage Result"
            />
            {errors.collageResult ? (
              <p className="text-red-500 absolute">
                {errors.collageResult.message}
              </p>
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
                <option key={idx} value={university?.name}>
                  {university?.name}
                </option>
              ))}
            </select>

            {errors.universityName ? (
              <p className="text-red-500 absolute">
                {errors.universityName.message}
              </p>
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
              <p className="text-red-500 absolute">
                {errors.subjectsName.message}
              </p>
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
                <option key={idx} value={semester?.value}>
                  {semester?.value}
                </option>
              ))}
            </select>

            {errors.universityRunningYear ? (
              <p className="text-red-500 absolute">
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
                <option key={idx} value={affair?.affair}>
                  {affair?.affair}
                </option>
              ))}
            </select>
            {errors.currentAffair ? (
              <p className="text-red-500 absolute">
                {errors.currentAffair.message}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
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
  );
};

export default AcademicInfo;
