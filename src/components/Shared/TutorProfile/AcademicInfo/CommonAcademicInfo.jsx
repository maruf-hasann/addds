import React from "react";
import { CommonComponent } from "../../../../libs/TutorProfile/TutorProfile";

const CommonAcademicInfo = ({academicInfo}) => {
  return (
    <div className="px-5 py-5 bg-[#f1f5f9]">
      <div className="w-full rounded-md grid grid-cols-1 lg:grid-cols-2  gap-x-2">
        <CommonComponent
          name={"Education Variant"}
          value={academicInfo?.educationVariant}
        />
        <CommonComponent
          name={"School Name"}
          value={academicInfo?.schoolName}
        />
        <CommonComponent
          name={"High School Board"}
          value={academicInfo?.highSchoolBoard}
        />
        <CommonComponent
          name={"High School Result"}
          value={academicInfo?.highSchoolResult}
        />
        <CommonComponent
          name={"Collage Name"}
          value={academicInfo?.collageName}
        />
        <CommonComponent
          name={"Collage Board"}
          value={academicInfo?.collageBoard}
        />
        <CommonComponent
          name={"Collage Result"}
          value={academicInfo?.collageResult}
        />
        <CommonComponent
          name={"University Name"}
          value={academicInfo?.universityName}
        />
        <CommonComponent
          name={"Subject Name"}
          value={academicInfo?.subjectsName}
        />
        <CommonComponent
          name={"University Running Year"}
          value={academicInfo?.universityRunningYear}
        />
        <CommonComponent
          name={"Current Affair"}
          value={academicInfo?.currentAffair}
        />
      </div>
    </div>
  );
};

export default CommonAcademicInfo;
