import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { RxCross2 } from "react-icons/rx";

const TutoringInfo = ({ setActiveTab }) => {
  // const router = useRouter();
  const [variant, setVariant] = useState([]);
  const [oLevel, setOLevel] = useState(false);
  const [aLevel, setALevel] = useState(false);
  const [testPapers, setTestPapers] = useState(false);
  const [admissionTest, setAdmissionTest] = useState(false);
  const [oLevelSub, setOLevelSub] = useState([]);
  const [aLevelSub, setALevelSub] = useState([]);

  const [open, setOpen] = React.useState(1);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // data.variant = variant
    data.oLevelSubject = oLevelSub;
    data.aLevelSubject = aLevelSub;
    console.log(data);
    setActiveTab(5);
  };

  return (
    <div className="p-10">
      <div className="text-2xl font-medium mb-3">Tutoring Information</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
            Select Tutoring Variants
          </h3>
          <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center pl-3">
                <input
                  type="checkbox"
                  {...register("variant", {
                    required: "Select at least one variant",
                  })}
                  id="tutor"
                  value="tutor"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="tutor"
                  className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Academic Tutor
                </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center pl-3">
                <input
                  type="checkbox"
                  {...register("variant", {
                    required: "Select at least one variant",
                  })}
                  id="instructor"
                  value="instructor"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="instructor"
                  className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Course Instructor
                </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center pl-3">
                <input
                  type="checkbox"
                  {...register("variant", {
                    required: "Select at least one variant",
                  })}
                  id="trainer"
                  value="trainer"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="trainer"
                  className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Trainer
                </label>
              </div>
            </li>
          </ul>
        </div>

        {errors.check && (
          <p className="text-red-500" role="alert">
            {" "}
            {errors.check.message}
          </p>
        )}

        <div className="lg:flex gap-5 my-5">
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Select Tutoring Grade
            </label>
            <select
              {...register("grade")}
              className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="grade3">Grade1</option>
              <option value="grade2">grade2</option>
              <option value="grade3">grade3</option>
            </select>
          </div>
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Choose Subject
            </label>
            <select
              {...register("tutor-grade")}
              className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="subject1">Subject1</option>
              <option value="subject2">Subject2</option>
              <option value="subject3">Subject3</option>
            </select>
          </div>
        </div>

        <div className=" mb-5">
          <div className={`w-full`}>
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Do you want to teach O Level?
            </label>
            <div className={`flex gap-10 items-center mb-3`}>
              <div className="flex ">
                <input
                  onInput={() => setOLevel(true)}
                  id="o-level-radio-1"
                  type="radio"
                  value=""
                  name="o-level-radio"
                  className="w-4 h-4"
                  required
                />
                <label
                  htmlFor="o-level-radio-1"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  onInput={() => {
                    setOLevel(false);
                    setOLevelSub();
                  }}
                  id="o-level-radio-2"
                  type="radio"
                  value=""
                  name="o-level-radio"
                  className="w-4 h-4"
                />
                <label
                  htmlFor="o-level-radio-2"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  No
                </label>
              </div>
            </div>
            <select
              {...register("o-lvl-board", { required: oLevel })}
              className={`bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                !oLevel && "hidden"
              }`}
            >
              <option value="">Select a Board</option>
              <option value="board2">Board</option>
              <option value="board3">Board</option>
            </select>
          </div>
          <div className={`w-full ${!oLevel && "hidden"} mt-5`}>
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Choose Subject
            </label>
            <select
              {...register("oLevelSubject")}
              className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(event) => {
                const selectedValue = event.target.value;
                if (!oLevelSub.includes(selectedValue)) {
                  setOLevelSub([...oLevelSub, selectedValue]);
                }
                console.log(selectedValue);
                console.log(oLevelSub);
                console.log(...oLevelSub);
              }}
            >
              <option value="">Choose Subject</option>
              <option value="subject1">Subject1</option>
              <option value="subject2">Subject2</option>
              <option value="subject3">Subject3</option>
            </select>
          </div>
        </div>
        <div className="flex mb-10 overflow-auto">
          {oLevelSub?.map((item, idx) => (
            <div
              onClick={() => {
                let selectedSub;
                selectedSub = oLevelSub.filter(
                  (sub, index) => item[idx] !== sub[index]
                );
                setOLevelSub(selectedSub);
              }}
              onMouseOver={() => console.log(oLevelSub)}
              key={idx}
              className="flex items-center justify-between gap-1 bg-gray-100 mb-1 mx-1 rounded group"
            >
              <div className="py-1 pl-3 text-sm font-semibold text-gray-500 capitalize">
                {idx}
                {item}
              </div>
              <div className="hover:bg-red-500 h-full w-full flex justify-center items-center rounded-r px-1 cursor-pointer text-red-500 hover:text-white transition-colors duration-200">
                <RxCross2 className="h-5 w-5" />
              </div>
            </div>
          ))}
        </div>

        <div className=" mb-5">
          <div className={`w-full`}>
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Do you want to teach A Level?
            </label>
            <div className={`flex gap-10 items-center mb-3`}>
              <div className="flex ">
                <input
                  onInput={() => setALevel(true)}
                  id="a-level-radio-1"
                  type="radio"
                  name="a-level-radio"
                  className="w-4 h-4"
                  required
                />
                <label
                  htmlFor="a-level-radio-1"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  onInput={() => {
                    setALevel(false);
                    setALevelSub([]);
                  }}
                  id="a-level-radio-2"
                  type="radio"
                  value=""
                  name="a-level-radio"
                  className="w-4 h-4"
                />
                <label
                  htmlFor="a-level-radio-2"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  No
                </label>
              </div>
            </div>
            <select
              {...register("a-lvl-board", { required: aLevel })}
              className={`bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                !aLevel && "hidden"
              }`}
            >
              <option value="">Select a Board</option>
              <option value="board2">Board</option>
              <option value="board3">Board</option>
            </select>
          </div>
          <div className={`w-full ${!aLevel && "hidden"} mt-5`}>
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Choose Subject
            </label>
            <select
              {...register("aLevelSubject")}
              className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(event) => {
                const selectedValue = event.target.value;
                if (!aLevelSub.includes(selectedValue)) {
                  setALevelSub([...aLevelSub, selectedValue]);
                }
                console.log(selectedValue);
                console.log(aLevelSub);
                console.log(...oLevelSub);
              }}
            >
              <option value="">Choose Subject</option>
              <option value="subject1">Subject1</option>
              <option value="subject2">Subject2</option>
              <option value="subject3">Subject3</option>
            </select>
          </div>
        </div>
        <div className="flex mb-10 overflow-auto">
          {aLevelSub?.map((item, idx) => (
            <div
              onClick={() => {
                let selectedSub;
                selectedSub = aLevelSub.filter(
                  (sub, index) => item[idx] !== sub[index]
                );
                setALevelSub(selectedSub);
              }}
              key={idx}
              className="flex items-center justify-between gap-1 bg-gray-100 mb-1 mx-1 rounded group"
            >
              <div className="py-1 pl-3 text-sm font-semibold text-gray-500 capitalize">
                {idx}
                {item}
              </div>
              <div className="hover:bg-red-500 h-full w-full flex justify-center items-center rounded-r px-1 cursor-pointer text-red-500 hover:text-white transition-colors duration-200">
                <RxCross2 className="h-5 w-5" />
              </div>
            </div>
          ))}
        </div>

        <div className="lg:flex gap-5 my-10">
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Do you want to teach Test Papers?
            </label>
            <div className={`flex gap-10 items-center mb-3`}>
              <div className="flex ">
                <input
                  onInput={() => setTestPapers(true)}
                  id="test-papers-1"
                  type="radio"
                  name="test-papers"
                  className="w-4 h-4"
                  required
                />
                <label
                  htmlFor="test-papers-1"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  onInput={() => setTestPapers(false)}
                  id="test-papers-2"
                  type="radio"
                  value=""
                  name="test-papers"
                  className="w-4 h-4"
                />
                <label
                  htmlFor="test-papers-2"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  No
                </label>
              </div>
            </div>
            <select
              {...register("test-papers", { required: testPapers })}
              className={`bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                !testPapers && "hidden"
              }`}
            >
              <option value="">Choose a Test Paper</option>
              <option value="subject1">Subject1</option>
              <option value="subject2">Subject2</option>
              <option value="subject3">Subject3</option>
            </select>
          </div>
        </div>
        <div className="lg:flex gap-5 my-10">
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Do you want to teach the Admission Test?
            </label>
            <div className={`flex gap-10 items-center mb-3`}>
              <div className="flex ">
                <input
                  onInput={() => setAdmissionTest(true)}
                  id="admission-test-1"
                  type="radio"
                  name="admission-test"
                  className="w-4 h-4"
                  required
                />
                <label
                  htmlFor="admission-test-1"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  onInput={() => setAdmissionTest(false)}
                  id="admission-test-2"
                  type="radio"
                  value=""
                  name="admission-test"
                  className="w-4 h-4"
                />
                <label
                  htmlFor="admission-test-2"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  No
                </label>
              </div>
            </div>
            <select
              {...register("admission-test", { required: admissionTest })}
              className={`bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                !admissionTest && "hidden"
              }`}
            >
              <option value="">Choose a Admission Test</option>
              <option value="subject1">Subject1</option>
              <option value="subject2">Subject2</option>
              <option value="subject3">Subject3</option>
            </select>
          </div>
        </div>

        <button
          className="bg-blue-500 text-white py-2 mt-5 px-5 rounded-full"
          type="submit"
          // disabled={!variant.length}
          title={!variant.length ? "Please select at-least one variant" : ""}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default TutoringInfo;
