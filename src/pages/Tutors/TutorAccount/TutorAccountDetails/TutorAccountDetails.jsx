import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLazyGetTutorInfoFilterDataQuery } from "../../../../store/service/tutorInfoFilter/tutorInfoFilterApiService";
import { ImSpinner10 } from "react-icons/im";
import { FaLocationPin, FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import ContactInfo from "./ContactInfo/ContactInfo";
import AcademicInfo from "./AcademicInfo/AcademicInfo";

const TutorAccountDetails = () => {
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
                to={`/academic-tutoring-details/${allInfo?.phoneNumber}`}
                className=" py-2 text-[#1e6cb3] hover:underline"
              >
                #Academic Tutoring
              </Link>
              <Link
              to={`/tutor-profile/${allInfo?.phoneNumber}`}
              className=" py-2 text-[#1e6cb3] hover:underline"
            >
              #Details
            </Link>
            </div>
          </div>
          {/* personal Info */}
          <PersonalInfo
            personalInfo={allInfo?.personalInfo}
            identityInfo={allInfo?.identitiesInfo}
          />
          {/* contact info */}
          <ContactInfo contactInfo={allInfo?.contactInfo} />

          {/* academic info */}

          <AcademicInfo academicInfo={allInfo?.academicInfo} />

          {/* <div className="flex justify-between items-center mb-5">
            <h1 className="font-bold text-xl md:text-2xl text-white">
              Tutoring Account
            </h1>
            <Link
              to={`/tutor-profile/${allInfo?.phoneNumber}`}
              className="bg-white text-[#1E6CB3] px-5 py-1 rounded-sm font-semibold"
            >
              Details
            </Link>
          </div> */}

          <div className="bg-white border rounded-md p-2 sm:p-5 md:p-10">
            <div>
              <div className="flex justify-between items-center mb-5 border-b">
                <h1 className="font-bold text-xl md:text-2xl text-[#1E6CB3]">
                  Tutor Profile
                </h1>
                <Link
                  to={`/academic-tutoring-details/${allInfo?.phoneNumber}`}
                  className=" px-3 py-2 text-[#1E6CB3] hover:underline"
                >
                  #Academic Tutoring
                </Link>
              </div>
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
              {/* <div className="pt-10">
                <div className="bg-blue-50 font-bold text-[#01183b] py-2 px-1 flex items-center justify-between">
                  <p>Personal Info:</p>
                  <Link
                    to={`/edit/academic-tutoring-details/personal-info/${allInfo?.phoneNumber}`}
                    title="Edit Personal Info"
                    className="cursor-pointer text-[#1E6CB3] px-2"
                  >
                    <FaEdit />
                  </Link>
                </div>
                <div className="my-5">
                  <PersonalInfo
                    personalInfo={allInfo?.personalInfo}
                    identityInfo={allInfo?.identitiesInfo}
                  />
                </div>
              </div> */}
              {/* Contact Info */}
              {/* <div className="pt-10">
                <div className="bg-blue-50 font-bold text-[#01183b] py-2 px-1 flex items-center justify-between">
                  <p>Contact Info:</p>
                  <Link
                    to={`/edit/academic-tutoring-details/contact-info/${allInfo?.phoneNumber}`}
                    title="Edit Contact Info"
                    className="cursor-pointer text-[#1E6CB3] px-2"
                  >
                    <FaEdit />
                  </Link>
                </div>
                <div className="my-5">
                  <ContactInfo contactInfo={allInfo?.contactInfo} />
                </div>
              </div> */}
              {/* Academic Info */}
              {/* <div className="pt-10">
                <div className="bg-blue-50 font-bold text-[#01183b] py-2 px-1 flex items-center justify-between">
                  <p>Academic Info:</p>
                  <Link
                    to={`/edit/academic-tutoring-details/academic-info/${allInfo?.phoneNumber}`}
                    title="Edit Academic Info"
                    className="cursor-pointer text-[#1E6CB3] px-2"
                  >
                    <FaEdit />
                  </Link>
                </div>
                <div className="my-5">
                  <AcademicInfo academicInfo={allInfo?.academicInfo} />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorAccountDetails;
