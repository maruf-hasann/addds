import JoditEditor from "jodit-react";
import { useRef } from "react";
import { commonInputClassName } from "../../../../../libs/commonInputClassName";

const AboutClassAndProgramDetails = ({
  initialState,
  setInitialState,
  customErrors,
  errors,
  register,
}) => {
  const editor = useRef(null);
  return (
    <div className="grid grid-cols-1 gap-8">
      {/* about class */}
      <div className="w-full">
        {/* title */}
        <div className="w-full">
          <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
            About Coaching *
          </label>
          <textarea
            type="textArea"
            {...register("aboutCoaching", {
              required: initialState?.aboutCoaching
                ? false
                : "About Coaching is required",
            })}
            value={initialState?.aboutCoaching}
            onChange={(e) =>
              setInitialState({
                ...initialState,
                aboutCoaching: e.target.value,
              })
            }
            className={`${commonInputClassName} h-28`}
          />
          {errors.aboutCoaching && (
            <p className="text-red-500 text-sm absolute">
              {errors?.aboutCoaching?.message}
            </p>
          )}
        </div>
      </div>
      {/* programDetails */}
      <div className="w-full">
        <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
          Program Details *
        </label>

        <JoditEditor
          ref={editor}
          value={initialState?.programDetails}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) =>
            setInitialState({ ...initialState, programDetails: newContent })
          }
        />
        {(!initialState?.programDetails ||
          initialState?.programDetails === "<p><br></p>") &&
          customErrors?.programDetails && (
            <p className="text-red-500 text-sm absolute">
              {customErrors.programDetails}
            </p>
          )}
      </div>
    </div>
  );
};

export default AboutClassAndProgramDetails;
