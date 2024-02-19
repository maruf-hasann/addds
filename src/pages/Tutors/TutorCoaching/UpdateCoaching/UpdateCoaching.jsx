import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { useEffect, useState } from "react";

import { checkFalsyFromObjAndReturn } from "../../../../libs/checkFalsyFromObjAndReturn";
import { formatFieldName } from "../../../../libs/formatFieldName";
import { subjectConverter } from "../../../../libs/tutoringInfo/subjectConverter";
import { modifySubjectsForPost } from "../../../../libs/tutoringInfo/modifySubjectForPost";
import { sortDataByCreatedAt } from "../../../../libs/sortDataByCreatedAt";

import { useUpdateCoachingMutation } from "../../../../store/service/tutorInfo/coaching/coachingApiService";
import {
  useGetSubjectVariantQuery,
  useGetSubjectVariantSubjectsQuery,
} from "../../../../store/service/subjectVariant/subjectVariantApiService";
import { useGetCurriculumBoardsQuery } from "../../../../store/service/curriculumBoard/curriculumBoardApiService";
import { useGetTutoringClassPMQuery } from "../../../../store/service/tutoringClassPM/tutoringClassPMApiService";

import AboutClassAndProgramDetails from "./AboutClassAndProgramDetails/AboutClassAndProgramDetails";
import CoachingFeeAndDuration from "./CoachingFeeAndDuration/CoachingFeeAndDuration";
import StartingDateAndCoachingPlace from "./StartingDateAndCoachingPlace/StartingDateAndCoachingPlace";
import TutoringVariantAndGender from "./TutoringVariantAndGender/TutoringVariantAndGender";
import EligibleFor from "./EligibleFor/EligibleFor";
import { RxCross2 } from "react-icons/rx";
import EducationVariantCurriculumBoardAndTutoringGrade from "./EducationVariantCurriculumBoardAndTutoringGradeCurriculumBoardAndTutoringGrade/EducationVariantCurriculumBoardAndTutoringGrade";
import SubjectCommonComponent from "../../../../components/Shared/SubjectsCommonComponent/SubjectsCommonComponent";
import { commonInputClassName } from "../../../../libs/commonInputClassName";
import { useGetEducationVariantsQuery } from "../../../../store/service/educationVariant/educationVariantApiService";

const UpdateCoachingModal = ({
  isOpenModal,
  setIsOpenModal,
  coaching,
  setCoaching,
}) => {
  const [selectedTutoringGrades, setSelectedTutoringGrades] = useState([]);
  const [selectedTutoringSubjects, setSelectedTutoringSubjects] = useState([]);
  const [selectedEligiblesFor, setSelectedEligiblesFor] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialState, setInitialState] = useState({
    title: "",
    educationVariant: "",
    tutoringVariant: "",
    curriculumBoard: "",
    coachingFee: "",
    duration: "",
    aboutCoaching: "",
    programDetails: "",
    startingDate: "",
    feeVariation: "",
    gender: "",
  });
  const [customErrors, setCustomErrors] = useState({
    tutoringGrades: "",
    tutoringSubjects: "",
    programDetails: "",
    eligibleFor: "",
  });

  const requiredFields = [
    "tutoringGrades",
    "tutoringSubjects",
    "programDetails",
    "eligibleFor",
  ];

  const eligiblesFor = [
    { name: "Children" },
    { name: "Young" },
    { name: "Adult" },
  ];

  const [updateCoaching] = useUpdateCoachingMutation();

  const { data: allEducationVariantData } = useGetEducationVariantsQuery();
  const educationVariants = allEducationVariantData?.data;

  const { data: allTutoringVariant } = useGetSubjectVariantQuery();

  let tutoringVariants;
  if (Array.isArray(allTutoringVariant?.data)) {
    tutoringVariants = sortDataByCreatedAt(allTutoringVariant?.data);
  } else {
    tutoringVariants = allTutoringVariant?.data;
  }

  const { data: allCurriculumBoardData } = useGetCurriculumBoardsQuery();
  const curriculumBoards = allCurriculumBoardData?.data?.filter(
    (curriculumBoard) =>
      curriculumBoard?.educationVariant === initialState?.educationVariant
  );

  const { data: subjectListData } = useGetSubjectVariantSubjectsQuery();
  const allVariants = subjectListData?.data;
  const tutoringSubjectsList = allVariants?.find(
    (variant) => variant?.subjectVariant === initialState?.tutoringVariant
  );

  const { data: allGradesData } = useGetTutoringClassPMQuery();
  const tutoringGrades = allGradesData?.data?.filter(
    (data) =>
      data?.educationVariant?.toLowerCase() ===
      initialState?.educationVariant?.toLowerCase()
  );

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  // handle close modal
  const handleClose = () => {
    setIsOpenModal(!isOpenModal);
    setCoaching(null);
  };

  const handleUpdateCoaching = async (data) => {
    const formData = {
      tutoringGrades:
        initialState?.tutoringVariant !== "Academic"
          ? true
          : selectedTutoringGrades?.length
          ? true
          : false,
      tutoringSubjects: selectedTutoringSubjects?.length ? true : false,
      programDetails: initialState?.programDetails,
      eligibleFor:
        initialState?.tutoringVariant === "Academic"
          ? true
          : selectedEligiblesFor?.length
          ? true
          : false,
    };

    let isSuccess = true;
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        setCustomErrors((prevErrors) => ({
          ...prevErrors,
          [field]: `${formatFieldName(field)} is required`,
        }));
        isSuccess = false; // Set the flag to false if any field is missing
      } else if (formData[field]) {
        setCustomErrors((prevErrors) => ({
          ...prevErrors,
          [field]: "",
        }));
      }
    });

    if (isSuccess) {
      // Call the function only if the loop successfully completed without missing fields
      isSuccess = checkFalsyFromObjAndReturn(customErrors);
    }
    if (!isSuccess) {
      // console.log("not success");
      return;
    }
    setIsLoading(true);

    // create coaching
    const coachingData = {
      phoneNumber: coaching?.phoneNumber,
      title: initialState?.title,
      educationVariant:
        initialState?.tutoringVariant !== "Academic"
          ? ""
          : initialState?.educationVariant,
      coachingVariant: initialState?.tutoringVariant,
      curriculumBoard:
        initialState?.tutoringVariant === "Academic"
          ? initialState?.curriculumBoard
          : "",
      grade:
        initialState?.tutoringVariant === "Academic"
          ? selectedTutoringGrades?.map((grade) => {
              return { className: grade?.gradeName };
            })
          : [],
      subjectsList: modifySubjectsForPost(selectedTutoringSubjects),
      aboutCoaching: initialState?.aboutCoaching,
      programDetails: initialState?.programDetails,
      coachingFee: Number(initialState?.coachingFee),
      coachingPlace: initialState?.coachingPlace,
      duration:
        Number(initialState?.duration) === 0 ||
        Number(initialState?.duration) === 1
          ? `${initialState?.duration} Month`
          : `${initialState?.duration} Months`,
      startingDate: initialState?.startingDate,
      eligibleFor:
        initialState?.tutoringVariant === "Academic"
          ? []
          : selectedEligiblesFor,
      gender: initialState?.gender,
      feeVariation:
        Number(initialState?.coachingFee) === 0
          ? ""
          : initialState?.feeVariation,
    };

    const createCoachingResult = await updateCoaching({
      data: coachingData,
      id: coaching?.coachingId,
    });
    if (createCoachingResult?.data?.success) {
      toast.success(createCoachingResult?.data?.message);
      setIsLoading(false);
      setSelectedTutoringGrades([]);
      setSelectedTutoringSubjects([]);
      setSelectedEligiblesFor([]);
      reset();
      setInitialState({
        title: "",
        educationVariant: "",
        tutoringVariant: "",
        curriculumBoard: "",
        coachingFee: "",
        duration: "",
        aboutCoaching: "",
        programDetails: "",
        startingDate: "",
        feeVariation: "",
        gender: "",
      });
      setCustomErrors({
        tutoringGrades: "",
        tutoringSubjects: "",
        programDetails: "",
        eligibleFor: "",
      });
      setIsOpenModal(!isOpenModal);
      setCoaching(null);
    } else {
      setIsLoading(false);
      return toast.error(
        createCoachingResult?.error?.data?.message || "Something went wrong"
      );
    }
  };

  useEffect(() => {
    if (coaching) {
      setSelectedTutoringGrades(
        coaching.grade?.map((grade) => {
          return { gradeName: grade?.className };
        })
      );
      // console.log(subjectConverter(coaching?.subjectsList));
      setSelectedTutoringSubjects(subjectConverter(coaching?.subjectsList));
      setSelectedEligiblesFor(coaching?.eligibleFor || []);
      setInitialState({
        ...initialState,
        title: coaching?.title,
        educationVariant: coaching.educationVariant,
        tutoringVariant: coaching.coachingVariant,
        curriculumBoard: coaching?.curriculumBoard,
        coachingFee: coaching?.coachingFee,
        duration: coaching?.duration.charAt(0),
        startingDate: coaching?.startingDate,
        coachingPlace: coaching?.coachingPlace,
        aboutCoaching: coaching.aboutCoaching,
        programDetails: coaching.programDetails,
        feeVariation: coaching?.feeVariation,
        gender: coaching?.gender,
      });
    }
  }, [coaching]);

  return (
    <div
      className={`fixed top-[72px] left-0 z-50 p-4 inset-0 flex items-center justify-center backdrop-blur-sm ${
        isOpenModal ? "block" : "hidden"
      }`}
    >
      <div
        className="w-full h-full z-0 absolute top-0 left-0"
        onClick={handleClose}
      ></div>
      <div className="relative z-50 w-full max-w-5xl max-h-full mx-auto overflow-y-auto bg-white rounded-lg shadow-md">
        <div className={`relative shadow bg-white w-full `}>
          <div className="px-4 py-3 border-b sticky top-0 z-50 backdrop-filter backdrop-blur-sm">
            <div className="overflow-hidden">
              {initialState?.title ? (
                <p
                  className={`font-semibold whitespace-nowrap ${
                    !initialState?.title && "h-5"
                  }`}
                >
                  {initialState?.title}
                </p>
              ) : (
                <p className="font-semibold">Update Coaching</p>
              )}
            </div>{" "}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 text-2xl hover:text-red-500"
            >
              <RxCross2 />
            </button>
          </div>
          <div className="py-8 px-10">
            <form onSubmit={handleSubmit(handleUpdateCoaching)}>
              <div className="mb-10 grid grid-cols-1 gap-8">
                {/* title */}
                <div className="w-full">
                  <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                    Coaching Title *
                  </label>
                  <input
                    type="text"
                    {...register("title", {
                      required: initialState?.title
                        ? false
                        : "Coaching title is required",
                    })}
                    className={commonInputClassName}
                    value={initialState?.title}
                    onChange={(e) =>
                      setInitialState({
                        ...initialState,
                        title: e.target.value,
                      })
                    }
                    placeholder="HSC 25 Online Batch (Physic, Chemistry, Biology)"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm absolute">
                      {errors?.title?.message}
                    </p>
                  )}
                </div>
                {/* education variant & tutoring variant */}
                <TutoringVariantAndGender
                  errors={errors}
                  initialState={initialState}
                  register={register}
                  setInitialState={setInitialState}
                  setSelectedTutoringSubjects={setSelectedTutoringSubjects}
                  tutoringVariants={tutoringVariants}
                />

                {/* curriculum board & tutoring variant */}
                {initialState?.tutoringVariant === "Academic" ? (
                  <EducationVariantCurriculumBoardAndTutoringGrade
                    curriculumBoards={curriculumBoards}
                    errors={errors}
                    customErrors={customErrors}
                    initialState={initialState}
                    register={register}
                    selectedTutoringGrades={selectedTutoringGrades}
                    setSelectedTutoringGrades={setSelectedTutoringGrades}
                    tutoringGrades={tutoringGrades}
                    educationVariants={educationVariants}
                    setInitialState={setInitialState}
                  />
                ) : (
                  ""
                )}

                {/* tutoring subject */}
                {tutoringSubjectsList?.subjectsList?.length > 0 ? (
                  <div className="relative">
                    <SubjectCommonComponent
                      allSubjects={tutoringSubjectsList?.subjectsList}
                      selectedSubjects={selectedTutoringSubjects}
                      setSelectedSubjects={setSelectedTutoringSubjects}
                      subjectError={errors.selectedTutoringSubjects}
                      componentName={"Coaching"}
                    />
                    {!selectedTutoringSubjects?.length &&
                      customErrors?.tutoringSubjects && (
                        <p className="text-red-500 text-sm absolute">
                          {customErrors.tutoringSubjects}
                        </p>
                      )}
                  </div>
                ) : (
                  ""
                )}

                {/* coaching fee and coaching duration */}
                <CoachingFeeAndDuration
                  errors={errors}
                  register={register}
                  initialState={initialState}
                  setInitialState={setInitialState}
                />

                {initialState?.tutoringVariant &&
                initialState?.tutoringVariant !== "Academic" ? (
                  <EligibleFor
                    customErrors={customErrors}
                    eligiblesFor={eligiblesFor}
                    selectedEligiblesFor={selectedEligiblesFor}
                    setSelectedEligiblesFor={setSelectedEligiblesFor}
                  />
                ) : (
                  ""
                )}

                {/* coaching place and starting date */}
                <StartingDateAndCoachingPlace
                  initialState={initialState}
                  setInitialState={setInitialState}
                  errors={errors}
                  register={register}
                />

                {/* about class and program details */}
                <AboutClassAndProgramDetails
                  initialState={initialState}
                  setInitialState={setInitialState}
                  customErrors={customErrors}
                  errors={errors}
                  register={register}
                />
              </div>

              {/* Submit Button */}
              <div className="mt-4 mb-10 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-offset-2 focus:border-blue-300"
                >
                  {isLoading ? (
                    <ImSpinner9 className="animate-spin my-1 mx-2.5" />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCoachingModal;
