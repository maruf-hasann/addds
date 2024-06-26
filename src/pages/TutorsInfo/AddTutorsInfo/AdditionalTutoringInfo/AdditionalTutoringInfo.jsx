import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useGetTutoringProgramsQuery } from "../../../../store/service/tutoringProgram/tutoringProgramApiService";
import { useGetTutoringPlacesQuery } from "../../../../store/service/tutoringPlace/tutoringPlaceApiService";
import { useGetStudentVariantsQuery } from "../../../../store/service/studentVariant/studentVariantApiService";
import { useGetAllTutoringLocationQuery } from "../../../../store/service/tutoringLocation/tutoringLocationApiService";
import { useSaveAdditionalTutoringInfoMutation } from "../../../../store/service/tutorInfo/additionalTutoringInfo/additionalTutoringInfoApiService";
import { useLazyGetPersonalInfoQuery } from "../../../../store/service/personalInfo/personalInfoApiService";
import Note from "../../../../components/Shared/Note/Note";
import { handleRemoveMinus } from "../../../../libs/additionalInfo/handleRemoveMinus";
import JoditEditor from "jodit-react";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import { formatFieldName } from "../../../../libs/formatFieldName";
import { checkFalsyFromObjAndReturn } from "../../../../libs/checkFalsyFromObjAndReturn";
import { ImSpinner9 } from "react-icons/im";

const AdditionalTutoringInfo = ({ setActiveTab }) => {
  const editor = useRef(null);
  const [initialState, setInitialState] = useState({
    numberError: false,
    personalInfo: null,
    growTutoringProgram: false,
    tutoringPrograms: [],
    tutoringTraining: false,
    teachingExperience: false,
    tutoringPlaces: [],
    tutoringLocations: [],
    studentVariants: [],
    yearsOfExperience: "0",
    teachingHistory: null,
    minExpectedSalary: null,
    maxExpectedSalary: null,
    personalStatement: null,
  });
  const [number, setNumber] = useState(null);
  const [customErrors, setCustomErrors] = useState({
    tutoringPlace: "",
    studentVariant: "",
    tutoringVariant: "",
    tutoringLocation: "",
    personalStatement: "",
  });
  const [errors, setErrors] = useState({
    experienceYears: "",
    teachingHistory: "",
    minExpectedSalary: "",
    maxExpectedSalary: "",
  }); 
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
      location?.city?.toLowerCase() ===
      initialState?.personalInfo?.city?.toLowerCase()
  );

  const [addAdditionalTutoringInfo, { isLoading }] =
    useSaveAdditionalTutoringInfoMutation();

  // get previous tab number
  useEffect(() => {
    const number = localStorage.getItem("tutor-number");
    setNumber(number);
  }, []);

  // handle check valid number or not
  useEffect(() => {
    if (number && !isValidPhoneNumber(number) && number?.length < 14) {
      setInitialState({ ...initialState, numberError: true });
    }
  }, [number]);

  // fetch current personal info
  const [getPersonalInfo] = useLazyGetPersonalInfoQuery();
  useEffect(() => {
    if (number) {
      const fetch = async () => {
        const result = await getPersonalInfo(number?.substring(1));
        if (result?.data?.success) {
          const currentPersonalInfo = result?.data?.data;
          setInitialState({
            ...initialState,
            personalInfo: currentPersonalInfo,
          });
        }
      };

      fetch();
    }
  }, [number]);

  // handle submit form
  const onSubmit = async (data) => {
    if (initialState?.numberError) return;
    if (!number) return toast.error("Please enter a number");
    let formData = {};
    let requiredFields = [];
    if (initialState?.teachingExperience) {
      formData = {
        experienceYears: initialState?.yearsOfExperience,
        teachingHistory: initialState?.teachingHistory,
        minExpectedSalary: initialState?.minExpectedSalary,
        maxExpectedSalary: initialState?.maxExpectedSalary,
      };
      requiredFields = [
        "experienceYears",
        "teachingHistory",
        "minExpectedSalary",
        "maxExpectedSalary",
      ];
    } else {
      formData = {
        minExpectedSalary: initialState?.minExpectedSalary,
        maxExpectedSalary: initialState?.maxExpectedSalary,
      };
      requiredFields = ["minExpectedSalary", "maxExpectedSalary"];
    }

    let isSuccess = true;

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: `${formatFieldName(field)} is required`,
        }));
        isSuccess = false;
      }
    });

    if (isSuccess) {
      isSuccess = checkFalsyFromObjAndReturn(errors);
    }
    if (!isSuccess) {
      return;
    }

    const tutoringPlace = initialState?.tutoringPlaces.map((placeName) => {
      return { placeName };
    });

    const tutoringLocation = initialState?.tutoringLocations.map(
      (locationName) => {
        return { locationName };
      }
    );

    const studentVariant = initialState?.studentVariants.map((variantName) => {
      return { variantName };
    });

    const tutoringProgram = initialState?.tutoringPrograms.map(
      (programName) => {
        return { programName };
      }
    );

    //check minExpSalary is greater than or not maxExpSalary
    const currentMinExpectedSalary = parseInt(data?.minExpectedSalary)
      ? parseInt(data?.minExpectedSalary)
      : initialState?.minExpectedSalary;
    const currentMaxExpectedSalary = parseInt(data?.maxExpectedSalary)
      ? parseInt(data?.maxExpectedSalary)
      : initialState?.maxExpectedSalary;

    if (initialState?.growTutoringProgram && !tutoringProgram?.length)
      return setCustomErrors({
        ...errors,
        tutoringVariant: "Tutoring variant is required",
      });

    if (!tutoringPlace?.length)
      return setCustomErrors({
        ...errors,
        tutoringPlace: "Tutoring place is required",
      });

    if (!studentVariant?.length)
      return setCustomErrors({
        ...errors,
        studentVariant: "Student variant is required",
      });

    if (!tutoringLocation?.length)
      return setCustomErrors({
        ...errors,
        tutoringLocation: "Tutoring location is required",
      });

    if (currentMinExpectedSalary > currentMaxExpectedSalary) {
      return toast.error(
        "Min Expected Salary should not be greater than Max Expected Salary"
      );
    }
    if (
      !initialState?.personalStatement ||
      initialState?.personalStatement === "<p><br></p>"
    )
      return setCustomErrors({
        ...errors,
        personalStatement: "Personal statement is required",
      });

    const additionalInfo = {
      phoneNumber: number?.substring(1),
      isGrowTutoringProgram: initialState?.growTutoringProgram,
      isTutoringTraining: initialState?.tutoringTraining,
      isTeachingExperience: initialState?.teachingExperience,
      yearsOfExperience: initialState?.teachingExperience
        ? initialState?.yearsOfExperience
        : 0,
      teachingHistory: initialState?.teachingExperience
        ? initialState?.teachingHistory
        : "",
      tutoringProgram,
      tutoringPlace,
      studentVariant,
      minExpectedSalary: Number(initialState?.minExpectedSalary),
      maxExpectedSalary: Number(initialState?.maxExpectedSalary),
      tutoringLocation,
      personalStatement: initialState?.personalStatement,
    };
    const result = await addAdditionalTutoringInfo(additionalInfo);
    if (result.data) {
      toast.success(result.data.message);
      setInitialState({
        numberError: false,
        personalInfo: null,
        growTutoringProgram: false,
        tutoringPrograms: [],
        tutoringTraining: false,
        teachingExperience: false,
        tutoringPlaces: [],
        tutoringLocations: [],
        studentVariants: [],
        yearsOfExperience: "0",
        teachingHistory: null,
        minExpectedSalary: null,
        maxExpectedSalary: null,
        personalStatement: null,
      });
      setErrors({
        experienceYears: "",
        teachingHistory: "",
        minExpectedSalary: "",
        maxExpectedSalary: "",
      });
      setActiveTab(6);
    } else {
      toast.error(result?.error?.data?.message);
      setErrors({
        experienceYears: "",
        teachingHistory: "",
        minExpectedSalary: "",
        maxExpectedSalary: "",
      });
    }
  };

  return (
    <div className=" p-2 lg:p-10">
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
          <p
            className={`text-red-500 ${!initialState?.numberError && "hidden"}`}
          >
            Please enter a valid number
          </p>
        )}
      </div>
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
                  onInput={() => {
                    setInitialState({
                      ...initialState,
                      growTutoringProgram: true,
                    });
                  }}
                  id="tutoringProgram-1"
                  type="radio"
                  name="tutoringProgram"
                  className="w-4 h-4"
                  required
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
                  onInput={() => {
                    setInitialState({
                      ...initialState,
                      growTutoringProgram: true,
                    });
                  }}
                  id="tutoringProgram-2"
                  type="radio"
                  value=""
                  name="tutoringProgram"
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
          {/* note */}
          <div className={`${!initialState?.growTutoringProgram && "hidden"}`}>
            <Note
              text={`It can be a tremendous resource for current
              and future tutoring: benefits include continued earning,
              mentorship opportunities, industry newsletters, attendance at
              annual conferences, networking events, and tutoring certifications
              & becoming an associate partner of Schooling. Prospective tutors
              can join groups such as the Bangladesh National Tutoring
              Association.`}
            />
          </div>
          {/* choose variant */}
          <div
            className={`w-full ${
              !initialState?.growTutoringProgram && "hidden"
            } my-5`}
          >
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Choose Tutoring Variant
            </label>
            <select
              {...register("tutoringVariant")}
              defaultValue=""
              className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(event) => {
                const selectedValue = event.target.value;
                if (!initialState?.tutoringPrograms.includes(selectedValue)) {
                  setInitialState({
                    ...initialState,
                    tutoringPrograms: [
                      ...initialState?.tutoringPrograms,
                      selectedValue,
                    ],
                  });
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
            {!initialState?.tutoringPrograms?.length &&
              customErrors?.tutoringVariant && (
                <p className="text-red-500 text-sm absolute">
                  {customErrors?.tutoringVariant}
                </p>
              )}
            <div className="flex flex-wrap mt-3 gap-2">
              {initialState?.tutoringPrograms?.map((item, idx) => (
                <div
                  onClick={() => {
                    let selectedVariant;
                    selectedVariant = initialState?.tutoringPrograms.filter(
                      (sub, index) => item[idx] !== sub[index]
                    );

                    setInitialState({
                      ...initialState,
                      tutoringPrograms: selectedVariant,
                    });
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
                onInput={() => {
                  setInitialState({ ...initialState, tutoringTraining: true });
                }}
                id="tutoringTraining-1"
                type="radio"
                name="tutoringTraining"
                className="w-4 h-4"
                required
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
                onInput={() => {
                  setInitialState({ ...initialState, tutoringTraining: true });
                }}
                id="tutoringTraining-2"
                type="radio"
                value=""
                name="initialState?.tutoringTraining"
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
          {/* note */}
          <div className={`${!initialState?.tutoringTraining && "hidden"}`}>
            <Note
              text={`We offer tutoring preparation training programs. Not all tutors are educators, but they can benefit from education degrees and training—a fresher! who has an academic degree but has never been a tutor. Schooling improves your attitude, technique, and the entire process of how to grow your tutoring job. We are instant supporters of you while you tutor.`}
            />
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
                  onInput={() => {
                    setInitialState({
                      ...initialState,
                      teachingExperience: true,
                    });
                  }}
                  id="teachingExperience-1"
                  type="radio"
                  name="teachingExperience"
                  className="w-4 h-4"
                  required
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
                  onInput={() => {
                    setInitialState({
                      ...initialState,
                      teachingExperience: true,
                    });
                  }}
                  id="teachingExperience-2"
                  type="radio"
                  value=""
                  name="teachingExperience"
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
          <div
            className={`w-full ${
              !initialState?.teachingExperience && "hidden"
            } my-5`}
          >
            <div>
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Years Of Experience
              </label>
              <input
                type="number"
                {...register("experienceYears")}
                className={`shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
                value={initialState?.yearsOfExperience}
                placeholder="Years Of Experience"
                onChange={(e) => {
                  setInitialState({
                    ...initialState,
                    yearsOfExperience: e.target.value,
                  });
                }}
                onKeyDown={handleRemoveMinus}
              />
              {!initialState?.yearsOfExperience && errors.experienceYears && (
                <p className="text-red-500 text-sm absolute">
                  {errors?.experienceYears}
                </p>
              )}
            </div>
            {/* note */}
            <div
              className={`${
                !initialState?.teachingExperience && "hidden"
              } mt-10`}
            >
              <Note
                text={`How many students & classes have you taught before? E.g- I taught so far-STD-5(2), STD-8(1), O LEVEL(4) Edexcel-PMath, Phy, Acco, A LEVEL(3)Cambridge-Fp1p3, Che, Econ, SSC(2)-Maths, Bio)`}
              />
            </div>
            <div className="mt-5">
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Teaching History
              </label>
              <textarea
                {...register("teachingHistory")}
                className={`shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light `}
                value={initialState?.teachingHistory}
                onChange={(e) => {
                  setInitialState({
                    ...initialState,
                    teachingHistory: e.target.value,
                  });
                }}
                placeholder="Teaching History"
              />
              {!initialState?.teachingHistory && errors.teachingHistory && (
                <p className="text-red-500 text-sm absolute">
                  {errors?.teachingHistory}
                </p>
              )}
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
                if (!initialState?.tutoringPlaces.includes(selectedValue)) {
                  setInitialState({
                    ...initialState,
                    tutoringPlaces: [
                      ...initialState?.tutoringPlaces,
                      selectedValue,
                    ],
                  });
                }
              }}
            >
              <option value="" disabled>
                Choose Place
              </option>
              {allTutoringPlaces?.map((item, idx) => (
                <option
                  key={idx}
                  value={item?.placeName}
                  className="capitalize"
                >
                  {item?.placeName}
                </option>
              ))}
            </select>
            {!initialState?.tutoringPlaces?.length &&
              customErrors?.tutoringPlace && (
                <p className="text-red-500 text-sm absolute">
                  {customErrors?.tutoringPlace}
                </p>
              )}
            <div className="flex flex-wrap mt-3 gap-2">
              {initialState?.tutoringPlaces?.map((item, idx) => (
                <div
                  onClick={() => {
                    let selectedPlace;
                    selectedPlace = initialState?.tutoringPlaces.filter(
                      (sub, index) => item[idx] !== sub[index]
                    );

                    setInitialState({
                      ...initialState,
                      tutoringPlaces: selectedPlace,
                    });
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
                if (!initialState?.studentVariants.includes(selectedValue)) {
                  setInitialState({
                    ...initialState,
                    studentVariants: [
                      ...initialState?.studentVariants,
                      selectedValue,
                    ],
                  });
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
            {!initialState?.studentVariants?.length &&
              customErrors?.studentVariant && (
                <p className="text-red-500 text-sm absolute">
                  {customErrors?.studentVariant}
                </p>
              )}
            <div className="flex flex-wrap mt-3 gap-2">
              {initialState?.studentVariants?.map((item, idx) => (
                <div
                  onClick={() => {
                    let selectedVariants;
                    selectedVariants = initialState?.studentVariants.filter(
                      (sub, index) => item[idx] !== sub[index]
                    );

                    setInitialState({
                      ...initialState,
                      studentVariants: selectedVariants,
                    });
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
                {...register("minExpectedSalary")}
                className={`shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light `}
                value={initialState?.minExpectedSalary}
                onChange={(e) => {
                  setInitialState({
                    ...initialState,
                    minExpectedSalary: e.target.value,
                  });
                }}
                placeholder="Min Expected Salary"
                onKeyDown={handleRemoveMinus}
              />
              {!initialState?.minExpectedSalary && errors.minExpectedSalary && (
                <p className="text-red-500 text-sm absolute">
                  {errors?.minExpectedSalary}
                </p>
              )}
            </div>
            <span className="w-20 text-center mt-8">to</span>
            <div className="w-full">
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Max Expected Salary
              </label>
              <input
                type="number"
                {...register("maxExpectedSalary")}
                className={`shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light `}
                value={initialState?.maxExpectedSalary}
                placeholder="Max Expected Salary"
                onChange={(e) => {
                  setInitialState({
                    ...initialState,
                    maxExpectedSalary: e.target.value,
                  });
                }}
                onKeyDown={handleRemoveMinus}
              />
              {!initialState?.maxExpectedSalary && errors.maxExpectedSalary && (
                <p className="text-red-500 text-sm absolute">
                  {errors?.maxExpectedSalary}
                </p>
              )}
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
                if (!initialState?.tutoringLocations.includes(selectedValue)) {
                  setInitialState({
                    ...initialState,
                    tutoringLocations: [
                      ...initialState?.tutoringLocations,
                      selectedValue,
                    ],
                  });
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
            {!initialState?.tutoringLocations?.length &&
              customErrors?.tutoringLocation && (
                <p className="text-red-500 text-sm absolute">
                  {customErrors?.tutoringLocation}
                </p>
              )}
            <div className="flex flex-wrap mt-3 gap-2">
              {initialState?.tutoringLocations?.map((location, idx) => (
                <div
                  onClick={() => {
                    let selectedLocation;
                    selectedLocation = initialState?.tutoringLocations.filter(
                      (sub, index) => location[idx] !== sub[index]
                    );

                    setInitialState({
                      ...initialState,
                      tutoringLocations: selectedLocation,
                    });
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

            <JoditEditor
              ref={editor}
              value={initialState?.personalStatement}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => {
                setInitialState({
                  ...initialState,
                  personalStatement: newContent,
                });
              }}
            />
            {(!initialState?.personalStatement ||
              initialState?.personalStatement === "<p><br></p>") &&
              customErrors?.personalStatement && (
                <p className="text-red-500 text-sm absolute">
                  {customErrors?.personalStatement}
                </p>
              )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-4 mb-10 flex justify-end">
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

export default AdditionalTutoringInfo;
