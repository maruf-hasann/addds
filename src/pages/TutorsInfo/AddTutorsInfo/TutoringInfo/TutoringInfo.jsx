import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { useGetTutoringVariantsQuery } from "../../../../store/service/tutoringVariant/tutoringVariantApiService";
import {
  useGetAllALevelSubjectsQuery,
  useGetAllOLevelSubjectsQuery,
} from "../../../../store/service/boardWiseSubject/boardWiseSubjectApiService";
import { useGetExtraSubjectsQuery } from "../../../../store/service/extraSubject/extraSubjectApiService";
import {
  useGetClassesQuery,
  useLazyGetSubjectsByClassQuery,
} from "../../../../store/service/tutoringClasses/tutoringClassesApiService";
import { useSaveTutoringInfoMutation } from "../../../../store/service/tutorInfo/tutoringInfo/tutoringInfoApiService";

const TutoringInfo = ({ setActiveTab }) => {
  const [number, setNumber] = useState(null);
  const [numberError, setNumberError] = useState(false);

  const [tutoringVariants, setTutoringVariants] = useState([]);
  const [isTeachOLevel, setIsTeachOLevel] = useState();
  const [oLevelSubjects, setOLevelSubjects] = useState([]);

  const [isTeachALevel, setIsTeachALevel] = useState();
  const [aLevelSubjects, setALevelSubjects] = useState([]);

  const [isTeachTestPaper, setIsTeachTestPaper] = useState();
  const [testPaperSubjects, setTestPaperSubjects] = useState([]);

  const [isTeachAdmissionTest, setIsTeachAdmissionTest] = useState();
  const [admissionTestSubjects, setAdmissionTestSubjects] = useState([]);

  const [tutoringClasses, setTutoringClasses] = useState([]);
  const [classWiseSubjects, setClassWiseSubjects] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const { handleSubmit, register, reset } = useForm();

  const { data: allTutoringVariant } = useGetTutoringVariantsQuery();
  const variants = allTutoringVariant?.data;

  const { data: allOLevelSubjectsData } = useGetAllOLevelSubjectsQuery();
  const allOLevelSubjects = allOLevelSubjectsData?.data;

  const { data: allALevelSubjectsData } = useGetAllALevelSubjectsQuery();
  const allALevelSubjects = allALevelSubjectsData?.data;

  const { data: allExtraSubjectsData } = useGetExtraSubjectsQuery();
  const allExtraSubjects = allExtraSubjectsData?.data;

  const { data: allClassesData } = useGetClassesQuery();
  const classes = allClassesData?.data;

  const [getSubject] = useLazyGetSubjectsByClassQuery();
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

  useEffect(() => {
    const fetchData = async () => {
      for (const tutoringClass of tutoringClasses) {
        const alreadyFetched = classWiseSubjects.some((obj) => {
          return obj.className === tutoringClass;
        });

        if (alreadyFetched) {
          continue;
        }

        const result = await getSubject(tutoringClass);
        if (result.data?.success) {
          const subject = result.data?.data;
          setClassWiseSubjects([...classWiseSubjects, ...subject]);
        }
      }
    };

    fetchData();
  }, [tutoringClasses]);

  // check object include or not in a array
  function isObjectInArray(array, targetObject) {
    return array.some(
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

  const onSubmit = async (data) => {
    if (!tutoringVariants.length)
      return toast.error("Please add tutoring variant");
    if (!subjects.length)
      return toast.error("Please add tutoring grade subject");
    if (isTeachALevel && !aLevelSubjects.length)
      return toast.error("Please add A level subject");
    if (isTeachOLevel && !oLevelSubjects.length)
      return toast.error("Please add O level subject");
    if (isTeachTestPaper && !testPaperSubjects.length)
      return toast.error("Please add test paper subject");
    if (isTeachAdmissionTest && !admissionTestSubjects.length)
      return toast.error("Please add admission test subject");

    const tutoringInfo = {
      phoneNumber: number.substring(1),
      tutoringVariant: tutoringVariants,
      tutoringGrade: subjects,
      isTeachALevel,
      teachALevel: aLevelSubjects,
      isTeachOLevel,
      teachOLevel: oLevelSubjects,
      isTeachTestPapers: isTeachTestPaper,
      teachTestPapers: testPaperSubjects,
      isTeachAdmissionTest,
      teachAdmissionTest: admissionTestSubjects,
    };

    const result = await saveTutoringInfo(tutoringInfo);
    console.log(result);
    if (result.data) {
      toast.success(result.data?.message);
      localStorage.setItem("tutor-number", number);
      reset();
      setSubjects([]);
      setClassWiseSubjects([]);
      setTutoringClasses([]);
      setAdmissionTestSubjects([]);
      setTestPaperSubjects([]);
      setALevelSubjects([]);
      setOLevelSubjects([]);
      setTutoringVariants([]);
      setActiveTab(5);
    } else {
      toast.error(result?.error?.data?.message);
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

          {/* Tutoring Class */}
          <div className={`w-full  my-10`}>
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Choose Tutoring Grade
            </label>
            <select
              {...register("tutoringClass")}
              defaultValue=""
              className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(event) => {
                const selectedValue = event.target.value;
                if (!tutoringClasses.includes(selectedValue)) {
                  setTutoringClasses([...tutoringClasses, selectedValue]);
                }
              }}
            >
              <option value="" disabled>
                Choose Class
              </option>
              {classes?.map((variant, idx) => (
                <option key={idx} value={variant?.className}>
                  {variant?.className}
                </option>
              ))}
            </select>
            <div className="flex overflow-auto mt-3 gap-2">
              {tutoringClasses?.map((item, idx) => (
                <div
                  onClick={() => {
                    let selectedClass;
                    selectedClass = tutoringClasses.filter(
                      (sub, index) => item[idx] !== sub[index]
                    );
                    setClassWiseSubjects(
                      classWiseSubjects.filter(
                        (subject) => subject.className !== item
                      )
                    );
                    setSubjects(
                      subjects.filter((subject) => subject.className !== item)
                    );
                    setTutoringClasses(selectedClass);
                  }}
                  key={idx}
                  className="flex items-center justify-between gap-5 bg-gray-100 mb-1"
                >
                  <div className="py-1 pl-3 text-sm font-semibold text-gray-500 capitalize whitespace-nowrap">
                    <span className="mr-2">{idx + 1}.</span>
                    {item}
                  </div>
                  <div className="hover:bg-red-500 h-full w-full flex justify-center items-center rounded-r px-1 cursor-pointer text-red-500 hover:text-white transition-colors duration-200">
                    <RxCross2 className="h-5 w-5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* class wise dynamic field */}
          {classWiseSubjects.map((subject, idx) => (
            <div key={idx}>
              {" "}
              {/* Subject */}
              <div className={`w-full my-5`}>
                <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                  Choose Subject ({subject?.className}) Class
                </label>
                <select
                  {...register(`subject-${subject.className}`)}
                  defaultValue=""
                  className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(event) => {
                    const selectedValue = JSON.parse(event.target.value);
                    if (!isObjectInArray(subjects, selectedValue)) {
                      setSubjects([...subjects, selectedValue]);
                    }
                  }}
                >
                  <option value="" disabled>
                    Choose Subject
                  </option>
                  {classWiseSubjects
                    ?.filter((sub) => sub.className === subject.className)
                    .map((subject) =>
                      subject?.subjects?.map((sub, index) => (
                        <option
                          key={index}
                          value={JSON.stringify({
                            className: subject?.className,
                            subject: sub,
                          })}
                        >
                          {sub}
                        </option>
                      ))
                    )}
                </select>
                <div className="flex overflow-auto mt-3 gap-2">
                  {subjects
                    ?.filter((sub) => sub.className === subject.className)
                    ?.map((item, idx) => (
                      <div
                        onClick={() => {
                          let selectedSubject;
                          selectedSubject = filterObjectsFromArray(
                            subjects,
                            item
                          );
                          setSubjects(selectedSubject);
                        }}
                        key={idx}
                        className="flex items-center justify-between gap-5 bg-gray-100 mb-1"
                      >
                        <div className="py-1 pl-3 text-sm font-semibold text-gray-500 capitalize whitespace-nowrap">
                          <span className="mr-2">{idx + 1}.</span>
                          {item?.subject}
                        </div>
                        <div className="hover:bg-red-500 h-full w-full flex justify-center items-center rounded-r px-1 cursor-pointer text-red-500 hover:text-white transition-colors duration-200">
                          <RxCross2 className="h-5 w-5" />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}

          {/* Teach O Level */}
          <div className="my-10">
            {/* O Level radio box */}
            <div>
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Can you Teach O Level?
              </label>
              <div className={`flex gap-10 items-center mb-3`}>
                <div className="flex ">
                  <input
                    onInput={() => setIsTeachOLevel(true)}
                    id="teachOLevel-1"
                    type="radio"
                    name="teachOLevel"
                    className="w-4 h-4"
                    required
                  />
                  <label
                    htmlFor="teachOLevel"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Yes
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    onInput={() => setIsTeachOLevel(false)}
                    id="teachOLevel-2"
                    type="radio"
                    value=""
                    name="teachOLevel"
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="teachOLevel-2"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>
            {/* choose Subject */}
            <div className={`w-full ${!isTeachOLevel && "hidden"} my-5`}>
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Choose O Level Subject
              </label>
              <select
                {...register("oLevelSubject")}
                defaultValue=""
                className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                  const selectedValue = JSON.parse(event.target.value);
                  if (!isObjectInArray(oLevelSubjects, selectedValue)) {
                    setOLevelSubjects([...oLevelSubjects, selectedValue]);
                  }
                }}
              >
                <option value="" disabled>
                  Choose Subject
                </option>
                {allOLevelSubjects?.map((subject) =>
                  subject?.subjects?.map((sub, index) => (
                    <option
                      key={index}
                      value={JSON.stringify({
                        type: "o-level",
                        board: subject?.board,
                        subject: sub,
                      })}
                    >
                      Board - {subject?.board} --- Subject - {sub}
                    </option>
                  ))
                )}
              </select>
              <div className="flex overflow-auto mt-3 gap-2">
                {oLevelSubjects?.map((item, idx) => (
                  <div
                    onClick={() => {
                      let selectedSubject;
                      selectedSubject = filterObjectsFromArray(
                        oLevelSubjects,
                        item
                      );
                      setOLevelSubjects(selectedSubject);
                    }}
                    key={idx}
                    className="flex items-center justify-between gap-5 bg-gray-100 mb-1"
                  >
                    <div className="py-1 pl-3 text-sm font-semibold text-gray-500 capitalize whitespace-nowrap">
                      <span className="mr-2">{idx + 1}.</span>
                      Board - {item?.board} --- Subject - {item?.subject}
                    </div>
                    <div className="hover:bg-red-500 h-full w-full flex justify-center items-center rounded-r px-1 cursor-pointer text-red-500 hover:text-white transition-colors duration-200">
                      <RxCross2 className="h-5 w-5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Teach A Level */}
          <div className="my-10">
            {/* A Level radio box */}
            <div>
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Can you Teach A Level?
              </label>
              <div className={`flex gap-10 items-center mb-3`}>
                <div className="flex ">
                  <input
                    onInput={() => setIsTeachALevel(true)}
                    id="teachALevel-1"
                    type="radio"
                    name="teachALevel"
                    className="w-4 h-4"
                    required
                  />
                  <label
                    htmlFor="teachALevel"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Yes
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    onInput={() => setIsTeachALevel(false)}
                    id="teachALevel-2"
                    type="radio"
                    value=""
                    name="teachALevel"
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="teachALevel-2"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>
            {/* choose Subject */}
            <div className={`w-full ${!isTeachALevel && "hidden"} my-5`}>
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Choose A Level Subject
              </label>
              <select
                {...register("aLevelSubject")}
                defaultValue=""
                className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                  const selectedValue = JSON.parse(event.target.value);
                  if (!isObjectInArray(aLevelSubjects, selectedValue)) {
                    setALevelSubjects([...aLevelSubjects, selectedValue]);
                  }
                }}
              >
                <option value="" disabled>
                  Choose Subject
                </option>
                {allALevelSubjects?.map((subject) =>
                  subject?.subjects?.map((sub, index) => (
                    <option
                      key={index}
                      value={JSON.stringify({
                        type: "a-level",
                        board: subject?.board,
                        subject: sub,
                      })}
                    >
                      Board - {subject?.board} --- Subject - {sub}
                    </option>
                  ))
                )}
              </select>
              <div className="flex overflow-auto mt-3 gap-2">
                {aLevelSubjects?.map((item, idx) => (
                  <div
                    onClick={() => {
                      let selectedSubject;
                      selectedSubject = filterObjectsFromArray(
                        aLevelSubjects,
                        item
                      );
                      setALevelSubjects(selectedSubject);
                    }}
                    key={idx}
                    className="flex items-center justify-between gap-5 bg-gray-100 mb-1"
                  >
                    <div className="py-1 pl-3 text-sm font-semibold text-gray-500 capitalize whitespace-nowrap">
                      <span className="mr-2">{idx + 1}.</span>
                      Board - {item?.board} --- Subject - {item?.subject}
                    </div>
                    <div className="hover:bg-red-500 h-full w-full flex justify-center items-center rounded-r px-1 cursor-pointer text-red-500 hover:text-white transition-colors duration-200">
                      <RxCross2 className="h-5 w-5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

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
            {/* choose Subject */}
            <div className={`w-full ${!isTeachTestPaper && "hidden"} my-5`}>
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Choose Test Paper Subject
              </label>
              <select
                {...register("testPaperSubject")}
                defaultValue=""
                className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                  const selectedValue = JSON.parse(event.target.value);
                  if (!isObjectInArray(testPaperSubjects, selectedValue)) {
                    setTestPaperSubjects([...testPaperSubjects, selectedValue]);
                  }
                }}
              >
                <option value="" disabled>
                  Choose Subject
                </option>
                {allExtraSubjects
                  ?.filter((subject) => subject?.type === "test-papers")
                  ?.map((subject, index) => (
                    <option
                      key={index}
                      value={JSON.stringify({
                        type: subject?.type,
                        subject: subject?.subject,
                      })}
                    >
                      {subject?.subject}
                    </option>
                  ))}
              </select>
              <div className="flex overflow-auto mt-3 gap-2">
                {testPaperSubjects?.map((item, idx) => (
                  <div
                    onClick={() => {
                      let selectedSubject;
                      selectedSubject = filterObjectsFromArray(
                        testPaperSubjects,
                        item
                      );
                      setTestPaperSubjects(selectedSubject);
                    }}
                    key={idx}
                    className="flex items-center justify-between gap-5 bg-gray-100 mb-1"
                  >
                    <div className="py-1 pl-3 text-sm font-semibold text-gray-500 capitalize whitespace-nowrap">
                      <span className="mr-2">{idx + 1}.</span>
                      {item?.subject}
                    </div>
                    <div className="hover:bg-red-500 h-full w-full flex justify-center items-center rounded-r px-1 cursor-pointer text-red-500 hover:text-white transition-colors duration-200">
                      <RxCross2 className="h-5 w-5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Teach Admission Test */}
          <div className="my-10">
            {/* Admission Test radio box */}
            <div>
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Can you Teach Admission Test?
              </label>
              <div className={`flex gap-10 items-center mb-3`}>
                <div className="flex ">
                  <input
                    onInput={() => setIsTeachAdmissionTest(true)}
                    id="teachAdmissionTest-1"
                    type="radio"
                    name="teachAdmissionTest"
                    className="w-4 h-4"
                    required
                  />
                  <label
                    htmlFor="teachAdmissionTest"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Yes
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    onInput={() => setIsTeachAdmissionTest(false)}
                    id="teachAdmissionTest-2"
                    type="radio"
                    value=""
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
            {/* choose Subject */}
            <div className={`w-full ${!isTeachAdmissionTest && "hidden"} my-5`}>
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Choose Admission Test Subject
              </label>
              <select
                {...register("admissionTestSubject")}
                defaultValue=""
                className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                  const selectedValue = JSON.parse(event.target.value);
                  if (!isObjectInArray(admissionTestSubjects, selectedValue)) {
                    setAdmissionTestSubjects([
                      ...admissionTestSubjects,
                      selectedValue,
                    ]);
                  }
                }}
              >
                <option value="" disabled>
                  Choose Subject
                </option>
                {allExtraSubjects
                  ?.filter((subject) => subject?.type === "admission-test")
                  ?.map((subject, index) => (
                    <option
                      key={index}
                      value={JSON.stringify({
                        type: subject?.type,
                        subject: subject?.subject,
                      })}
                    >
                      {subject?.subject}
                    </option>
                  ))}
              </select>
              <div className="flex overflow-auto mt-3 gap-2">
                {admissionTestSubjects?.map((item, idx) => (
                  <div
                    onClick={() => {
                      let selectedSubject;
                      selectedSubject = filterObjectsFromArray(
                        admissionTestSubjects,
                        item
                      );
                      setAdmissionTestSubjects(selectedSubject);
                    }}
                    key={idx}
                    className="flex items-center justify-between gap-5 bg-gray-100 mb-1"
                  >
                    <div className="py-1 pl-3 text-sm font-semibold text-gray-500 capitalize whitespace-nowrap">
                      <span className="mr-2">{idx + 1}.</span>
                      {item?.subject}
                    </div>
                    <div className="hover:bg-red-500 h-full w-full flex justify-center items-center rounded-r px-1 cursor-pointer text-red-500 hover:text-white transition-colors duration-200">
                      <RxCross2 className="h-5 w-5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TutoringInfo;
