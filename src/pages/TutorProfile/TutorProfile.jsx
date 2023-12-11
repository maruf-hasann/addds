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
import { ImSpinner10, ImSpinner11 } from "react-icons/im";

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

  return (
    <div className="py-10">
      {isLoading ? (
        <div className="flex justify-center mt-40 h-full items-center">
          <ImSpinner10 className="animate-spin text-5xl text-[#1E6CB3]" />
        </div>
      ) : (
        <div>
          <div>
            <img
              src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
              alt="profile-picture"
              className="mx-auto rounded-full w-60 h-60"
            />
            <p className="text-center my-5 font-semibold text-xl">
              {allInfo?.personalInfo?.fullName}
            </p>
          </div>
          <div>
            {/* Personal Info */}
            <Accordion open={openAcc1}>
              <AccordionHeader onClick={handleOpenAcc1}>
                <div className="flex items-center justify-between w-full">
                  <p className={openAcc1 && "text-[#1E6CB3]"}>Personal Info</p>
                  {openAcc1 ? (
                    <MdOutlineKeyboardArrowUp className="text-4xl text-[#1E6CB3]" />
                  ) : (
                    <MdOutlineKeyboardArrowDown className="text-4xl" />
                  )}
                </div>
              </AccordionHeader>
              <AccordionBody>
                <PersonalInfo personalInfo={allInfo?.personalInfo} />
              </AccordionBody>
            </Accordion>
            {/* Contact Info */}
            <Accordion open={openAcc2}>
              <AccordionHeader onClick={handleOpenAcc2}>
                <div className="flex items-center justify-between w-full">
                  <p className={openAcc2 && "text-[#1E6CB3]"}>Contact Info</p>
                  {openAcc2 ? (
                    <MdOutlineKeyboardArrowUp className="text-4xl text-[#1E6CB3]" />
                  ) : (
                    <MdOutlineKeyboardArrowDown className="text-4xl" />
                  )}
                </div>
              </AccordionHeader>
              <AccordionBody>
                <ContactInfo contactInfo={allInfo?.contactInfo} />
              </AccordionBody>
            </Accordion>
            {/* Academic Info */}
            <Accordion open={openAcc3}>
              <AccordionHeader onClick={handleOpenAcc3}>
                <div className="flex items-center justify-between w-full">
                  <p className={openAcc3 && "text-[#1E6CB3]"}>Academic Info</p>
                  {openAcc3 ? (
                    <MdOutlineKeyboardArrowUp className="text-4xl text-[#1E6CB3]" />
                  ) : (
                    <MdOutlineKeyboardArrowDown className="text-4xl" />
                  )}
                </div>
              </AccordionHeader>
              <AccordionBody>
                <AcademicInfo academicInfo={allInfo?.academicInfo} />
              </AccordionBody>
            </Accordion>
            {/* Tutoring Info */}
            <Accordion open={openAcc4}>
              <AccordionHeader onClick={handleOpenAcc4}>
                <div className="flex items-center justify-between w-full">
                  <p className={openAcc4 && "text-[#1E6CB3]"}>Tutoring Info</p>
                  {openAcc4 ? (
                    <MdOutlineKeyboardArrowUp className="text-4xl text-[#1E6CB3]" />
                  ) : (
                    <MdOutlineKeyboardArrowDown className="text-4xl" />
                  )}
                </div>
              </AccordionHeader>
              <AccordionBody>
                <TutoringInfo tutoringInfo={allInfo?.tutoringInfo} />
              </AccordionBody>
            </Accordion>
            {/* Additional Tutoring Info */}
            <Accordion open={openAcc5}>
              <AccordionHeader onClick={handleOpenAcc5}>
                <div className="flex items-center justify-between w-full">
                  <p className={openAcc5 && "text-[#1E6CB3]"}>
                    Additional Tutoring Info
                  </p>
                  {openAcc5 ? (
                    <MdOutlineKeyboardArrowUp className="text-4xl text-[#1E6CB3]" />
                  ) : (
                    <MdOutlineKeyboardArrowDown className="text-4xl" />
                  )}
                </div>
              </AccordionHeader>
              <AccordionBody>
                <AdditionalTutoringInfo
                  additionalTutoringInfo={allInfo?.additionalInfo}
                />
              </AccordionBody>
            </Accordion>
            {/* Promo Info */}
            <Accordion open={openAcc6}>
              <AccordionHeader onClick={handleOpenAcc6}>
                <div className="flex items-center justify-between w-full">
                  <p className={openAcc6 && "text-[#1E6CB3]"}>Promo Info</p>
                  {openAcc6 ? (
                    <MdOutlineKeyboardArrowUp className="text-4xl text-[#1E6CB3]" />
                  ) : (
                    <MdOutlineKeyboardArrowDown className="text-4xl" />
                  )}
                </div>
              </AccordionHeader>
              <AccordionBody>
                <PromoInfo promoInfo={allInfo?.promoInfo} />
              </AccordionBody>
            </Accordion>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorProfile;
