import JoditEditor from "jodit-react";
import { useRef } from "react";

const AboutClassAndProgramDetails = ({
  initialState,
  setInitialState,
  customErrors,
}) => {
  const editor = useRef(null);
  return (
    <div className="grid grid-cols-1 gap-8">
      {/* about class */}
      <div className="w-full">
        <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
          About The Class *
        </label>

        <JoditEditor
          ref={editor}
          value={initialState?.aboutClass}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) =>
            setInitialState({ ...initialState, aboutClass: newContent })
          }
        />
        {(!initialState?.aboutClass ||
          initialState?.aboutClass === "<p><br></p>") &&
          customErrors?.aboutClass && (
            <p className="text-red-500 text-sm absolute">
              {customErrors.aboutClass}
            </p>
          )}
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
