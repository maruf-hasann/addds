import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLazyGetTutorInfoFilterDataQuery } from "../../../../store/service/tutorInfoFilter/tutorInfoFilterApiService";
import { ImSpinner10 } from "react-icons/im";
import { TbListDetails } from "react-icons/tb";
import TutoringInfo from "./TutoringInfo/TutoringInfo";
import AdditionalTutoringInfo from "./AdditionalTutoringInfo/AdditionalTutoringInfo";
import PromoInfo from "./PromoInfo/PromoInfo";
import { BiSolidUserAccount } from "react-icons/bi";
import { MdOutlineManageAccounts } from "react-icons/md";
import { FaBookOpenReader } from "react-icons/fa6";

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
            <div className="flex items-center gap-10 mr-10">
              <Link
                to={`/tutor-account-details/${allInfo?.phoneNumber}`}
                className="py-2 text-gray-600 hover:text-primary cursor-pointer"
                title="Tutor Account"
              >
                <MdOutlineManageAccounts className="text-3xl" />
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
              <Link
                to={`/tutor-coaching/${allInfo?.phoneNumber}`}
                className=" py-2 text-gray-600 hover:text-primary cursor-pointer"
                title="Tutors Coaching"
              >
                <FaBookOpenReader className="text-3xl" />
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
            number={allInfo?.phoneNumber}
          />
          <PromoInfo
            number={allInfo?.phoneNumber}
          />
        </div>
      )}
    </div>
  );
};

export default AcademicTutoringDetails;
