import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLazyGetTutorInfoFilterDataQuery } from "../../../../store/service/tutorInfoFilter/tutorInfoFilterApiService";
import { ImSpinner10 } from "react-icons/im";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import ContactInfo from "./ContactInfo/ContactInfo";
import AcademicInfo from "./AcademicInfo/AcademicInfo";
import IdentityInfo from "./IdentityInfo/IdentityInfo";
import { BiSolidUserAccount } from "react-icons/bi";
import { TbListDetails } from "react-icons/tb";
import { SiMicrosoftacademic } from "react-icons/si";

const TutorAccountDetails = () => {
  const { number } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [allInfo, setAllInfo] = useState(null);

  console.log(allInfo);

  const [fetchTutorInfo] = useLazyGetTutorInfoFilterDataQuery();

  useEffect(() => {
    setIsLoading(true);
    if (number) {
      const func = async () => {
        const result = await fetchTutorInfo(number);
        if (result?.data?.success) {
          setAllInfo(result?.data?.data[0]);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      };

      func();
    } else {
      setAllInfo(null);
      setIsLoading(false);
    }
  }, [number]);

  return (
    <div className="py-10">
      {isLoading ? (
        <div className="flex justify-center mt-40 h-full items-center">
          <ImSpinner10 className="animate-spin text-5xl text-[#1E6CB3]" />
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-5 border-b bg-white shadow-lg rounded-sm  px-3">
            <h1 className="font-bold text-xl md:text-2xl text-[#1e6cb3]">
              Tutor Profile
            </h1>
            <div className="flex items-center gap-10 mr-10">
              <Link
                to={`/academic-tutoring-details/${allInfo?.phoneNumber}`}
                className="py-2 text-gray-600 hover:text-primary cursor-pointer"
              >
                <SiMicrosoftacademic
                  className="text-3xl"
                  title="Academic Tutoring"
                />
              </Link>
              <Link
                to={`/tutor-profile/${allInfo?.phoneNumber}`}
                className="py-2 text-gray-600 hover:text-primary cursor-pointer"
                title="Details"
              >
                <TbListDetails className="text-3xl" />
              </Link>
              <Link
                to={`/tutor-profile-cv-format/${allInfo?.phoneNumber}`}
                className=" py-2 text-gray-600 hover:text-primary cursor-pointer"
                title="Details In CV Format"
              >
                <BiSolidUserAccount className="text-3xl" />
              </Link>
            </div>
          </div>

          {/* personal Info */}
          <PersonalInfo
            personalInfo={allInfo?.personalInfo}
            identityInfo={allInfo?.identitiesInfo}
          />
          {/* contact info */}
          <ContactInfo
            contactInfo={allInfo?.contactInfo}
            number={allInfo?.phoneNumber}
          />

          {/* academic info */}
          <AcademicInfo
            academicInfo={allInfo?.academicInfo}
            number={allInfo?.phoneNumber}
          />
          <IdentityInfo
            identityInfo={allInfo?.identitiesInfo}
            isLoading={isLoading}
            number={allInfo?.phoneNumber}
          />
        </div>
      )}
    </div>
  );
};

export default TutorAccountDetails;
