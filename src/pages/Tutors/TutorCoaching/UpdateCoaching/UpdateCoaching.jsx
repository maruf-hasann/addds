import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegCircleXmark } from "react-icons/fa6";
import { ImSpinner9 } from "react-icons/im";
import toast from "react-hot-toast";

import {
  useDeleteCoachingMediaMutation,
  useUpdateCoachingMutation,
  useUploadCoachingMediaMutation,
} from "../../../../store/service/tutorInfo/coaching/coachingApiService";
import { useGetEducationVariantsQuery } from "../../../../store/service/educationVariant/educationVariantApiService";
import {
  useGetSubjectVariantQuery,
  useGetSubjectVariantSubjectsQuery,
} from "../../../../store/service/subjectVariant/subjectVariantApiService";
import { useGetCurriculumBoardsQuery } from "../../../../store/service/curriculumBoard/curriculumBoardApiService";
import { useGetTutoringClassPMQuery } from "../../../../store/service/tutoringClassPM/tutoringClassPMApiService";

import SubjectCommonComponent from "../../../../components/Shared/SubjectsCommonComponent/SubjectsCommonComponent";
import AboutClassAndProgramDetails from "./AboutClassAndProgramDetails/AboutClassAndProgramDetails";
import EducationVariantAndTutoringVariant from "./EducationVariantAndTutoringVariant/EducationVariantAndTutoringVariant";
import CurriculumBoardAndTutoringGrade from "./CurriculumBoardAndTutoringGrade/CurriculumBoardAndTutoringGrade";
import CoachingFeeAndDuration from "./CoachingFeeAndDuration/CoachingFeeAndDuration";
import StartingDateAndCoachingPlace from "./StartingDateAndCoachingPlace/StartingDateAndCoachingPlace";
import ClassRoutine from "./ClassRoutine/ClassRoutine";
import FeatureImageVideo from "./FeatureImageVideo/FeatureImageVideo";

import { checkFalsyFromObjAndReturn } from "../../../../libs/checkFalsyFromObjAndReturn";
import { formatFieldName } from "../../../../libs/formatFieldName";
import { subjectConverter } from "../../../../libs/tutoringInfo/subjectConverter";
import { commonInputClassName } from "../../../../libs/commonInputClassName";
import { modifySubjectsForPost } from "../../../../libs/tutoringInfo/modifySubjectForPost";
import { sortDataByCreatedAt } from "../../../../libs/sortDataByCreatedAt";

const UpdateCoachingModal = ({
  isOpenModal,
  setIsOpenModal,
  coaching,
  setCoaching,
}) => {
  const [selectedTutoringGrades, setSelectedTutoringGrades] = useState([]);
  const [selectedTutoringSubjects, setSelectedTutoringSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialState, setInitialState] = useState({
    title: "",
    educationVariant: "",
    tutoringVariant: "",
    curriculumBoard: "",
    coachingFee: "",
    duration: "",
    aboutClass: "",
    programDetails: "",
    startingDate: "",
    uploadClassRoutineImage: null,
    classRoutineInText: "",
    routineImageUrl: null,
    classRoutineInImage: null,
    featuredMediaExtension: null,
    featuredMedia: null,
    featuredMediaUrl: null,
    routineImagePreview: null,
    featuredMediaPreview: null,
  });
  const [customErrors, setCustomErrors] = useState({
    tutoringGrades: "",
    tutoringSubjects: "",
    aboutClass: "",
    programDetails: "",
    classRoutineInText: "",
    classRoutineInImage: "",
    featuredMedia: "",
  });

  useEffect(() => {
    if (coaching) {
      setSelectedTutoringGrades(
        coaching.grade?.map((grade) => {
          return { gradeName: grade?.className };
        })
      );
      setSelectedTutoringSubjects(subjectConverter(coaching?.subjectsList));
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
        aboutClass: coaching.aboutCoaching,
        programDetails: coaching.programDetails,
        uploadClassRoutineImage: coaching?.classRoutingInImage ? true : false,
        classRoutineInText: coaching.classRoutingInText,
        routineImageUrl: coaching.classRoutingInImage,
        featuredMediaExtension:
          coaching?.featureMediaType === "video" ? "mp4" : "jpg",
        featuredMediaUrl: coaching.featureMediaUrl,
        routineImagePreview: coaching.classRoutingInImage,
        featuredMediaPreview: coaching.featureMediaUrl,
      });
    }
  }, [coaching]);

  const [uploadMedia] = useUploadCoachingMediaMutation();
  const [deleteMedia] = useDeleteCoachingMediaMutation();
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

  const handleUpdateCoaching = async (data) => {
    const formData = {
      tutoringGrades:
        initialState?.tutoringVariant !== "Academic"
          ? true
          : selectedTutoringGrades?.length
          ? true
          : false,
      tutoringSubjects: selectedTutoringSubjects?.length ? true : false,
      aboutClass: initialState?.aboutClass,
      programDetails: initialState?.programDetails,
      classRoutineInText: initialState?.uploadClassRoutineImage
        ? true
        : initialState?.classRoutineInText === "<p><br></p>"
        ? false
        : initialState?.classRoutineInText,
      classRoutineInImage: initialState?.uploadClassRoutineImage
        ? initialState?.classRoutineInImage || initialState?.routineImageUrl
        : true,
      featuredMedia:
        initialState?.featuredMedia || initialState?.featuredMediaUrl,
    };
    const requiredFields = [
      "tutoringGrades",
      "tutoringSubjects",
      "aboutClass",
      "programDetails",
      "classRoutineInText",
      "classRoutineInImage",
      "featuredMedia",
    ];

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
      console.log("not success");
      return;
    }

    let classRoutineImageUrl = null;
    let featuredMediaUrl = null;
    setIsLoading(true);

    // upload class routine image
    if (
      initialState?.uploadClassRoutineImage === true &&
      initialState?.classRoutineInImage
    ) {
      const classRoutineFormData = new FormData();
      classRoutineFormData.append("media", initialState?.classRoutineInImage);
      classRoutineFormData.append("extensions", "jpg");
      classRoutineFormData.append(
        "title",
        `Class Routine - ${initialState?.title} - ${coaching?.phoneNumber}`
      );

      const uploadClassRoutineResult = await uploadMedia(classRoutineFormData);
      if (uploadClassRoutineResult?.data?.success) {
        classRoutineImageUrl = uploadClassRoutineResult?.data?.data;
      } else {
        setIsLoading(false);
        return toast.error(
          uploadClassRoutineResult?.error?.data?.message ||
            "Something went wrong"
        );
      }
    } else if (initialState?.routineImageUrl) {
      classRoutineImageUrl = initialState?.routineImageUrl;
    }

    // upload featured media
    if (initialState?.featuredMedia) {
      const featuredMediaFormData = new FormData();
      featuredMediaFormData.append("media", initialState?.featuredMedia);
      featuredMediaFormData.append(
        "extensions",
        initialState?.featuredMediaExtension
      );
      featuredMediaFormData.append(
        "title",
        `Featured Media - ${initialState?.title} - ${coaching?.phoneNumber}`
      );
      const uploadFeaturedMediaResult = await uploadMedia(
        featuredMediaFormData
      );
      if (uploadFeaturedMediaResult?.data?.success) {
        featuredMediaUrl = uploadFeaturedMediaResult?.data?.data;
      } else {
        if (classRoutineImageUrl) {
          await deleteMedia({ url: classRoutineImageUrl });
        }
        setIsLoading(false);
        return toast.error(
          uploadFeaturedMediaResult?.error?.data?.message ||
            "Something went wrong"
        );
      }
    } else {
      featuredMediaUrl = initialState?.featuredMediaUrl;
    }

    // create coaching
    const coachingData = {
      phoneNumber: coaching?.phoneNumber,
      title: initialState?.title,
      educationVariant: initialState?.educationVariant,
      coachingVariant: initialState?.tutoringVariant,
      curriculumBoard:
        initialState?.tutoringVariant === "Academic"
          ? initialState?.curriculumBoard
          : undefined,
      grade:
        initialState?.tutoringVariant === "Academic"
          ? selectedTutoringGrades?.map((grade) => {
              return { className: grade?.gradeName };
            })
          : undefined,
      subjectsList: modifySubjectsForPost(selectedTutoringSubjects),
      aboutCoaching: initialState?.aboutClass,
      programDetails: initialState?.programDetails,
      coachingFee: Number(initialState?.coachingFee),
      coachingPlace: initialState?.coachingPlace,
      duration:
        Number(initialState?.duration) === 0 ||
        Number(initialState?.duration) === 1
          ? `${initialState?.duration} Month`
          : `${initialState?.duration} Months`,
      startingDate: initialState?.startingDate,
      classRoutingInText: initialState?.uploadClassRoutineImage
        ? ""
        : initialState?.classRoutineInText,
      classRoutingInImage: initialState?.uploadClassRoutineImage
        ? classRoutineImageUrl
        : "",

      featureMediaType:
        initialState?.featuredMediaExtension === "mp4" ? "video" : "image",
      featureMediaUrl: featuredMediaUrl,
    };

    console.log(coachingData);

    const createCoachingResult = await updateCoaching({
      data: coachingData,
      id: coaching?.coachingId,
    });
    if (createCoachingResult?.data?.success) {
      toast.success(createCoachingResult?.data?.message);
      setIsLoading(false);
      setSelectedTutoringGrades([]);
      setSelectedTutoringSubjects([]);
      reset();
      setInitialState({
        title: "",
        educationVariant: "",
        tutoringVariant: "",
        curriculumBoard: "",
        coachingFee: "",
        duration: "",
        aboutClass: "",
        programDetails: "",
        uploadClassRoutineImage: null,
        classRoutineInText: "",
        routineImageUrl: null,
        classRoutineInImage: null,
        featuredMediaExtension: null,
        featuredMedia: null,
        featuredMediaUrl: null,
        routineImagePreview: null,
        featuredMediaPreview: null,
      });
      setCustomErrors({
        tutoringGrades: "",
        tutoringSubjects: "",
        aboutClass: "",
        programDetails: "",
        classRoutineInText: "",
        classRoutineInImage: "",
        featuredMedia: "",
      });
      setIsOpenModal(!isOpenModal);
      setCoaching(null);
    } else {
      if (initialState?.featuredMedia) {
        await deleteMedia({ url: classRoutineImageUrl });
      }
      if (initialState?.classRoutineInImage) {
        await deleteMedia({ url: featuredMediaUrl });
      }
      setIsLoading(false);
      return toast.error(
        createCoachingResult?.error?.data?.message || "Something went wrong"
      );
    }
  };

  // handle close modal
  const handleClose = () => {
    setIsOpenModal(!isOpenModal);
    setCoaching(null);
  };

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
        <div className={`relative shadow px-10 bg-white w-full `}>
          {/* modal close button */}
          <button
            onClick={handleClose}
            type="button"
            className="absolute top-3 right-2.5 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <FaRegCircleXmark className="text-3xl text-red-400 hover:text-red-500" />
          </button>
          <div className="py-8">
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
                <EducationVariantAndTutoringVariant
                  educationVariants={educationVariants}
                  errors={errors}
                  initialState={initialState}
                  register={register}
                  setInitialState={setInitialState}
                  setSelectedTutoringSubjects={setSelectedTutoringSubjects}
                  tutoringVariants={tutoringVariants}
                />

                {/* curriculum board & tutoring variant */}
                {initialState?.tutoringVariant === "Academic" ? (
                  <CurriculumBoardAndTutoringGrade
                    curriculumBoards={curriculumBoards}
                    errors={errors}
                    customErrors={customErrors}
                    initialState={initialState}
                    register={register}
                    selectedTutoringGrades={selectedTutoringGrades}
                    setSelectedTutoringGrades={setSelectedTutoringGrades}
                    tutoringGrades={tutoringGrades}
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
                />
                <ClassRoutine
                  initialState={initialState}
                  register={register}
                  setInitialState={setInitialState}
                  errors={errors}
                  customErrors={customErrors}
                />
                <FeatureImageVideo
                  initialState={initialState}
                  setInitialState={setInitialState}
                  customErrors={customErrors}
                />
              </div>

              {/* Submit Button */}
              <div className="mt-4 mb-10 flex justify-end">
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
    </div>
  );
};

export default UpdateCoachingModal;
