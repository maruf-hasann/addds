import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetAllTutoringLocationQuery } from "../../../../../store/service/tutoringLocation/tutoringLocationApiService";
import { useLazyGetPersonalInfoQuery } from "../../../../../store/service/personalInfo/personalInfoApiService";
import { useGetTutoringProgramsQuery } from "../../../../../store/service/tutoringProgram/tutoringProgramApiService";
import { useGetTutoringPlacesQuery } from "../../../../../store/service/tutoringPlace/tutoringPlaceApiService";
import { useLazyGetAdditionalTutoringInfoQuery, useSaveAdditionalTutoringInfoMutation, useUpdateAdditionalTutoringInfoMutation } from "../../../../../store/service/tutorInfo/additionalTutoringInfo/additionalTutoringInfoApiService";
import { useGetStudentVariantsQuery } from "../../../../../store/service/studentVariant/studentVariantApiService";

const EditAdditionalTutoringInfo = () => {
  const { number } = useParams();
  const navigate = useNavigate();

  const [personalInfo, setPersonalInfo] = useState(null);
  const [additionalTutoringInfo, setAdditionalTutoringInfo] = useState(null);
  const [growTutoringProgram, setGrowTutoringProgram] = useState();
  const [tutoringPrograms, setTutoringPrograms] = useState([]);

  const [tutoringTraining, setTutoringTraining] = useState();
  const [teachingExperience, setTeachingExperience] = useState();

  const [tutoringPlaces, setTutoringPlaces] = useState([]);
  const [tutoringLocations, setTutoringLocations] = useState([]);
  const [studentVariants, setStudentVariants] = useState([]);

  const [fetchLoading, setFetchLoading] = useState(false);

  const [yearsOfExperience, setYearsOfExperience] = useState(null);
  const [teachingHistory, setTeachingHistory] = useState(null);
  const [minExpectedSalary, setMinExpectedSalary] = useState(null);
  const [maxExpectedSalary, setMaxExpectedSalary] = useState(null);
  const [personalStatement, setPersonalStatement] = useState(null);

  const { handleSubmit, register } = useForm();

  const { data: allTutoringProgramData } = useGetTutoringProgramsQuery();
  const allTutoringPrograms = allTutoringProgramData?.data;

  const { data: allTutoringPlaceData } = useGetTutoringPlacesQuery();
  const allTutoringPlaces = allTutoringPlaceData?.data;

  const { data: allStudentVariantsData } = useGetStudentVariantsQuery();
  const allStudentVariants = allStudentVariantsData?.data;

  const { data: allTutoringLocationData } = useGetAllTutoringLocationQuery();
  const allTutoringLocations = allTutoringLocationData?.data;

  const locations = allTutoringLocations?.filter(
    (location) =>
      location?.city?.toLowerCase() === personalInfo?.city?.toLowerCase()
  );

  const [addAdditionalTutoringInfo, { isLoading }] =
    useSaveAdditionalTutoringInfoMutation();

  const [getAdditionalTutoringInfo] = useLazyGetAdditionalTutoringInfoQuery();

  console.log(additionalTutoringInfo);

  const [
    updateAdditionalTutoringInfo,
    { isLoading: AdditionalTutoringInfoUpdateLoading },
  ] = useUpdateAdditionalTutoringInfoMutation();

  // fetch current personal info
  const [getPersonalInfo] = useLazyGetPersonalInfoQuery();
  useEffect(() => {
    if (number) {
      const fetch = async () => {
        const result = await getPersonalInfo(number);
        if (result?.data?.success) {
          const personalInfo = result?.data?.data;
          setPersonalInfo(personalInfo);
        }
      };

      fetch();
    }
  }, [number]);

  // fetched additional tutoring information
  useEffect(() => {
    if (number) {
      setFetchLoading(true);
      const fetch = async () => {
        const result = await getAdditionalTutoringInfo(number);
        if (result?.data?.success) {
          const additionalTutoringInfo = result?.data?.data;
          setAdditionalTutoringInfo(additionalTutoringInfo);
          setGrowTutoringProgram(additionalTutoringInfo?.isGrowTutoringProgram);
          setTutoringTraining(additionalTutoringInfo?.isTutoringTraining);
          setTeachingExperience(additionalTutoringInfo?.isTeachingExperience);
          setYearsOfExperience(additionalTutoringInfo?.yearsOfExperience);
          setTeachingHistory(additionalTutoringInfo?.teachingHistory);
          setMaxExpectedSalary(additionalTutoringInfo?.maxExpectedSalary);
          setMinExpectedSalary(additionalTutoringInfo?.minExpectedSalary);
          setPersonalStatement(additionalTutoringInfo?.personalStatement);

          setStudentVariants([
            ...additionalTutoringInfo?.studentVariant.map((variant) => {
              return variant?.variantName;
            }),
          ]);

          setTutoringPlaces([
            ...additionalTutoringInfo?.tutoringPlace?.map((place) => {
              return place?.placeName;
            }),
          ]);
          setTutoringLocations([
            ...additionalTutoringInfo?.tutoringLocation?.map((location) => {
              return location?.locationName;
            }),
          ]);

          setTutoringPrograms([
            ...additionalTutoringInfo?.tutoringProgram?.map((program) => {
              return program?.programName;
            }),
          ]);

          console.log(additionalTutoringInfo);
          setFetchLoading(false);
        } else {
          setFetchLoading(false);
        }
      };

      fetch();
    }
  }, [number]);


  // handle submit form
  const onSubmit = async (data) => {
    let additionalInfo;
    let result;

    const tutoringPlace = tutoringPlaces.map((placeName) => {
      return { placeName };
    });

    const tutoringLocation = tutoringLocations.map((locationName) => {
      return { locationName };
    });

    const studentVariant = studentVariants.map((variantName) => {
      return { variantName };
    });

    const tutoringProgram = tutoringPrograms.map((programName) => {
      return { programName };
    });

    if (additionalTutoringInfo) {
      additionalInfo = {
        tutoringProgram: growTutoringProgram ? tutoringProgram : [],
        tutoringPlace,
        studentVariant,
        tutoringLocation,
        phoneNumber: number,
        isGrowTutoringProgram: growTutoringProgram,
        isTutoringTraining: tutoringTraining,
        isTeachingExperience: teachingExperience,
        yearsOfExperience: teachingExperience
          ? data?.experienceYears
            ? Number(data.experienceYears)
            : yearsOfExperience
          : 0,
        minExpectedSalary: data?.minExpectedSalary
          ? Number(data.minExpectedSalary)
          : minExpectedSalary,
        maxExpectedSalary: data?.maxExpectedSalary
          ? Number(data.maxExpectedSalary)
          : maxExpectedSalary,

        teachingHistory: teachingExperience
          ? data?.teachingHistory || teachingHistory
          : "",
        personalStatement: data?.personalStatement || personalStatement,
      };

      result = await updateAdditionalTutoringInfo({
        data: additionalInfo,
        number: number,
      });
    } else {
      additionalInfo = {
        phoneNumber: number,
        isGrowTutoringProgram: growTutoringProgram,
        isTutoringTraining: tutoringTraining,
        isTeachingExperience: teachingExperience,
        yearsOfExperience: Number(data.experienceYears) || 0,
        teachingHistory: data.teachingHistory || "",
        tutoringProgram,
        tutoringPlace,
        studentVariant,
        minExpectedSalary: Number(data.minExpectedSalary),
        maxExpectedSalary: Number(data.maxExpectedSalary),
        tutoringLocation,
        personalStatement: data.personalStatement,
      };

      console.log(additionalInfo);

      result = await addAdditionalTutoringInfo(additionalInfo);
    }

    if (result.data) {
      // reset();
      toast.success(result.data.message);

      const currentAdditionalTutoringInfo = result?.data?.data;
      setAdditionalTutoringInfo(currentAdditionalTutoringInfo);
      setGrowTutoringProgram(
        currentAdditionalTutoringInfo?.isGrowTutoringProgram
      );
      setTutoringTraining(currentAdditionalTutoringInfo?.isTutoringTraining);
      setTeachingExperience(
        currentAdditionalTutoringInfo?.isTeachingExperience
      );
      setYearsOfExperience(currentAdditionalTutoringInfo?.yearsOfExperience);
      setTeachingHistory(currentAdditionalTutoringInfo?.teachingHistory);
      setMaxExpectedSalary(currentAdditionalTutoringInfo?.maxExpectedSalary);
      setMinExpectedSalary(currentAdditionalTutoringInfo?.minExpectedSalary);
      setPersonalStatement(currentAdditionalTutoringInfo?.personalStatement);

      setStudentVariants([
        ...currentAdditionalTutoringInfo?.studentVariant.map((variant) => {
          return variant?.variantName;
        }),
      ]);

      setTutoringPlaces([
        ...currentAdditionalTutoringInfo?.tutoringPlace?.map((place) => {
          return place?.placeName;
        }),
      ]);

      setTutoringLocations([
        ...currentAdditionalTutoringInfo?.tutoringLocation?.map((location) => {
          return location?.locationName;
        }),
      ]);

      setTutoringPrograms([
        ...currentAdditionalTutoringInfo?.tutoringProgram?.map((program) => {
          return program?.programName;
        }),
      ]);
      navigate(`/academic-tutoring-details/${number}`)
    } else {
      toast.error(result.error.data.message);
    }
  };

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-xl md:text-2xl text-white">
          Update Additional Tutoring Info
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
          {/* Program Details */}
          <div className="my-10">
            {/* growing radio box */}
            <div>
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Do you want to grow your tutoring program?
              </label>
              <div className={`flex gap-10 items-center mb-3`}>
                <div className="flex ">
                  <input
                    onInput={() => setGrowTutoringProgram(true)}
                    id="tutoringProgram-1"
                    type="radio"
                    name="tutoringProgram"
                    className="w-4 h-4"
                    defaultChecked={
                      additionalTutoringInfo && growTutoringProgram
                    }
                    required={!additionalTutoringInfo}
                  />
                  <label
                    htmlFor="tutoringProgram"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Yes
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    onInput={() => setGrowTutoringProgram(false)}
                    id="tutoringProgram-2"
                    type="radio"
                    value=""
                    name="tutoringProgram"
                    defaultChecked={
                      additionalTutoringInfo && !growTutoringProgram
                    }
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="tutoringProgram1"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>
            {/* choose variant */}
            <div className={`w-full ${!growTutoringProgram && "hidden"} my-5`}>
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Choose Tutoring Variant
              </label>
              <select
                {...register("tutoringVariant")}
                defaultValue=""
                className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                  const selectedValue = event.target.value;
                  if (!tutoringPrograms.includes(selectedValue)) {
                    setTutoringPrograms([...tutoringPrograms, selectedValue]);
                  }
                }}
              >
                <option value="" disabled>
                  Choose Variant
                </option>
                {allTutoringPrograms?.map((item, idx) => (
                  <option key={idx} value={item?.programName}>
                    {item?.programName}
                  </option>
                ))}
              </select>
              <div className="flex overflow-auto mt-3 gap-2">
                {tutoringPrograms?.map((item, idx) => (
                  <div
                    onClick={() => {
                      let selectedVariant;
                      selectedVariant = tutoringPrograms.filter(
                        (sub, index) => item[idx] !== sub[index]
                      );
                      setTutoringPrograms(selectedVariant);
                    }}
                    key={idx}
                    className="flex items-center justify-between gap-5 bg-gray-100 mb-1"
                  >
                    <div className="py-1 pl-3 text-sm font-semibold text-gray-500 capitalize whitespace-nowrap">
                      <span className="mr-2">{idx + 1}</span>
                      {item}
                    </div>
                    <div className="hover:bg-red-500 h-full w-full flex justify-center items-center rounded-r px-1 cursor-pointer text-red-500 hover:text-white transition-colors duration-200">
                      <RxCross2 className="h-5 w-5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* tutoring training */}
          <div className="my-10">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Do you have tutoring training?
            </label>
            <div className={`flex gap-10 items-center mb-3`}>
              <div className="flex ">
                <input
                  onInput={() => setTutoringTraining(true)}
                  id="tutoringTraining-1"
                  type="radio"
                  name="tutoringTraining"
                  className="w-4 h-4"
                  defaultChecked={additionalTutoringInfo && tutoringTraining}
                  required={!additionalTutoringInfo}
                />
                <label
                  htmlFor="tutoringTraining"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  onInput={() => setTutoringTraining(false)}
                  id="tutoringTraining-2"
                  type="radio"
                  value=""
                  name="tutoringTraining"
                  defaultChecked={additionalTutoringInfo && !tutoringTraining}
                  className="w-4 h-4"
                />
                <label
                  htmlFor="tutoringTraining1"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  No
                </label>
              </div>
            </div>
          </div>

          {/* Teaching Experience */}
          <div className="my-10">
            {/* experience radio box */}
            <div>
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Do you have any teaching experience?
              </label>
              <div className={`flex gap-10 items-center mb-3`}>
                <div className="flex ">
                  <input
                    onInput={() => setTeachingExperience(true)}
                    id="teachingExperience-1"
                    type="radio"
                    name="teachingExperience"
                    className="w-4 h-4"
                    defaultChecked={
                      additionalTutoringInfo && teachingExperience
                    }
                    required={!additionalTutoringInfo}
                  />
                  <label
                    htmlFor="teachingExperience"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Yes
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    onInput={() => setTeachingExperience(false)}
                    id="teachingExperience-2"
                    type="radio"
                    value=""
                    name="teachingExperience"
                    defaultChecked={
                      additionalTutoringInfo && !teachingExperience
                    }
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="teachingExperience1"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>
            {/* choose variant */}
            <div className={`w-full ${!teachingExperience && "hidden"} my-5`}>
              <div>
                <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                  Years Of Experience
                </label>
                <input
                  type="number"
                  {...register("experienceYears", {
                    required:
                      !additionalTutoringInfo && teachingExperience
                        ? true
                        : false,
                  })}
                  className={`shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light `}
                  defaultValue={yearsOfExperience}
                  placeholder="Years Of Experience"
                />
              </div>
              <div className="mt-5">
                <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                  Teaching History
                </label>
                <textarea
                  {...register("teachingHistory", {
                    required:
                      !additionalTutoringInfo && teachingExperience
                        ? true
                        : false,
                  })}
                  className={`shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light `}
                  defaultValue={teachingHistory}
                  placeholder="Teaching History"
                />
              </div>
            </div>
          </div>

          {/* select tutoring place */}
          <div className="my-10">
            <div className={`w-full`}>
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Choose Tutoring Place
              </label>
              <select
                {...register("tutoringPlace")}
                defaultValue=""
                className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                  const selectedValue = event.target.value;
                  if (!tutoringPlaces.includes(selectedValue)) {
                    setTutoringPlaces([...tutoringPlaces, selectedValue]);
                  }
                }}
              >
                <option value="" disabled>
                  Choose Place
                </option>
                {allTutoringPlaces?.map((item, idx) => (
                  <option key={idx} value={item?.placeName}>
                    {item?.placeName}
                  </option>
                ))}
              </select>
              <div className="flex overflow-auto mt-3 gap-2">
                {tutoringPlaces?.map((item, idx) => (
                  <div
                    onClick={() => {
                      let selectedPlace;
                      selectedPlace = tutoringPlaces.filter(
                        (sub, index) => item[idx] !== sub[index]
                      );
                      setTutoringPlaces(selectedPlace);
                    }}
                    key={idx}
                    className="flex items-center justify-between gap-5 bg-gray-100 mb-1"
                  >
                    <div className="py-1 pl-3 text-sm font-semibold text-gray-500 capitalize whitespace-nowrap">
                      <span className="mr-2">{idx + 1}</span>
                      {item}
                    </div>
                    <div className="hover:bg-red-500 h-full w-full flex justify-center items-center rounded-r px-1 cursor-pointer text-red-500 hover:text-white transition-colors duration-200">
                      <RxCross2 className="h-5 w-5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* select student variant */}
          <div className="my-10">
            <div className={`w-full`}>
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Choose Student Variant
              </label>
              <select
                {...register("studentVariant")}
                defaultValue=""
                className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                  const selectedValue = event.target.value;
                  if (!studentVariants.includes(selectedValue)) {
                    setStudentVariants([...studentVariants, selectedValue]);
                  }
                }}
              >
                <option value="" disabled>
                  Choose Variant
                </option>
                {allStudentVariants?.map((item, idx) => (
                  <option key={idx} value={item?.variantName}>
                    {item?.variantName}
                  </option>
                ))}
              </select>
              <div className="flex overflow-auto mt-3 gap-2">
                {studentVariants?.map((item, idx) => (
                  <div
                    onClick={() => {
                      let selectedVariants;
                      selectedVariants = studentVariants.filter(
                        (sub, index) => item[idx] !== sub[index]
                      );
                      setStudentVariants(selectedVariants);
                    }}
                    key={idx}
                    className="flex items-center justify-between gap-5 bg-gray-100 mb-1"
                  >
                    <div className="py-1 pl-3 text-sm font-semibold text-gray-500 capitalize whitespace-nowrap">
                      <span className="mr-2">{idx + 1}</span>
                      {item}
                    </div>
                    <div className="hover:bg-red-500 h-full w-full flex justify-center items-center rounded-r px-1 cursor-pointer text-red-500 hover:text-white transition-colors duration-200">
                      <RxCross2 className="h-5 w-5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* expected salary */}
          <div className="my-10">
            <div className="flex  justify-center items-center">
              <div className="w-full">
                <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                  Min Expected Salary
                </label>
                <input
                  type="number"
                  {...register("minExpectedSalary", {
                    required: !additionalTutoringInfo && true,
                  })}
                  className={`shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light `}
                  defaultValue={additionalTutoringInfo && minExpectedSalary}
                  placeholder="Min Expected Salary"
                />
              </div>
              <span className="w-20 text-center mt-8">to</span>
              <div className="w-full">
                <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                  Max Expected Salary
                </label>
                <input
                  type="number"
                  {...register("maxExpectedSalary", {
                    required: !additionalTutoringInfo && true,
                  })}
                  className={`shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light `}
                  defaultValue={additionalTutoringInfo && maxExpectedSalary}
                  placeholder="Max Expected Salary"
                />
              </div>
            </div>
          </div>

          {/* select tutoring location */}
          <div className="my-10">
            <div className={`w-full`}>
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Choose Tutoring Location
              </label>
              <select
                {...register("tutoringLocation")}
                defaultValue=""
                className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                  const selectedValue = event.target.value;
                  if (!tutoringLocations.includes(selectedValue)) {
                    setTutoringLocations([...tutoringLocations, selectedValue]);
                  }
                }}
              >
                <option value="" disabled>
                  Choose Location
                </option>
                {locations?.map((location, idx) => (
                  <option key={idx} value={location?.locationName}>
                    {location?.locationName}
                  </option>
                ))}
              </select>
              <div className="flex overflow-auto mt-3 gap-2">
                {tutoringLocations?.map((location, idx) => (
                  <div
                    onClick={() => {
                      let selectedLocation;
                      selectedLocation = tutoringLocations.filter(
                        (sub, index) => location[idx] !== sub[index]
                      );
                      setTutoringLocations(selectedLocation);
                    }}
                    key={idx}
                    className="flex items-center justify-between gap-5 bg-gray-100 mb-1"
                  >
                    <div className="py-1 pl-3 text-sm font-semibold text-gray-500 capitalize whitespace-nowrap">
                      <span className="mr-2">{idx + 1}</span>
                      {location}
                    </div>
                    <div className="hover:bg-red-500 h-full w-full flex justify-center items-center rounded-r px-1 cursor-pointer text-red-500 hover:text-white transition-colors duration-200">
                      <RxCross2 className="h-5 w-5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* personal statement */}
          <div className="my-10">
            <div className="w-full">
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Personal Statement
              </label>
              <textarea
                {...register("personalStatement", {
                  required: !additionalTutoringInfo && true,
                })}
                className={`shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light `}
                defaultValue={additionalTutoringInfo && personalStatement}
                placeholder="Your Personal Statement"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-4 mb-10">
            <button
              type="submit"
              disabled={isLoading || fetchLoading}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              {isLoading ||
              fetchLoading ||
              AdditionalTutoringInfoUpdateLoading ? (
                <ImSpinner9 className="animate-spin my-1 mx-4" />
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

export default EditAdditionalTutoringInfo;
