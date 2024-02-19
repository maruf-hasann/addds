import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLazyGetTutorInfoFilterDataQuery } from "../../store/service/tutorInfoFilter/tutorInfoFilterApiService";
import { ImSpinner10 } from "react-icons/im";
import { BiSolidUserAccount } from "react-icons/bi";
import AcademicInfo from "./AcademicInfo/AcademicInfo";
import TutoringInfo from "./TutoringInfo/TutoringInfo";
import AdditionalTutoringInfo from "./AdditionalTutoringInfo/AdditionalTutoringInfo";
import ContactInfo from "./ContactInfo/ContactInfo";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import PromoInfo from "./PromoInfo/PromoInfo";
import IdentityInfo from "./IdentityInfo/IdentityInfo";
import { SiMicrosoftacademic } from "react-icons/si";
import { MdOutlineManageAccounts } from "react-icons/md";
import { FaBookOpenReader } from "react-icons/fa6";
import Availability from "./Availability/Availability";

const TutorProfile = () => {
  const { number } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [allInfo, setAllInfo] = useState(null);

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
          <div className="px-2">
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
                  to={`/tutor-account-details/${allInfo?.phoneNumber}`}
                  className="py-2 text-gray-600 hover:text-primary cursor-pointer"
                  title="Tutor Account"
                >
                  <MdOutlineManageAccounts className="text-3xl" />
                </Link>
                <Link
                  to={`/tutor-profile-cv-format/${allInfo?.phoneNumber}`}
                  className=" py-2 text-gray-600 hover:text-primary cursor-pointer"
                  title="Details In CV Format"
                >
                  <BiSolidUserAccount className="text-3xl" />
                </Link>
                <Link
                  to={`/tutor-coaching/${number}`}
                  className=" py-2 text-gray-600 hover:text-primary cursor-pointer"
                  title="Tutors Coaching"
                >
                  <FaBookOpenReader className="text-3xl" />
                </Link>
              </div>
            </div>
            {/* personal info */}
            <div>
              <PersonalInfo
                personalInfo={allInfo?.personalInfo}
                identitiesInfo={allInfo?.identitiesInfo}
              />
            </div>
            {/* Contact Info */}
            <div className="col-span-12 xl:col-span-8 bg-white  my-10">
              <ContactInfo contactInfo={allInfo?.contactInfo} />
            </div>
            {/* Academic Info */}
            <div className="col-span-12 xl:col-span-8 bg-white  my-10">
              <AcademicInfo academicInfo={allInfo?.academicInfo} />
            </div>
            <IdentityInfo
              identityInfo={allInfo?.identitiesInfo}
              isLoading={isLoading}
            />
            {/* Tutoring Info */}
            <div className="col-span-12 xl:col-span-8 bg-white  my-10">
              <TutoringInfo tutoringInfo={allInfo?.tutoringInfo} />
            </div>
            {/* Additional Tutoring Info */}
            <div className="col-span-12 xl:col-span-8 bg-white  my-10">
              <AdditionalTutoringInfo
                additionalTutoringInfo={allInfo?.additionalInfo}
              />
            </div>
            {/* availability */}
            <div className="bg-white  my-10">
              <Availability number={allInfo?.phoneNumber} />
            </div>
            {/* Promo Info */}
            <div className="bg-white  my-10">
              <PromoInfo promoInfo={allInfo?.promoInfo} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorProfile;
