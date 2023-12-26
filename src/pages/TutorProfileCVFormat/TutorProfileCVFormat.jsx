import React, { useEffect, useState } from "react";
import { useLazyGetTutorInfoFilterDataQuery } from "../../store/service/tutorInfoFilter/tutorInfoFilterApiService";
import { useParams } from "react-router";
import PersonalInfoCV from "./PersonalInfoCV/PersonalInfoCV";
import ContactInfoCV from "./ContactInfoCV/ContactInfoCV";
import AcademicInfoCV from "./AcademicInfoCV/AcademicInfoCV";
import TutoringInfoCV from "./TutoringInfoCV/TutoringInfoCV";
import AdditionalTutoringInfoCV from "./AdditionalTutoringInfoCV/AdditionalTutoringInfoCV";
import PromoInfoCV from "./PromoInfoCV/PromoInfoCV";
import { FaLocationPin, FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";

const TutorProfileCVFormat = () => {
  const { number } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [allInfo, setAllInfo] = useState(null);

  const [fetchTutorInfo] = useLazyGetTutorInfoFilterDataQuery();

  //   fetch tutor all info
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
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-xl md:text-2xl text-white">
          Tutoring Account
        </h1>
        <Link
          to={`/tutor-profile/${allInfo?.phoneNumber}`}
          className="bg-white text-[#1E6CB3] px-5 py-1 rounded-sm font-semibold"
        >
          Details
        </Link>
      </div>
      <div className="bg-white border rounded-md p-2 sm:p-5 md:p-10">
        <div>
          {/* hero */}
          <div className="md:flex justify-between items-center ">
            <div>
              <h2 className="font-bold uppercase text-lg text-[#1E6CB3] mb-2">
                {allInfo?.personalInfo?.fullName}
              </h2>
              <div className="grid grid-cols-1 gap-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaLocationPin />{" "}
                  <p>
                    {allInfo?.personalInfo?.homeAddress},{" "}
                    {allInfo?.personalInfo?.area}, {allInfo?.personalInfo?.city}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaPhone />
                  <p>{allInfo?.phoneNumber}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <IoMdMail />
                  <p>{allInfo?.personalInfo?.email}</p>
                </div>
              </div>
            </div>
            <div>
              <img
                src={allInfo?.identitiesInfo?.personalPhoto}
                alt="Profile Photo"
                className="h-36 w-[120px] object-cover"
              />
            </div>
          </div>
          {/* personal Info */}
          <div className="pt-10">
            <h1 className="bg-blue-50 font-bold text-[#01183b] py-2 ps-1">
              Personal Info:
            </h1>
            <div className="my-5">
              <PersonalInfoCV personalInfo={allInfo?.personalInfo} />
            </div>
          </div>
          {/* Contact Info */}
          <div className="pt-10">
            <h1 className="bg-blue-50 font-bold text-[#01183b] py-2 ps-1">
              Contact Info:
            </h1>
            <div className="my-5">
              <ContactInfoCV contactInfo={allInfo?.contactInfo} />
            </div>
          </div>
          {/* Academic Info */}
          <div className="pt-10">
            <h1 className="bg-blue-50 font-bold text-[#01183b] py-2 ps-1">
              Academic Info:
            </h1>
            <div className="my-5">
              <AcademicInfoCV academicInfo={allInfo?.academicInfo} />
            </div>
          </div>
          {/* Tutoring Info */}
          <div className="pt-10">
            <h1 className="bg-blue-50 font-bold text-[#01183b] py-2 ps-1">
              Tutoring Info:
            </h1>
            <div className="my-5">
              <TutoringInfoCV tutoringInfo={allInfo?.tutoringInfo} />
            </div>
          </div>
          {/*Additional Tutoring Info */}
          <div className="pt-10">
            <h1 className="bg-blue-50 font-bold text-[#01183b] py-2 ps-1">
              Additional Tutoring Info:
            </h1>
            <div className="my-5">
              <AdditionalTutoringInfoCV
                additionalTutoringInfo={allInfo?.additionalInfo}
              />
            </div>
          </div>
          {/*Promo Info */}
          <div className="pt-10">
            <h1 className="bg-blue-50 font-bold text-[#01183b] py-2 ps-1">
              Promo Info:
            </h1>
            <div className="my-5">
              <PromoInfoCV promoInfo={allInfo?.promoInfo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfileCVFormat;
