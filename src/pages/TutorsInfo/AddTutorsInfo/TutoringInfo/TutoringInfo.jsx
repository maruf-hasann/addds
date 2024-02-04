import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { modifySubjectsForPost } from "../../../../libs/tutoringInfo/modifySubjectForPost";
import { filterObjectsFromArray } from "../../../../libs/tutoringInfo/filterObjectsFromArray";
import { useLazyGetAcademicInfoQuery } from "../../../../store/service/tutorInfo/academicInfo/academicInfoApiService";
import { useGetTutoringVariantsQuery } from "../../../../store/service/tutoringVariant/tutoringVariantApiService";
import { useGetSubjectVariantSubjectsQuery } from "../../../../store/service/subjectVariant/subjectVariantApiService";
import { useGetTutoringClassPMQuery } from "../../../../store/service/tutoringClassPM/tutoringClassPMApiService";
import { useGetCurriculumBoardsQuery } from "../../../../store/service/curriculumBoard/curriculumBoardApiService";
import { useSaveTutoringInfoMutation } from "../../../../store/service/tutorInfo/tutoringInfo/tutoringInfoApiService";
import SubjectCommonComponent from "./SubjectsCommonComponent/SubjectsCommonComponent";
import { isObjectInArray } from "../../../../libs/tutoringInfo/isObjectInArray";

const TutoringInfo = ({ setActiveTab }) => {
  const [number, setNumber] = useState(null);
  const [numberError, setNumberError] = useState(false);

  const [selectedTutoringSubjects, setSelectedTutoringSubjects] = useState([]);
  const [academicInfo, setAcademicInfo] = useState(null);
  const [tutoringVariants, setTutoringVariants] = useState([]);
  const [tutoringGrades, setTutoringGrades] = useState([]);
  const [tutoringCurriculum, setTutoringCurriculum] = useState([]);
  const [isTeachTestPaper, setIsTeachTestPaper] = useState(false);
  const [testPaperSubjects, setTestPaperSubjects] = useState([]);
  const [isTeachAdmissionTest, setIsTeachAdmissionTest] = useState(false);
  const [admissionTestSubjects, setAdmissionTestSubjects] = useState([]);
  const [isTeachEnrichment, setIsTeachEnrichment] = useState(false);
  const [enrichmentSubjects, setEnrichmentSubjects] = useState([]);
  const [isTeachProfessional, setIsTeachProfessional] = useState(false);
  const [professionalSubjects, setProfessionalSubjects] = useState([]);
  const [errors, setErrors] = useState({
    tutoringVariants: "",
    tutoringGrades: "",
    tutoringCurriculum: "",
    selectedTutoringSubjects: "",
    testPaperSubjects: "",
    admissionTestSubjects: "",
    enrichmentSubjects: "",
    professionalSubjects: "",
  });

  const commonSelectClassName =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-10 focus:outline-none";

  const { handleSubmit, register } = useForm();

  const [getAcademicInfo] = useLazyGetAcademicInfoQuery();

  const { data: allTutoringVariant } = useGetTutoringVariantsQuery();
  const variants = allTutoringVariant?.data;

  const { data: subjectListData } = useGetSubjectVariantSubjectsQuery();
  const allVariants = subjectListData?.data;
  const tutoringSubjectsList = allVariants?.find(
    (variant) => variant?.subjectVariant === "Academic"
  );
  const testPaperSubjectsList = allVariants?.find(
    (variant) => variant?.subjectVariant === "Test Preparation"
  );
  const admissionTestSubjectsList = allVariants?.find(
    (variant) => variant?.subjectVariant === "Admission Test "
  );
  const enrichmentSubjectsList = allVariants?.find(
    (variant) => variant?.subjectVariant === "Enrichment"
  );
  const professionalSubjectsList = allVariants?.find(
    (variant) => variant?.subjectVariant === "Professional"
  );

  const { data: allGradesData } = useGetTutoringClassPMQuery();
  const allGrades = allGradesData?.data;

  const filteredGrades = allGrades?.filter(
    (data) =>
      data?.educationVariant?.toLowerCase() ===
      academicInfo?.educationVariant?.toLowerCase()
  );

  const { data: allCurriculumBoardData } = useGetCurriculumBoardsQuery();
  const allCurriculumBoards = allCurriculumBoardData?.data;
  const filteredCurriculumBoards = allCurriculumBoards?.filter(
    (data) =>
      data?.educationVariant?.toLowerCase() ===
      academicInfo?.educationVariant?.toLowerCase()
  );

  // fetch academic info
  useEffect(() => {
    if (number) {
      const fetch = async () => {
        const result = await getAcademicInfo(number?.substring(1));
        if (result?.data?.success) {
          const academicInfo = result?.data?.data;
          console.log(academicInfo);
          setAcademicInfo(academicInfo);
        }
      };

      fetch();
    }
  }, [number]);

  const [saveTutoringInfo, { isLoading }] = useSaveTutoringInfoMutation();

  // get previous tab number
  useEffect(() => {
    const number = localStorage.getItem("tutor-number");
    setNumber(number);
  }, []);

  // handle check valid number or not
  useEffect(() => {
    if (number && !isValidPhoneNumber(number) && number?.length < 14) {
      setNumberError(true);
    }
  }, [number]);

  // handle submit function
  const onSubmit = async () => {
    if (!tutoringVariants.length)
      return setErrors({
        ...errors,
        tutoringVariants: "Tutoring variant is required",
      });
    if (isTeachTestPaper && !testPaperSubjects.length)
      return setErrors({
        ...errors,
        testPaperSubjects: "Test paper subject is required",
      });
    if (isTeachAdmissionTest && !admissionTestSubjects.length)
      return setErrors({
        ...errors,
        admissionTestSubjects: "Admission test subject is required",
      });
    if (isTeachEnrichment && !enrichmentSubjects.length)
      return setErrors({
        ...errors,
        enrichmentSubjects: "Enrichment subject is required",
      });

    if (isTeachProfessional && !professionalSubjects.length)
      return setErrors({
        ...errors,
        professionalSubjects: "Professional subject is required",
      });

    if (!tutoringGrades?.length)
      return setErrors({
        ...errors,
        tutoringGrades: "Tutoring grade is required",
      });

    if (!tutoringCurriculum?.length)
      return setErrors({
        ...errors,
        tutoringCurriculum: "Tutoring curriculum is required",
      });
    if (!selectedTutoringSubjects?.length)
      return setErrors({
        ...errors,
        selectedTutoringSubjects: "Tutoring subject is required",
      });

    const tutoringData = {
      phoneNumber: number?.substring(1),
      tutoringVariant: tutoringVariants,
      tutoringGrade: tutoringGrades,
      tutoringCurriculum,
      tutoringSubjects: modifySubjectsForPost(selectedTutoringSubjects),
      isTeachTestPapers: isTeachTestPaper,
      teachTestPapers: isTeachTestPaper
        ? modifySubjectsForPost(testPaperSubjects)
        : [],
      isTeachAdmissionTest,
      teachAdmissionTest: isTeachAdmissionTest
        ? modifySubjectsForPost(admissionTestSubjects)
        : [],
      isTeachEnrichment,
      teachEnrichment: isTeachEnrichment
        ? modifySubjectsForPost(enrichmentSubjects)
        : [],
      isTeachProfessional,
      teachProfessional: isTeachProfessional
        ? modifySubjectsForPost(professionalSubjects)
        : [],
    };

    const result = await saveTutoringInfo(tutoringData);

    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setNumberError(false)
      setSelectedTutoringSubjects([])
      setAcademicInfo(null)
      setTutoringVariants([])
      setTutoringGrades([])
      setTutoringCurriculum([])
      setIsTeachTestPaper(false)
      setTestPaperSubjects([]) 
      setIsTeachAdmissionTest(false)
      setAdmissionTestSubjects([])
      setIsTeachEnrichment(false)
      setEnrichmentSubjects([])
      setIsTeachProfessional(false)
      setProfessionalSubjects([])
      setActiveTab(5);
      setErrors({
        tutoringVariants: "",
        tutoringGrades: "",
        tutoringCurriculum: "",
        selectedTutoringSubjects: "",
        testPaperSubjects: "",
        admissionTestSubjects: "",
        enrichmentSubjects: "",
        professionalSubjects: "",
      });
    } else {
      toast.error(result?.error?.data?.message);
      setErrors({
        tutoringVariants: "",
        tutoringGrades: "",
        tutoringCurriculum: "",
        selectedTutoringSubjects: "",
        testPaperSubjects: "",
        admissionTestSubjects: "",
        enrichmentSubjects: "",
        professionalSubjects: "",
      });
    }
  };

  return (
    <>
      <div className="p-2 lg:p-10">
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
          {/* Tutoring Variant */}
          <div className={`w-full  my-10`}>
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Choose Tutoring Variant
            </label>
            <select
              {...register("tutoringVariant")}
              defaultValue=""
              className={commonSelectClassName}
              onChange={(event) => {
                const selectedValue = JSON.parse(event.target.value);
                if (!isObjectInArray(tutoringVariants, selectedValue)) {
                  setTutoringVariants([...tutoringVariants, selectedValue]);
                }
              }}
            >
              <option value="" disabled>
                Choose Variant
              </option>
              {variants?.map((variant, idx) => (
                <option
                  key={idx}
                  value={JSON.stringify({ variantName: variant?.variantName })}
                >
                  {variant?.variantName}
                </option>
              ))}
            </select>
            {!tutoringVariants?.length && errors.tutoringVariants && (
              <p className="text-red-500 text-sm absolute">
                {errors.tutoringVariants}
              </p>
            )}
            <div className="flex flex-wrap mt-3 gap-2">
              {tutoringVariants?.map((item, idx) => (
                <div
                  onClick={() => {
                    let selectedVariant;
                    selectedVariant = filterObjectsFromArray(
                      tutoringVariants,
                      item
                    );
                    setTutoringVariants(selectedVariant);
                  }}
                  key={idx}
                  className="flex items-center justify-between gap-5 bg-gray-100 mb-1"
                >
                  <div className="py-1 pl-3 text-sm font-semibold text-gray-500 capitalize whitespace-nowrap">
                    <span className="mr-2">{idx + 1}</span>
                    {item?.variantName}
                  </div>
                  <div className="hover:bg-red-500 h-full w-full flex justify-center items-center rounded-r px-1 cursor-pointer text-red-500 hover:text-white transition-colors duration-200">
                    <RxCross2 className="h-5 w-5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tutoring Grade */}
          <div className={`w-full  my-10`}>
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Choose Tutoring Grade
            </label>
            <select
              {...register("tutoringGrade")}
              defaultValue=""
              className={commonSelectClassName}
              onChange={(event) => {
                const selectedValue = JSON.parse(event.target.value);
                if (!isObjectInArray(tutoringGrades, selectedValue)) {
                  setTutoringGrades([...tutoringGrades, selectedValue]);
                }
              }}
            >
              <option value="" disabled>
                Choose Grade
              </option>
              {filteredGrades?.map((grade, idx) => (
                <option
                  key={idx}
                  value={JSON.stringify({ gradeName: grade?.className })}
                >
                  {grade?.className}
                </option>
              ))}
            </select>
            {!tutoringGrades?.length && errors.tutoringGrades && (
              <p className="text-red-500 text-sm absolute">
                {errors.tutoringGrades}
              </p>
            )}
            <div className="flex flex-wrap mt-3 gap-2">
              {tutoringGrades?.map((item, idx) => (
                <div
                  onClick={() => {
                    let selectedGrade;
                    selectedGrade = filterObjectsFromArray(
                      tutoringGrades,
                      item
                    );
                    setTutoringGrades(selectedGrade);
                  }}
                  key={idx}
                  className="flex items-center justify-between gap-5 bg-gray-100 mb-1"
                >
                  <div className="py-1 pl-3 text-sm font-semibold text-gray-500 capitalize whitespace-nowrap">
                    <span className="mr-2">{idx + 1}</span>
                    {item?.gradeName}
                  </div>
                  <div className="hover:bg-red-500 h-full w-full flex justify-center items-center rounded-r px-1 cursor-pointer text-red-500 hover:text-white transition-colors duration-200">
                    <RxCross2 className="h-5 w-5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tutoring Curriculum */}
          <div className={`w-full  my-10`}>
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Choose Tutoring Curriculum
            </label>
            <select
              {...register("tutoringCurriculum")}
              defaultValue=""
              className={commonSelectClassName}
              onChange={(event) => {
                const selectedValue = JSON.parse(event.target.value);
                if (!isObjectInArray(tutoringCurriculum, selectedValue)) {
                  setTutoringCurriculum([...tutoringCurriculum, selectedValue]);
                }
              }}
            >
              <option value="" disabled>
                Choose Tutoring Curriculum
              </option>
              {filteredCurriculumBoards?.map((board, idx) => (
                <option
                  key={idx}
                  value={JSON.stringify({ curriculumBoard: board?.boardName })}
                >
                  {board?.boardName}
                </option>
              ))}
            </select>
            {!tutoringCurriculum?.length && errors.tutoringCurriculum && (
              <p className="text-red-500 text-sm absolute">
                {errors.tutoringCurriculum}
              </p>
            )}
            <div className="flex flex-wrap mt-3 gap-2">
              {tutoringCurriculum?.map((item, idx) => (
                <div
                  onClick={() => {
                    let selectedBoard;
                    selectedBoard = filterObjectsFromArray(
                      tutoringCurriculum,
                      item
                    );
                    setTutoringCurriculum(selectedBoard);
                  }}
                  key={idx}
                  className="flex items-center justify-between gap-5 bg-gray-100 mb-1"
                >
                  <div className="py-1 pl-3 text-sm font-semibold text-gray-500 capitalize whitespace-nowrap">
                    <span className="mr-2">{idx + 1}</span>
                    {item?.curriculumBoard}
                  </div>
                  <div className="hover:bg-red-500 h-full w-full flex justify-center items-center rounded-r px-1 cursor-pointer text-red-500 hover:text-white transition-colors duration-200">
                    <RxCross2 className="h-5 w-5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* tutoring nested subject subSubject */}
          {tutoringSubjectsList?.subjectsList?.length > 0 ? (
            <SubjectCommonComponent
              allSubjects={tutoringSubjectsList?.subjectsList}
              selectedSubjects={selectedTutoringSubjects}
              setSelectedSubjects={setSelectedTutoringSubjects}
              subjectError={errors.selectedTutoringSubjects}
              componentName={"Tutoring"}
            />
          ) : (
            ""
          )}

          {/* Teach Test Paper */}
          <div className="my-10">
            {/* Test Paper radio box */}
            <div>
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Can you Teach Test Paper?
              </label>
              <div className={`flex gap-10 items-center mb-3`}>
                <div className="flex ">
                  <input
                    onInput={() => setIsTeachTestPaper(true)}
                    id="teachTestPaper-1"
                    type="radio"
                    name="teachTestPaper"
                    
                    className="w-4 h-4"
                    required
                  />
                  <label
                    htmlFor="teachTestPaper"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Yes
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    onInput={() => setIsTeachTestPaper(false)}
                    id="teachTestPaper-2"
                    type="radio"
                    value=""
                    name="teachTestPaper"
                    
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="teachTestPaper-2"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>

            {/* test paper nested subject subSubject */}
            {isTeachTestPaper &&
            testPaperSubjectsList?.subjectsList?.length > 0 ? (
              <SubjectCommonComponent
                allSubjects={testPaperSubjectsList?.subjectsList}
                selectedSubjects={testPaperSubjects}
                setSelectedSubjects={setTestPaperSubjects}
                subjectError={errors?.testPaperSubjects}
                componentName={"Test Paper"}
              />
            ) : (
              ""
            )}
          </div>

          {/* Teach Admission Test */}
          <div className="my-10">
            {/* Admission Test radio box */}
            <div>
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Can you Teach Admission Test?
              </label>
              <div className={`flex gap-10 items-center mb-3`}>
                <div className="flex">
                  <input
                    onClick={() => setIsTeachAdmissionTest(true)}
                    id="teachAdmissionTest-1"
                    type="radio"
                    name="teachAdmissionTest"
                 
                    className="w-4 h-4"
                    required
                  />
                  <label
                    htmlFor="teachAdmissionTest-1"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Yes
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    onClick={() => setIsTeachAdmissionTest(false)}
                    id="teachAdmissionTest-2"
                    type="radio"
                    name="teachAdmissionTest"
                  
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="teachAdmissionTest-2"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>
            {/* admission test nested subject subSubject */}
            {isTeachAdmissionTest &&
            admissionTestSubjectsList?.subjectsList?.length > 0 ? (
              <SubjectCommonComponent
                allSubjects={admissionTestSubjectsList?.subjectsList}
                selectedSubjects={admissionTestSubjects}
                setSelectedSubjects={setAdmissionTestSubjects}
                subjectError={errors.admissionTestSubjects}
                componentName={"Admission Test"}
              />
            ) : (
              ""
            )}
          </div>

          {/* Teach Enrichment */}
          <div className="my-10">
            {/* Enrichment radio box */}
            <div>
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Can you Teach Enrichment?
              </label>
              <div className={`flex gap-10 items-center mb-3`}>
                <div className="flex">
                  <input
                    onClick={() => setIsTeachEnrichment(true)}
                    id="teachEnrichment-1"
                    type="radio"
                    name="teachEnrichment"
  
                    className="w-4 h-4"
                    required
                  />
                  <label
                    htmlFor="teachEnrichment-1"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Yes
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    onClick={() => setIsTeachEnrichment(false)}
                    id="teachEnrichment-2"
                    type="radio"
                    name="teachEnrichment"
          
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="teachEnrichment-2"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>
            {/* admission test nested subject subSubject */}
            {isTeachEnrichment &&
            enrichmentSubjectsList?.subjectsList?.length > 0 ? (
              <SubjectCommonComponent
                allSubjects={enrichmentSubjectsList?.subjectsList}
                selectedSubjects={enrichmentSubjects}
                setSelectedSubjects={setEnrichmentSubjects}
                subjectError={errors?.enrichmentSubjects}
                componentName={"Enrichment"}
              />
            ) : (
              ""
            )}
          </div>

          {/* Teach Professional */}
          <div className="my-10">
            {/* Professional radio box */}
            <div>
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Can you Teach Professional?
              </label>
              <div className={`flex gap-10 items-center mb-3`}>
                <div className="flex">
                  <input
                    onClick={() => setIsTeachProfessional(true)}
                    id="teachProfessional-1"
                    type="radio"
                    name="teachProfessional"
            
                    className="w-4 h-4"
                    required
                  />
                  <label
                    htmlFor="teachProfessional-1"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Yes
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    onClick={() => setIsTeachProfessional(false)}
                    id="teachProfessional-2"
                    type="radio"
                    name="teachProfessional"
            
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="teachProfessional-2"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>
            {/* admission test nested subject subSubject */}
            {isTeachProfessional &&
            professionalSubjectsList?.subjectsList?.length > 0 ? (
              <SubjectCommonComponent
                allSubjects={professionalSubjectsList?.subjectsList}
                selectedSubjects={professionalSubjects}
                setSelectedSubjects={setProfessionalSubjects}
                subjectError={errors?.professionalSubjects}
                componentName={"Professional"}
              />
            ) : (
              ""
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-4 mb-10">
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
    </>
  );
};

export default TutoringInfo;
