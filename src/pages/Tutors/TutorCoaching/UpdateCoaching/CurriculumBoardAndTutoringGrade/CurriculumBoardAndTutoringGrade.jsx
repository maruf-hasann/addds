import { RxCross2 } from "react-icons/rx";
import { isObjectInArray } from "../../../../../libs/tutoringInfo/isObjectInArray";
import { filterObjectsFromArray } from "../../../../../libs/tutoringInfo/filterObjectsFromArray";


const CurriculumBoardAndTutoringGrade = ({
  register,
  initialState,
  curriculumBoards,
  errors,
  customErrors,
  tutoringGrades,
  selectedTutoringGrades,
  setSelectedTutoringGrades,
}) => {
  const commonSelectClassName =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-10 focus:outline-none";
  return (
    <div className="grid grid-cols-1 gap-8">
      {/* curriculum board  */}
      <div className="w-full">
        <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
          Curriculum Board *
        </label>
        <select
          {...register("curriculumBoard", {
            required:
              initialState?.tutoringVariant === "Academic"
                ? initialState?.curriculumBoard
                  ? false
                  : "Curriculum Board is required"
                : false,
          })}
          className={commonSelectClassName}
          value={initialState?.curriculumBoard}
        >
          <option value="" disabled>
            Select Curriculum Board
          </option>
          {curriculumBoards?.map((board, idx) => (
            <option key={idx} value={board?.boardName}>
              {board?.boardName}
            </option>
          ))}
        </select>
        {!selectedTutoringGrades?.length && errors.curriculumBoard && (
          <p className="text-red-500 text-sm absolute">
            {errors.curriculumBoard?.message}
          </p>
        )}
      </div>

      {/* Tutoring Grade */}
      <div className={`w-full`}>
        <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
          Choose Tutoring Grade
        </label>
        <select
          {...register("tutoringGrade")}
          defaultValue=""
          className={commonSelectClassName}
          onChange={(event) => {
            const selectedValue = JSON.parse(event.target.value);
            if (!isObjectInArray(selectedTutoringGrades, selectedValue)) {
              setSelectedTutoringGrades([
                ...selectedTutoringGrades,
                selectedValue,
              ]);
            }
          }}
        >
          <option value="" disabled>
            Choose Grade
          </option>
          {tutoringGrades?.map((grade, idx) => (
            <option
              key={idx}
              value={JSON.stringify({ gradeName: grade?.className })}
            >
              {grade?.className}
            </option>
          ))}
        </select>
        {!selectedTutoringGrades?.length && customErrors?.tutoringGrades && (
          <p className="text-red-500 text-sm absolute">
            {customErrors.tutoringGrades}
          </p>
        )}
        <div
          className={`flex flex-wrap  gap-2 ${
            selectedTutoringGrades?.length && "mt-3"
          }`}
        >
          {selectedTutoringGrades?.map((item, idx) => (
            <div
              onClick={() => {
                let selectedGrade;
                selectedGrade = filterObjectsFromArray(
                  selectedTutoringGrades,
                  item
                );
                setSelectedTutoringGrades(selectedGrade);
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
    </div>
  );
};

export default CurriculumBoardAndTutoringGrade;
