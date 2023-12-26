import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLazyGetAcademicInfoQuery } from "../../../../../store/service/tutorInfo/academicInfo/academicInfoApiService";
import { useGetTutoringClassPMQuery } from "../../../../../store/service/tutoringClassPM/tutoringClassPMApiService";
import { useGetCurriculumBoardsQuery } from "../../../../../store/service/curriculumBoard/curriculumBoardApiService";
import { useLazyGetTutoringInfoQuery, useSaveTutoringInfoMutation, useUpdateTutoringInfoMutation } from "../../../../../store/service/tutorInfo/tutoringInfo/tutoringInfoApiService";
import toast from "react-hot-toast";
import { useGetTutoringVariantsQuery } from "../../../../../store/service/tutoringVariant/tutoringVariantApiService";
import { useGetSubjectVariantSubjectsQuery } from "../../../../../store/service/subjectVariant/subjectVariantApiService";
import NestedSubject from "../../../../../components/Shared/NestedSubject/NestedSubject";
import { CiCircleRemove } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

const EditTutoringInfo = () => {
  const { number } = useParams();
  const navigate = useNavigate();

  const [selectedTutoringSubjects, setSelectedTutoringSubjects] = useState([]);
  const [tutoringInfo, setTutoringInfo] = useState(null);
  const [academicInfo, setAcademicInfo] = useState(null);
  const [tutoringVariants, setTutoringVariants] = useState([]);
  const [tutoringGrades, setTutoringGrades] = useState([]);
  const [tutoringCurriculum, setTutoringCurriculum] = useState([]);

  const [isTeachTestPaper, setIsTeachTestPaper] = useState();
  const [testPaperSubjects, setTestPaperSubjects] = useState([]);

  const [isTeachAdmissionTest, setIsTeachAdmissionTest] = useState();
  const [admissionTestSubjects, setAdmissionTestSubjects] = useState([]);
  useState([]);

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

  const [getTutoringInfo] = useLazyGetTutoringInfoQuery();

  // fetch academic info
  useEffect(() => {
    if (number) {
      const fetch = async () => {
        const result = await getAcademicInfo(number);
        if (result?.data?.success) {
          const academicInfo = result?.data?.data;
          setAcademicInfo(academicInfo);
        }
      };

      fetch();
    }
  }, [number]);

  // get tutoring info
  useEffect(() => {
    if (number) {
      const fetch = async () => {
        const result = await getTutoringInfo(number);
        if (result?.data?.success) {
          const tutoringInfo = result?.data?.data;
          setTutoringInfo(tutoringInfo);
          // set tutoring subjects
          setSelectedTutoringSubjects(
            subjectConverter(tutoringInfo?.tutoringSubjects)
          );

          setIsTeachAdmissionTest(tutoringInfo?.isTeachAdmissionTest);
          setIsTeachTestPaper(tutoringInfo?.isTeachTestPapers);
          // set admission test subject
          setAdmissionTestSubjects(
            subjectConverter(tutoringInfo?.teachAdmissionTest)
          );

          console.log("array", tutoringInfo?.teachTestPapers);
          // set test paper subject
          setTestPaperSubjects(subjectConverter(tutoringInfo?.teachTestPapers));

          // setTutoringGrade
          setTutoringGrades(
            tutoringInfo?.tutoringGrade?.map((grade) => {
              return { gradeName: grade?.gradeName };
            })
          );

          // setTutoring curriculum
          setTutoringCurriculum(
            tutoringInfo?.tutoringCurriculum?.map((curriculum) => {
              return { curriculumBoard: curriculum.curriculumBoard };
            })
          );

          // setTutoring variants
          setTutoringVariants([
            ...tutoringInfo?.tutoringVariant.map((variant) => {
              return { variantName: variant.variantName };
            }),
          ]);
        }
      };

      fetch();
    }
  }, [number]);

  const [saveTutoringInfo, { isLoading }] = useSaveTutoringInfoMutation();
  const [updateTutoringInfo, { isLoading: updateTutoringInfoLoading }] =
    useUpdateTutoringInfoMutation();

  // check object include or not in a array
  function isObjectInArray(array, targetObject) {
    return array?.some(
      (obj) => JSON.stringify(obj) === JSON.stringify(targetObject)
    );
  }

  // filter out targeted objects
  function filterObjectsFromArray(array, targetObject) {
    return array.filter((obj) => {
      const keys1 = Object.keys(obj);
      const keys2 = Object.keys(targetObject);

      if (keys1.length !== keys2.length) {
        return true;
      }

      for (const key of keys1) {
        if (obj[key] !== targetObject[key]) {
          return true;
        }
      }

      return false;
    });
  }

  // handle selected section
  const handleSelectChange = (
    subjectsArray,
    setSubjectsArray,
    mainSubject,
    selectedOption
  ) => {
    console.log(subjectsArray);
    if (mainSubject === undefined || selectedOption === undefined) {
      const existingSubject = subjectsArray?.find(
        (subject) => subject?.mainSubject === mainSubject
      );
      if (!existingSubject) {
        setSubjectsArray([
          { mainSubject: mainSubject, subSubjects: [] },
          ...subjectsArray,
        ]);
      }
    } else {
      setSubjectsArray((prevSelected) => {
        const existingSubject = subjectsArray?.find(
          (subject) => subject?.mainSubject === mainSubject
        );
        if (existingSubject) {
          const isOptionIncluded =
            existingSubject?.subSubjects?.includes(selectedOption);
          if (!isOptionIncluded) {
            const updatedSubjects = prevSelected?.map((subject) => {
              return subject?.mainSubject === mainSubject
                ? {
                    ...subject,
                    subSubjects: [selectedOption, ...subject.subSubjects],
                  }
                : subject;
            });
            return updatedSubjects;
          }
        } else {
          return [
            {
              mainSubject: mainSubject,
              subSubjects: [selectedOption],
            },
            ...subjectsArray,
          ];
        }
        return prevSelected;
      });
    }
  };

  // removed subject from lists
  const handleRemoveSubject = (
    subjectsArray,
    setSubjectsArray,
    subjectToRemove
  ) => {
    const updatedSubjects = subjectsArray?.filter(
      (subject) => subject?.mainSubject !== subjectToRemove?.mainSubject
    );
    setSubjectsArray(updatedSubjects);
  };

  // modify subjects for post
  const modifySubjectsForPost = (subjectArray) => {
    const modifiedSubjects = [];

    if (!subjectArray?.length) return modifiedSubjects;

    for (let i = 0; i < subjectArray?.length; i++) {
      if (subjectArray?.[i]?.subSubjects?.length) {
        for (let j = 0; j < subjectArray?.[i]?.subSubjects?.length; j++) {
          modifiedSubjects.push({
            mainSubject: subjectArray?.[i]?.mainSubject,
            subSubject: subjectArray?.[i].subSubjects?.[j],
          });
        }
      } else {
        modifiedSubjects?.push({
          mainSubject: subjectArray?.[i]?.mainSubject,
          subSubject: "",
        });
      }
    }

    return modifiedSubjects;
  };

  // handle submit function
  // eslint-disable-next-line no-unused-vars
  const onSubmit = async (data) => {
    if (!tutoringVariants.length)
      return toast.error("Please add tutoring variant");
    if (isTeachTestPaper && !testPaperSubjects.length)
      return toast.error("Please add test paper subject");
    if (isTeachAdmissionTest && !admissionTestSubjects.length)
      return toast.error("Please add admission test subject");
    if (!tutoringGrades?.length)
      return toast.error("Please add tutoring grade");

    if (!tutoringCurriculum?.length)
      return toast.error(" Please add tutoring curriculum");

    let result;

    const tutoringData = {
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
    };

    if (tutoringInfo) {
      result = await updateTutoringInfo({ data: tutoringData, number });
    } else {
      tutoringData.phoneNumber = number;
      result = await saveTutoringInfo(tutoringData);
    }

    if (result?.data?.success) {
      toast.success(result?.data?.message);
      const currentTutoringInfo = result?.data?.data;

      setTutoringInfo(currentTutoringInfo);
      setIsTeachAdmissionTest(currentTutoringInfo?.isTeachAdmissionTest);
      setIsTeachTestPaper(currentTutoringInfo?.isTeachTestPapers);
      // set admission test subject
      setAdmissionTestSubjects(
        currentTutoringInfo?.teachAdmissionTest
          ?.filter((sub) => !sub?.subSubject)
          ?.map((sub) => {
            return { mainSubject: sub?.mainSubject };
          })
      );

      // set test paper subjects
      setTestPaperSubjects(
        currentTutoringInfo?.teachTestPapers
          ?.filter((sub) => !sub?.subSubject)
          ?.map((sub) => {
            return { mainSubject: sub?.mainSubject };
          })
      );

      // setTutoringGrade
      setTutoringGrades(
        currentTutoringInfo?.tutoringGrade?.map((grade) => {
          return { gradeName: grade?.gradeName };
        })
      );

      // setTutoring curriculum
      setTutoringCurriculum(
        currentTutoringInfo?.tutoringCurriculum?.map((curriculum) => {
          return { curriculumBoard: curriculum.curriculumBoard };
        })
      );

      // setTutoring variants
      setTutoringVariants([
        ...currentTutoringInfo?.tutoringVariant.map((variant) => {
          return { variantName: variant.variantName };
        }),
      ]);

      navigate(`/academic-tutoring-details/${number}`)
    } else {
      toast.error(result?.error?.data?.message);
    }
  };

  const subjectConverter = (inputArray) => {
    if (!inputArray.length) return [];
    const resultObject = {};

    inputArray.forEach((item) => {
      if (!resultObject[item.mainSubject]) {
        resultObject[item.mainSubject] = {
          mainSubject: item.mainSubject,
          subSubjects: [],
        };
      }

      if (item.subSubject) {
        resultObject[item.mainSubject].subSubjects.push(item.subSubject.trim());
      }
    });

    return Object.values(resultObject);
  };

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-xl md:text-2xl text-white">
          Update Tutoring Info
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
          {/* Tutoring Variant */}
          <div className={`w-full  my-10`}>
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Choose Tutoring Variant
            </label>
            <select
              {...register("tutoringVariant")}
              defaultValue=""
              className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <div className="flex overflow-auto mt-3 gap-2">
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
              className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <div className="flex overflow-auto mt-3 gap-2">
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
              className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <div className="flex overflow-auto mt-3 gap-2">
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
            <div className="mb-10 col-span-2">
              {/* Choose Tutoring Subjects */}
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Choose Tutoring Subjects
              </label>
              <div className="w-full">
                <NestedSubject
                  data={tutoringSubjectsList?.subjectsList}
                  handleSelectChange={handleSelectChange}
                  setSubjects={setSelectedTutoringSubjects}
                  subjects={selectedTutoringSubjects}
                />
                {selectedTutoringSubjects?.length > 0 ? (
                  <label className="block mt-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                    Selected Subjects:
                  </label>
                ) : (
                  ""
                )}
              </div>

              {/* Display selected subjects */}
              {selectedTutoringSubjects?.length > 0 ? (
                <div className="mt-2">
                  <div className="flex flex-wrap items-center gap-5">
                    {selectedTutoringSubjects?.map((subject, idx) => (
                      <div
                        onClick={() =>
                          handleRemoveSubject(
                            selectedTutoringSubjects,
                            setSelectedTutoringSubjects,
                            subject
                          )
                        }
                        key={idx}
                        className="flex items-center gap-2 bg-gray-100 ps-3 pr-1 py-1 rounded-md cursor-pointer"
                      >
                        {subject?.mainSubject ? subject?.mainSubject : subject}
                        {subject?.subSubjects?.length > 0 ? (
                          <span>{"("}</span>
                        ) : (
                          ""
                        )}
                        {
                          <>
                            {subject?.subSubjects?.map((ss, i) => (
                              <span className="inline-block" key={i}>
                                {ss}
                                {subject?.subSubjects?.length > 1 && ","}
                              </span>
                            ))}
                          </>
                        }
                        {subject?.subSubjects?.length > 0 ? (
                          <span>{")"}</span>
                        ) : (
                          ""
                        )}
                        <CiCircleRemove className="text-2xl text-red-500 " />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
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
                    defaultChecked={tutoringInfo && isTeachTestPaper && true}
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
                    defaultChecked={tutoringInfo && !isTeachTestPaper && true}
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
              <div className="mb-10 col-span-2">
                {/* Choose Tutoring Subjects */}
                <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                  Choose Test Paper Subjects
                </label>
                <div className="w-full">
                  <NestedSubject
                    data={testPaperSubjectsList?.subjectsList}
                    handleSelectChange={handleSelectChange}
                    setSubjects={setTestPaperSubjects}
                    subjects={testPaperSubjects}
                  />
                  {testPaperSubjects?.length > 0 ? (
                    <label className="block mt-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                      Selected Subjects:
                    </label>
                  ) : (
                    ""
                  )}
                </div>

                {/* Display selected subjects */}
                {testPaperSubjects?.length > 0 ? (
                  <div className="mt-2">
                    <div className="flex flex-wrap items-center gap-5">
                      {testPaperSubjects?.map((subject, idx) => (
                        <div
                          onClick={() =>
                            handleRemoveSubject(
                              testPaperSubjects,
                              setTestPaperSubjects,
                              subject
                            )
                          }
                          key={idx}
                          className="flex items-center gap-2 bg-gray-100 ps-3 pr-1 py-1 rounded-md cursor-pointer"
                        >
                          {subject?.mainSubject
                            ? subject?.mainSubject
                            : subject}
                          {subject?.subSubjects?.length > 0 ? (
                            <span>{"("}</span>
                          ) : (
                            ""
                          )}
                          {
                            <>
                              {subject?.subSubjects?.map((ss, i) => (
                                <span className="inline-block" key={i}>
                                  {ss}
                                  {subject?.subSubjects?.length > 1 && ","}
                                </span>
                              ))}
                            </>
                          }
                          {subject?.subSubjects?.length > 0 ? (
                            <span>{")"}</span>
                          ) : (
                            ""
                          )}
                          <CiCircleRemove className="text-2xl text-red-500 " />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
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
                    name="teachAdmissionTestGroup"
                    defaultChecked={
                      tutoringInfo && isTeachAdmissionTest && true
                    }
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
                    name="teachAdmissionTestGroup"
                    defaultChecked={
                      tutoringInfo && !isTeachAdmissionTest && true
                    }
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
              <div className="mb-10 col-span-2">
                {/* Choose Tutoring Subjects */}
                <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                  Choose Admission Test Subjects
                </label>
                <div className="w-full">
                  <NestedSubject
                    data={admissionTestSubjectsList?.subjectsList}
                    handleSelectChange={handleSelectChange}
                    setSubjects={setAdmissionTestSubjects}
                    subjects={admissionTestSubjects}
                  />
                  {admissionTestSubjects?.length > 0 ? (
                    <label className="block mt-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                      Selected Subjects:
                    </label>
                  ) : (
                    ""
                  )}
                </div>

                {/* Display selected subjects */}
                {admissionTestSubjects?.length > 0 ? (
                  <div className="mt-2">
                    <div className="flex flex-wrap items-center gap-5">
                      {admissionTestSubjects?.map((subject, idx) => (
                        <div
                          onClick={() =>
                            handleRemoveSubject(
                              admissionTestSubjects,
                              setAdmissionTestSubjects,
                              subject
                            )
                          }
                          key={idx}
                          className="flex items-center gap-2 bg-gray-100 ps-3 pr-1 py-1 rounded-md cursor-pointer"
                        >
                          {subject?.mainSubject
                            ? subject?.mainSubject
                            : subject}
                          {subject?.subSubjects?.length > 0 ? (
                            <span>{"("}</span>
                          ) : (
                            ""
                          )}
                          {
                            <>
                              {subject?.subSubjects?.map((ss, i) => (
                                <span className="inline-block" key={i}>
                                  {ss}
                                  {subject?.subSubjects?.length > 1 && ","}
                                </span>
                              ))}
                            </>
                          }
                          {subject?.subSubjects?.length > 0 ? (
                            <span>{")"}</span>
                          ) : (
                            ""
                          )}
                          <CiCircleRemove className="text-2xl text-red-500 " />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-4 mb-10">
            <button
              type="submit"
              disabled={isLoading || updateTutoringInfoLoading}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              {isLoading || updateTutoringInfoLoading ? (
                <ImSpinner9 className="animate-spin my-1 mx-4" />
              ) : tutoringInfo ? (
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

export default EditTutoringInfo;
