import React from "react";

const CommonComponent = ({ name, value }) => {
  return (
    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
      <h4 className="font-medium text-sm mb-1">{name}</h4>
      <h2 className="font-bold text-lg">{value}</h2>
    </div>
  );
};

const ArrayCommonComponent = ({ name, values, valueName }) => {
  return (
    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
      <h4 className="font-medium text-sm mb-1">{name}</h4>
      <div className="flex items-center gap-2 flex-wrap">
        {values?.map((value, idx) => (
          <h2
            key={idx}
            className="font-bold text-lg bg-blue-50 px-3 rounded-sm"
          >
            {value?.[valueName]}
          </h2>
        ))}
      </div>
    </div>
  );
};

const AdditionalTutoringInfo = ({ additionalTutoringInfo }) => {
  return (
    <div className="col-span-12 xl:col-span-8 bg-white  my-10">
      <div className="shadow-md rounded-lg">
        <div className="flex justify-between bg-white shadow-md pt-7 pb-3 px-4">
          <div>
            <h2 className="capitalize text-2xl font-semibold text-gray-800 ">
              Additional Tutoring Info
            </h2>
          </div>
          <div>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-0 focus:outline-none focus:ring-cyan-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Edit
            </button>
          </div>
        </div>
        <div className="px-5 py-5 bg-[#f1f5f9]">
          <div className="w-full rounded-md grid grid-cols-1 lg:grid-cols-2  gap-x-2">
            <CommonComponent
              name={"Grow Tutoring Program"}
              value={
                additionalTutoringInfo?.isGrowTutoringProgram ? "Yes" : "No"
              }
            />
            {additionalTutoringInfo?.isGrowTutoringProgram ? (
              <ArrayCommonComponent
                name={"Tutoring Programs"}
                values={additionalTutoringInfo?.tutoringProgram}
                valueName={"programName"}
              />
            ) : (
              ""
            )}
            <CommonComponent
              name={"Have Tutoring Training"}
              value={additionalTutoringInfo?.isTutoringTraining ? "Yes" : "No"}
            />
            <CommonComponent
              name={"Have Teaching Experience"}
              value={
                additionalTutoringInfo?.isTeachingExperience ? "Yes" : "No"
              }
            />
            <CommonComponent
              name={"Years Of Experience"}
              value={additionalTutoringInfo?.yearsOfExperience}
            />

            <CommonComponent
              name={"Teaching History"}
              value={additionalTutoringInfo?.teachingHistory}
            />

            <ArrayCommonComponent
              name={"Tutoring Place"}
              values={additionalTutoringInfo?.tutoringPlace}
              valueName={"placeName"}
            />
            <ArrayCommonComponent
              name={"Student Variant"}
              values={additionalTutoringInfo?.studentVariant}
              valueName={"variantName"}
            />

            <CommonComponent
              name={"Min. Exp. Salary"}
              value={additionalTutoringInfo?.minExpectedSalary}
            />
            <CommonComponent
              name={"Max. Exp. Salary"}
              value={additionalTutoringInfo?.maxExpectedSalary}
            />
            <CommonComponent
              name={"Personal Statement"}
              value={additionalTutoringInfo?.personalStatement}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalTutoringInfo;
