import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useLazyGetTutorInfoFilterDataQuery } from "../../store/service/tutorInfoFilter/tutorInfoFilterApiService";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import ContactInfo from "./ContactInfo/ContactInfo";
import AcademicInfo from "./AcademicInfo/AcademicInfo";
import TutoringInfo from "./TutoringInfo/TutoringInfo";
import AdditionalTutoringInfo from "./AdditionalTutoringInfo/AdditionalTutoringInfo";
import PromoInfo from "./PromoInfo/PromoInfo";
import { ImSpinner10 } from "react-icons/im";
import { FaLocationPin, FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { CiMail } from "react-icons/ci";

const TutorProfile = () => {
  const { number } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [openAcc1, setOpenAcc1] = useState(true);
  const [openAcc2, setOpenAcc2] = useState(true);
  const [openAcc3, setOpenAcc3] = useState(true);
  const [openAcc4, setOpenAcc4] = useState(true);
  const [openAcc5, setOpenAcc5] = useState(true);
  const [openAcc6, setOpenAcc6] = useState(true);

  const handleOpenAcc1 = () => setOpenAcc1((cur) => !cur);
  const handleOpenAcc2 = () => setOpenAcc2((cur) => !cur);
  const handleOpenAcc3 = () => setOpenAcc3((cur) => !cur);
  const handleOpenAcc4 = () => setOpenAcc4((cur) => !cur);
  const handleOpenAcc5 = () => setOpenAcc5((cur) => !cur);
  const handleOpenAcc6 = () => setOpenAcc6((cur) => !cur);
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

  console.log(allInfo);

  return (
    <div className="py-10">
      {isLoading ? (
        <div className="flex justify-center mt-40 h-full items-center">
          <ImSpinner10 className="animate-spin text-5xl text-[#1E6CB3]" />
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-5">
            <h1 className="font-bold text-xl md:text-2xl text-white">
              Tutor Profile
            </h1>
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
                        {allInfo?.personalInfo?.area},{" "}
                        {allInfo?.personalInfo?.city}
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
                  <PersonalInfo personalInfo={allInfo?.personalInfo} />
                </div>
              </div>
              {/* Contact Info */}
              <div className="pt-10">
                <h1 className="bg-blue-50 font-bold text-[#01183b] py-2 ps-1">
                  Contact Info:
                </h1>
                <div className="my-5">
                  <ContactInfo contactInfo={allInfo?.contactInfo} />
                </div>
              </div>
              {/* Academic Info */}
              <div className="pt-10">
                <h1 className="bg-blue-50 font-bold text-[#01183b] py-2 ps-1">
                  Academic Info:
                </h1>
                <div className="my-5">
                  <AcademicInfo academicInfo={allInfo?.academicInfo} />
                </div>
              </div>

              {/* Tutoring Info */}
              <div className="pt-10">
                <h1 className="bg-blue-50 font-bold text-[#01183b] py-2 ps-1">
                  Tutoring Info:
                </h1>
                <div className="my-5">
                  <TutoringInfo tutoringInfo={allInfo?.tutoringInfo} />
                </div>
              </div>

              {/*Additional Tutoring Info */}
              <div className="pt-10">
                <h1 className="bg-blue-50 font-bold text-[#01183b] py-2 ps-1">
                  Additional Tutoring Info:
                </h1>
                <div className="my-5">
                  <AdditionalTutoringInfo
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
                  <PromoInfo promoInfo={allInfo?.promoInfo} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorProfile;
