import CommonComponent from "../../../../libs/TutorProfile/CommonComponent";

const CommonContactInfo = ({ contactInfo }) => {
  return (
    <div className="px-5 py-5 bg-[#f1f5f9]">
      <div className="w-full rounded-md grid grid-cols-1 lg:grid-cols-2  gap-x-2">
        <CommonComponent
          name={"Whatsapp Number"}
          value={contactInfo?.whatsappNumber}
        />
        <CommonComponent
          name={"Facebook URL"}
          value={contactInfo?.facebookUrl}
        />
        <CommonComponent
          name={"Google Meet URL"}
          value={contactInfo?.googleMeetUrl}
        />
        <CommonComponent
          name={"Interview Convenient Time"}
          value={contactInfo?.interviewConvenientTime}
        />
        <CommonComponent
          name={"Emergency Contact Name"}
          value={contactInfo?.emergencyContactName}
        />
        <CommonComponent
          name={"Emergency Contact Number"}
          value={contactInfo?.emergencyContactNumber}
        />

        <CommonComponent
          name={"Emergency Contact Relation"}
          value={contactInfo?.emergencyContactRelation}
        />
      </div>
    </div>
  );
};

export default CommonContactInfo;
