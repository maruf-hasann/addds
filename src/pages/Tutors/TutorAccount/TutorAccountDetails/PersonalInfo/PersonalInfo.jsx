import React from "react";
import CommonPersonalInfo from "../../../../../components/Shared/TutorProfile/PersonalInfo/CommonPersonalInfo";

const PersonalInfo = ({ personalInfo, identityInfo }) => {
  return (
    <div>
      <CommonPersonalInfo
        identityInfo={identityInfo}
        personalInfo={personalInfo}
        showEditButton={true}
      />
    </div>
  );
};

export default PersonalInfo;
