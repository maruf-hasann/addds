import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLazyGetTutorInfoFilterDataQuery } from "../../../../store/service/tutorInfoFilter/tutorInfoFilterApiService";
import { ImSpinner10 } from "react-icons/im";
import { FaLocationPin, FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

import { FaEdit } from "react-icons/fa";
import TutoringInfo from "./TutoringInfo/TutoringInfo";
import AdditionalTutoringInfo from "./AdditionalTutoringInfo/AdditionalTutoringInfo";
import PromoInfo from "./PromoInfo/PromoInfo";

const AcademicTutoringDetails = () => {
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
          <div className="flex justify-between items-center mb-5 border-b bg-white shadow-lg rounded-sm  px-3">
            <h1 className="font-bold text-xl md:text-2xl text-[#1e6cb3]">
              Tutor Profile
            </h1>
            <div className="flex items-center gap-5">
              <Link
                to={`/tutor-account-details/${allInfo?.phoneNumber}`}
                className=" py-2 text-[#1e6cb3] hover:underline"
              >
                #Tutor Account
              </Link>
              <Link
                to={`/tutor-profile/${allInfo?.phoneNumber}`}
                className=" py-2 text-[#1e6cb3] hover:underline"
              >
                #Details
              </Link>
            </div>
          </div>
          {/* tutoring info */}
          <TutoringInfo
            tutoringInfo={allInfo?.tutoringInfo}
            personalInfo={allInfo?.personalInfo}
            identityInfo={allInfo?.identitiesInfo}
          />

          <AdditionalTutoringInfo
            additionalTutoringInfo={allInfo?.additionalInfo}
          />
          <PromoInfo promoInfo={allInfo?.promoInfo} />
        </div>
      )}
    </div>
  );
};

export default AcademicTutoringDetails;
