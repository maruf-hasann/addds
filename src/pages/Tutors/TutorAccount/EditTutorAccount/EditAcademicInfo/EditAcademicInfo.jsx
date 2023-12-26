import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetCurriculumBoardsQuery } from "../../../../../store/service/curriculumBoard/curriculumBoardApiService";
import {
  useLazyGetAcademicInfoQuery,
  useSaveAcademicInfoMutation,
  useUpdateAcademicInfoMutation,
} from "../../../../../store/service/tutorInfo/academicInfo/academicInfoApiService";
import { useGetEducationVariantsQuery } from "../../../../../store/service/educationVariant/educationVariantApiService";
import { useGetCurrentAffairsQuery } from "../../../../../store/service/currentAffair/currentAffairApiService";
import { useGetUniversitiesQuery } from "../../../../../store/service/university/universityApiService";
import { useGetSemestersQuery } from "../../../../../store/service/semester/semesterApiService";
import { useGetSchoolPMQuery } from "../../../../../store/service/schoolPM/schoolPMApiService";
import { useGetCollageHCQuery } from "../../../../../store/service/collageHC/collageHCApiService";
import { ImSpinner9 } from "react-icons/im";

const EditAcademicInfo = () => {
  const { number } = useParams();
  const navigate = useNavigate();

  const [collageName, setCollageName] = useState(null);
  const [collageBoard, setCollageBoard] = useState(null);
  const [collageResult, setCollageResult] = useState(null);
  const [highSchoolBoard, setHighSchoolBoard] = useState(null);
  const [highSchoolResult, setHighSchoolResult] = useState(null);
  const [educationVariant, setEducationVariant] = useState(null);
  const [currentAffair, setCurrentAffair] = useState(null);
  const [schoolName, setSchoolName] = useState(null);
  const [subjectsName, setSubjectsName] = useState(null);
  const [selectedEducationVariant, setSelectedEducationVariant] = useState("");
  const [universityRunningYear, setUniversityRunningYear] = useState(null);
  const [universityName, setUniversityName] = useState(null);

  const [academicInfo, setAcademicInfo] = useState(null);

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
  const [getAcademicInfo] = useLazyGetAcademicInfoQuery();
  const [updateAcademicInfo, { isLoading: AcademicInfoUpdateLoading }] =
    useUpdateAcademicInfoMutation();
  const [fetchLoading, setFetchLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // fetch academic info
  useEffect(() => {
    if (number) {
      setFetchLoading(true);
      const fetch = async () => {
        const result = await getAcademicInfo(number);
        if (result?.data?.success) {
          const academicInfo = result?.data?.data;
          setAcademicInfo(academicInfo);
          setCollageBoard(academicInfo?.collageBoard);
          setCollageResult(academicInfo?.collageResult);
          setHighSchoolBoard(academicInfo?.highSchoolBoard);
          setHighSchoolResult(academicInfo?.highSchoolResult);
          setEducationVariant(academicInfo?.educationVariant);
          setCurrentAffair(academicInfo?.currentAffair);
          setSchoolName(academicInfo?.schoolName);
          setCollageName(academicInfo?.collageName);
          setSubjectsName(academicInfo?.subjectsName);
          setUniversityRunningYear(academicInfo?.universityRunningYear);
          setUniversityName(academicInfo?.universityName);
          setSelectedEducationVariant(academicInfo?.educationVariant);
          setFetchLoading(false);
        } else {
          setFetchLoading(false);
        }
      };

      fetch();
    }
  }, [number]);

  // handle submit function
  const onSubmit = async (data) => {
    data.phoneNumber = number;

    let academicData;

    let result;

    if (academicInfo) {
      academicData = {
        educationVariant: data?.educationVariant
          ? data?.educationVariant
          : educationVariant,
        schoolName: data?.schoolName ? data?.schoolName : schoolName,
        highSchoolBoard: data?.highSchoolBoard
          ? data?.highSchoolBoard
          : highSchoolBoard,
        highSchoolResult: data?.highSchoolResult
          ? data?.highSchoolResult
          : highSchoolResult,

        collageName: data?.collageName ? data?.collageName : collageName,
        collageBoard: data?.collageBoard ? data?.collageBoard : collageBoard,
        collageResult: data?.collageResult
          ? data?.collageResult
          : collageResult,

        universityName: data?.universityName
          ? data?.universityName
          : universityName,
        subjectsName: data?.subjectsName ? data?.subjectsName : subjectsName,
        universityRunningYear: data?.universityRunningYear
          ? data?.universityRunningYear
          : universityRunningYear,
        currentAffair: data?.currentAffair
          ? data?.currentAffair
          : currentAffair,
      };
      result = await updateAcademicInfo({
        number: number,
        data: academicData,
      });
    } else {
      academicData = data;
      result = await saveAcademicInfo(academicData);
    }

    if (result.data) {
      const currentAcademicInfo = result?.data?.data;
      setAcademicInfo(currentAcademicInfo);
      setCollageBoard(currentAcademicInfo?.collageBoard);
      setCollageResult(currentAcademicInfo?.collageResult);
      setHighSchoolBoard(currentAcademicInfo?.highSchoolBoard);
      setHighSchoolResult(currentAcademicInfo?.highSchoolResult);
      setEducationVariant(currentAcademicInfo?.educationVariant);
      setCurrentAffair(currentAcademicInfo?.currentAffair);
      setSchoolName(currentAcademicInfo?.schoolName);
      setCollageName(currentAcademicInfo?.collageName);
      setSubjectsName(currentAcademicInfo?.subjectsName);
      setUniversityRunningYear(currentAcademicInfo?.universityRunningYear);
      setUniversityName(currentAcademicInfo?.universityName);
      setSelectedEducationVariant(currentAcademicInfo?.educationVariant);
      toast.success(result.data.message);
      navigate(`/tutor-account-details/${number}`);
    } else {
      toast.error(result.error?.data?.message);
    }
  };

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-xl md:text-2xl text-white">
          Update Academic Info
        </h1>
        <Link
          to={`/tutor-account-details/${number}`}
          className="bg-white text-[#1E6CB3] px-5 py-1 rounded-sm font-semibold"
        >
          Back
        </Link>
      </div>
      <div className="border rounded-md bg-white p-2 sm:p-5 md:p-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            {/* select education variant */}
            <div className="w-full">
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Education Variant
              </label>
              <select
                {...register("educationVariant", {
                  required: academicInfo
                    ? false
                    : "Eduction variant is Required",
                })}
                defaultValue=""
                className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                  const selectedValue = event.target.value;
                  setSelectedEducationVariant(selectedValue);
                }}
              >
                <option value="" disabled>
                  Select Education Variant
                </option>
                {educationVariants?.map((variant, idx) => (
                  <option
                    selected={
                      academicInfo &&
                      academicInfo?.educationVariant?.toLowerCase() ===
                        variant?.variantName?.toLowerCase()
                    }
                    key={idx}
                    value={variant?.variantName}
                  >
                    {variant?.variantName}
                  </option>
                ))}
              </select>
              {errors.educationVariant ? (
                <p className="text-red-500">
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
                  required: academicInfo ? false : "School Name is Required",
                })}
                defaultValue=""
                className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" disabled>
                  Select School Name
                </option>
                {schools
                  ?.filter(
                    (school) =>
                      school?.educationVariant?.toLowerCase() ===
                      selectedEducationVariant?.toLowerCase()
                  )
                  ?.map((school, idx) => (
                    <option
                      key={idx}
                      value={school?.schoolName}
                      selected={
                        schoolName?.toLowerCase() ===
                        school?.schoolName?.toLowerCase()
                      }
                    >
                      {school?.schoolName}
                    </option>
                  ))}
              </select>
              {errors.schoolName ? (
                <p className="text-red-500">{errors.schoolName.message}</p>
              ) : (
                ""
              )}
            </div>

            {/* high school board */}
            <div className={`w-full`}>
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                High School Board
              </label>
              <select
                {...register("highSchoolBoard", {
                  required: academicInfo
                    ? false
                    : "High School Board is Required",
                })}
                defaultValue=""
                className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" disabled>
                  Select high school board
                </option>
                {curriculumBoards
                  ?.filter(
                    (board) =>
                      board?.educationVariant?.toLowerCase() ===
                      selectedEducationVariant?.toLowerCase()
                  )
                  ?.map((board, idx) => (
                    <option
                      key={idx}
                      value={board?.boardName}
                      selected={
                        highSchoolBoard?.toLowerCase() ===
                        board?.boardName?.toLowerCase()
                      }
                    >
                      {board?.boardName}
                    </option>
                  ))}
              </select>
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
              <input
                type="text"
                {...register("highSchoolResult", {
                  required: academicInfo
                    ? false
                    : "High School Result is Required",
                })}
                defaultValue={highSchoolResult}
                className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Enter High School Result"
              />
              {errors.highSchoolResult ? (
                <p className="text-red-500">
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
                  required: academicInfo ? false : "Collage Name is Required",
                })}
                defaultValue=""
                className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" disabled>
                  Select Collage Name
                </option>
                {collages
                  ?.filter(
                    (collage) =>
                      collage?.educationVariant?.toLowerCase() ===
                      selectedEducationVariant?.toLowerCase()
                  )
                  ?.map((collage, idx) => (
                    <option
                      key={idx}
                      value={collage?.collageName}
                      selected={
                        collageName?.toLowerCase() ===
                        collage?.collageName?.toLowerCase()
                      }
                    >
                      {collage?.collageName}
                    </option>
                  ))}
              </select>
              {errors.collageName ? (
                <p className="text-red-500">{errors.collageName.message}</p>
              ) : (
                ""
              )}
            </div>

            {/* collage board */}
            <div className={`w-full`}>
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Collage Board
              </label>
              <select
                {...register("collageBoard", {
                  required: academicInfo ? false : "Collage Board is Required",
                })}
                defaultValue=""
                className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" disabled>
                  Select Collage board
                </option>
                {curriculumBoards
                  ?.filter(
                    (board) =>
                      board?.educationVariant?.toLowerCase() ===
                      selectedEducationVariant?.toLowerCase()
                  )
                  ?.map((board, idx) => (
                    <option
                      key={idx}
                      value={board?.boardName}
                      selected={
                        collageBoard?.toLowerCase() ===
                        board?.boardName?.toLowerCase()
                      }
                    >
                      {board?.boardName}
                    </option>
                  ))}
              </select>
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
              <input
                type="text"
                {...register("collageResult", {
                  required: academicInfo ? false : "Collage Result is Required",
                })}
                defaultValue={collageResult}
                className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Enter Collage Result"
              />
              {errors.collageResult ? (
                <p className="text-red-500">{errors.collageResult.message}</p>
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
                  required: academicInfo
                    ? false
                    : "University Name is Required",
                })}
              >
                <option disabled value="">
                  Select University
                </option>
                {universities?.map((university, idx) => (
                  <option
                    selected={
                      universityName?.toLowerCase() ===
                      university?.name?.toLowerCase()
                    }
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
                  required: academicInfo ? false : "Subject name is Required",
                })}
                defaultValue={subjectsName}
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
                  required: academicInfo
                    ? false
                    : "University running year is Required",
                })}
              >
                <option disabled value="">
                  Select University running year
                </option>
                {semesters?.map((semester, idx) => (
                  <option
                    selected={
                      universityRunningYear?.toLowerCase() ===
                      semester?.value?.toLowerCase()
                    }
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
                  required: academicInfo ? false : "Current Affair is Required",
                })}
              >
                <option disabled value="">
                  Select Current Affair
                </option>
                {currentAffairs?.map((affair, idx) => (
                  <option
                    key={idx}
                    selected={
                      currentAffair?.toLowerCase() ===
                      affair?.affair?.toLowerCase()
                    }
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
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              {isLoading || AcademicInfoUpdateLoading | fetchLoading ? (
                <ImSpinner9 className="animate-spin my-1 mx-4" />
              ) : academicInfo ? (
                "Update"
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAcademicInfo;
