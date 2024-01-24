import React from "react";
import CommonPersonalInfo from "../../../components/Shared/TutorProfile/PersonalInfo/CommonPersonalInfo";

const PersonalInfo = ({ personalInfo, identitiesInfo }) => {
  return (
    <div>
      <CommonPersonalInfo
        identityInfo={identitiesInfo}
        personalInfo={personalInfo}
        showEditButton={false}
      />
    </div>
  );
};

export default PersonalInfo;
