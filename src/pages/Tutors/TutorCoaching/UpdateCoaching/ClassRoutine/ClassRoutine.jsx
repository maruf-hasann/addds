import JoditEditor from "jodit-react";
import { useRef } from "react";
import UploadPhoto from "./UploadPhoto/UploadPhoto";

const ClassRoutine = ({
  initialState,
  setInitialState,
  register,
  errors,
  customErrors,
}) => {
  const editor = useRef(null);
  return (
    <div>
      {/* Class routine checkbox */}
      <div>
        <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
          Do you want to upload the class Routine Image? *
        </label>
        <div className={`flex gap-10 items-center mb-3`}>
          <div className="flex ">
            <input
              onInput={() =>
                setInitialState({
                  ...initialState,
                  uploadClassRoutineImage: true,
                })
              }
              id="classRoutine-1"
              type="radio"
              {...register("classRoutine", {
                required: "Class Routine is required",
              })}
              className="w-4 h-4"
              defaultChecked={initialState?.uploadClassRoutineImage}
            />
            <label
              htmlFor="classRoutine-1"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Yes
            </label>
          </div>
          <div className="flex items-center">
            <input
            
              id="classRoutine-2"
              type="radio"
              
              {...register("classRoutine", {
                required: "Class Routine is required",
              })}
              defaultChecked={!initialState?.uploadClassRoutineImage}
              onInput={()=>setInitialState({
                ...initialState,
                uploadClassRoutineImage: false,
              })}
              className="w-4 h-4"
            />
            <label
              htmlFor="classRoutine-2"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              No
            </label>
          </div>
        </div>
        {errors.classRoutine && (
          <p className="text-red-500 text-sm absolute">
            {errors?.classRoutine?.message}
          </p>
        )}
      </div>
      {/* class routine text */}
      {initialState?.uploadClassRoutineImage === false ? (
        <div className="w-full">
          <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
            Class Routine
          </label>

          <JoditEditor
            ref={editor}
            value={initialState?.classRoutineInText}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) =>
              setInitialState({
                ...initialState,
                classRoutineInText: newContent,
              })
            }
          />
          {(!initialState?.classRoutineInText ||
            initialState?.classRoutineInText === "<p><br></p>") &&
            customErrors?.classRoutineInText && (
              <p className="text-red-500 text-sm absolute">
                {customErrors.classRoutineInText}
              </p>
            )}
        </div>
      ) : (
        ""
      )}
      {initialState?.uploadClassRoutineImage === true ? (
        <UploadPhoto
          initialState={initialState}
          setInitialState={setInitialState}
          customErrors={customErrors}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ClassRoutine;
