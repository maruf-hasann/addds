import { CiCircleRemove } from "react-icons/ci";
import NestedSubject from "../NestedSubject";
import { handleRemoveSubject } from "../../../../../libs/tutoringInfo/handleRemoveSubject";
import { handleSelectSubject } from "../../../../../libs/tutoringInfo/handleSelectSubject";

const SubjectCommonComponent = ({
  allSubjects,
  selectedSubjects,
  setSelectedSubjects,
  subjectError,
  componentName,
}) => {
  return (
    <div className="mb-10 col-span-2">
      {/* Choose Tutoring Subjects */}
      <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
        Choose {componentName} Subjects
      </label>
      <div className="w-full">
        <NestedSubject
          data={allSubjects}
          handleSelectChange={handleSelectSubject}
          setSubjects={setSelectedSubjects}
          subjects={selectedSubjects}
        />
        {selectedSubjects?.length > 0 ? (
          <label className="block mt-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
            Selected Subjects:
          </label>
        ) : (
          ""
        )}
      </div>
      {!selectedSubjects?.length && subjectError && (
        <p className="text-red-500 text-sm absolute">{subjectError}</p>
      )}

      {/* Display selected subjects */}
      {selectedSubjects?.length > 0 ? (
        <div className="mt-2">
          <div className="flex flex-wrap items-center gap-5">
            {selectedSubjects?.map((subject, idx) => (
              <div
                onClick={() =>
                  handleRemoveSubject(
                    selectedSubjects,
                    setSelectedSubjects,
                    subject
                  )
                }
                key={idx}
                className="flex items-center gap-2 bg-gray-100 ps-3 pr-1 py-1 rounded-md cursor-pointer"
              >
                {subject?.mainSubject ? subject?.mainSubject : subject}
                {subject?.subSubjects?.length > 0 ? <span>{"("}</span> : ""}
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
                {subject?.subSubjects?.length > 0 ? <span>{")"}</span> : ""}
                <CiCircleRemove className="text-2xl text-red-500 " />
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SubjectCommonComponent;
