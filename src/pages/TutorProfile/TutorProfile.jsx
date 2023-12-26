import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLazyGetTutorInfoFilterDataQuery } from "../../store/service/tutorInfoFilter/tutorInfoFilterApiService";
import { ImSpinner10 } from "react-icons/im";
import AcademicInfo from "./AcademicInfo/AcademicInfo";
import TutoringInfo from "./TutoringInfo/TutoringInfo";
import AdditionalTutoringInfo from "./AdditionalTutoringInfo/AdditionalTutoringInfo";
import ContactInfo from "./ContactInfo/ContactInfo";
import PromoInfo from "./PromoInfo/PromoInfo";
import PersonalInfo from "./PersonalInfo/PersonalInfo";

export const CommonComponent = ({ name, value }) => {
  return (
    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
      <h4 className="font-medium text-sm mb-1">{name}</h4>
      <h2 className="font-bold text-lg">{value}</h2>
    </div>
  );
};

export const ArrayCommonComponent = ({ name, values, valueName }) => {
  return (
    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
      <h4 className="font-medium text-sm mb-1">{name}</h4>
      <div className="flex items-center gap-2 flex-wrap">
        {values?.map((value, idx) => (
          <h2
            key={idx}
            className="font-bold text-lg bg-blue-50 px-3 rounded-sm"
          >
            {value?.[valueName]}
          </h2>
        ))}
      </div>
    </div>
  );
};

export const SubjectCommonComponent = ({ name, allSubject }) => {
  return (
    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
      <h4 className="font-medium text-sm mb-1">{name}</h4>
      <div className="flex items-center gap-2 flex-wrap">
        {allSubject?.map((subject, idx) => (
          <span
            key={idx}
            className="font-bold text-lg bg-blue-50 px-3 rounded-sm"
          >
            {subject.subSubjects?.length
              ? `${subject.mainSubject}(${subject?.subSubjects?.map(
                  (subSub) => subSub
                )})`
              : subject?.mainSubject}
          </span>
        ))}
      </div>
    </div>
  );
};

const TutorProfile = () => {
  const { number } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [allInfo, setAllInfo] = useState(null);

  const [fetchTutorInfo] = useLazyGetTutorInfoFilterDataQuery();

  const transformSubjectArray = (inputArray) => {
    // Check if the input is an array
    if (!Array.isArray(inputArray)) {
      return;
    }

    return inputArray.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.mainSubject === item.mainSubject);

      if (existingItem) {
        if (item.subSubject) {
          existingItem.subSubjects.push(item.subSubject);
        }
      } else {
        acc.push({
          mainSubject: item.mainSubject,
          subSubjects: item.subSubject ? [item.subSubject] : [],
        });
      }

      return acc;
    }, []);
  };

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
              <div className="flex items-center gap-5">
                <Link
                  to={`/academic-tutoring-details/${allInfo?.phoneNumber}`}
                  className=" py-2 text-[#1e6cb3] hover:underline"
                >
                  #Academic Tutoring
                </Link>
                <Link
                  to={`/tutor-account-details/${allInfo?.phoneNumber}`}
                  className=" py-2 text-[#1e6cb3] hover:underline"
                >
                  #Tutor Account
                </Link>
                <Link
                  to={`/tutor-profile-cv-format/${allInfo?.phoneNumber}`}
                  className=" py-2 text-[#1e6cb3] hover:underline"
                >
                  #Details in CV Format
                </Link>
              </div>
            </div>
            {/* personal info */}
            <div>
              <PersonalInfo personalInfo={allInfo?.personalInfo} identitiesInfo={allInfo?.identitiesInfo}/>
            </div>
            {/* Contact Info */}
            <div className="col-span-12 xl:col-span-8 bg-white  my-10">
              <ContactInfo contactInfo={allInfo?.contactInfo} />
            </div>
            {/* Academic Info */}
            <div className="col-span-12 xl:col-span-8 bg-white  my-10">
              <AcademicInfo academicInfo={allInfo?.academicInfo} />
            </div>
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
