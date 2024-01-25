import React from "react";
import CommonComponent from "../../../../libs/TutorProfile/CommonComponent";
import ArrayCommonComponent from "../../../../libs/TutorProfile/ArrayCommonComponent";


const CommonAdditionalTutoringInfo = ({ additionalTutoringInfo }) => {
  return (
    <div className="px-5 py-5 bg-[#f1f5f9] grid gird-cols-1 gap-2">
      <div className="w-full rounded-md grid grid-cols-1 lg:grid-cols-2  gap-x-2">
        <CommonComponent
          name={"Grow Tutoring Program"}
          value={additionalTutoringInfo?.isGrowTutoringProgram ? "Yes" : "No"}
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
          value={additionalTutoringInfo?.isTeachingExperience ? "Yes" : "No"}
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
      </div>
      <div>
        <CommonComponent
          name={"Personal Statement"}
          value={additionalTutoringInfo?.personalStatement}
        />
      </div>
    </div>
  );
};

export default CommonAdditionalTutoringInfo;
