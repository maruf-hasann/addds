import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLazyGetTutorInfoFilterDataQuery } from "../../store/service/tutorInfoFilter/tutorInfoFilterApiService";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import ContactInfo from "./ContactInfo/ContactInfo";
import AcademicInfo from "./AcademicInfo/AcademicInfo";
import TutoringInfo from "./TutoringInfo/TutoringInfo";
import AdditionalTutoringInfo from "./AdditionalTutoringInfo/AdditionalTutoringInfo";
import PromoInfo from "./PromoInfo/PromoInfo";
import { ImSpinner10 } from "react-icons/im";
import { FaLocationPin, FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

const CommonComponent = ({ name, value }) => {
  return (
    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
      <h4 className="font-medium text-sm mb-1">{name}</h4>
      <h2 className="font-bold text-lg">{value}</h2>
    </div>
  );
};

const ArrayCommonComponent = ({ name, values, valueName }) => {
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

const SubjectCommonComponent = ({ name, allSubject }) => {
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
              </div>
            </div>
            {/* personal info */}
            <div className="bg-white xl:hidden">
              <div className="flex justify-center p-10 ">
                <img
                  src={
                    allInfo?.identitiesInfo?.personalPhoto
                      ? allInfo?.identitiesInfo?.personalPhoto
                      : "http://admin.carbangla.com/img/placeholder-profile.png"
                  }
                  className="inline-block w-60 h-60 object-cover rounded-full"
                  alt=""
                />
              </div>
              <div className="my-4 rounded-md shadow-md w-full flex-1">
                <div className="w-full ">
                  <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                    <h4 className="font-medium text-sm mb-1">Full Name</h4>
                    <h2 className="font-bold text-lg">
                      {allInfo?.personalInfo?.fullName}
                    </h2>
                  </div>
                  <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                    <h4 className="font-medium text-sm mb-1">Location</h4>
                    <div className="font-bold text-lg flex  items-center gap-2">
                      <FaLocationPin />{" "}
                      <p>
                        {allInfo?.personalInfo?.homeAddress},{" "}
                        {allInfo?.personalInfo?.area},{" "}
                        {allInfo?.personalInfo?.city}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                    <h4 className="font-medium text-sm mb-1">Number</h4>
                    <h2 className="font-bold text-lg flex  items-center gap-2">
                      <FaPhone />
                      <p>{allInfo?.phoneNumber}</p>
                    </h2>
                  </div>
                  <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                    <h4 className="font-medium text-sm mb-1 ">Email</h4>
                    <h2 className="font-bold text-lg flex  items-center gap-2 ">
                      <IoMdMail />
                      <p>{allInfo?.personalInfo?.email}</p>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            {/* Parent Info Image and Info */}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 xl:col-span-8 bg-white rounded-sm">
                <div className="shadow-md rounded-sm">
                  <div className="flex justify-between bg-white shadow-md pt-7 pb-3 px-4 rounded-sm">
                    <div>
                      <h2 className="capitalize text-2xl font-semibold text-gray-800 ">
                        personal Info
                      </h2>
                    </div>
                  </div>
                  <div className="px-5 py-5 bg-[#f1f5f9] ">
                    <div className="w-full rounded-md grid grid-cols-1 lg:grid-cols-2  gap-x-2">
                      <CommonComponent
                        name={"Name"}
                        value={allInfo?.personalInfo?.fullName}
                      />
                      <CommonComponent
                        name={"Phone Number"}
                        value={allInfo?.personalInfo?.phoneNumber}
                      />
                      <CommonComponent
                        name={"Email"}
                        value={allInfo?.personalInfo?.email}
                      />
                      <CommonComponent
                        name={"Gender"}
                        value={allInfo?.personalInfo?.gender}
                      />
                      <CommonComponent
                        name={"Country"}
                        value={allInfo?.personalInfo?.country}
                      />
                      <CommonComponent
                        name={"City"}
                        value={allInfo?.personalInfo?.city}
                      />
                      <CommonComponent
                        name={"Area"}
                        value={allInfo?.personalInfo?.area}
                      />
                      <CommonComponent
                        name={"Home Address"}
                        value={allInfo?.personalInfo?.homeAddress}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-4 hidden xl:block rounded-sm">
                <div>
                  <div className="p-3 w-full bg-white shadow-md rounded-sm flex justify-center">
                    <img
                      src={
                        allInfo?.identitiesInfo?.personalPhoto
                          ? allInfo?.identitiesInfo?.personalPhoto
                          : "http://admin.carbangla.com/img/placeholder-profile.png"
                      }
                      className="inline-block w-40 h-40  lg:w-60 lg:h-60 xl:h-80 xl:w-80  2xl:h-96 2xl:w-96 object-cover"
                      alt=""
                    />
                  </div>
                </div>
                <div className="my-4 rounded-md shadow-md">
                  <div className="w-full ">
                    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                      <h4 className="font-medium text-sm mb-1">Full Name</h4>
                      <h2 className="font-bold text-lg">
                        {allInfo?.personalInfo?.fullName}
                      </h2>
                    </div>
                    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                      <h4 className="font-medium text-sm mb-1">Location</h4>
                      <div className="font-bold text-lg flex  items-center gap-2">
                        <p>
                          {allInfo?.personalInfo?.homeAddress},{" "}
                          {allInfo?.personalInfo?.area},{" "}
                          {allInfo?.personalInfo?.city}
                        </p>
                      </div>
                    </div>
                    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                      <h4 className="font-medium text-sm mb-1">Number</h4>
                      <h2 className="font-bold text-lg flex  items-center gap-2">
                        <p>{allInfo?.phoneNumber}</p>
                      </h2>
                    </div>
                    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white overflow-hidden">
                      <h4 className="font-medium text-sm mb-1 ">Email</h4>
                      <h2 className="font-bold text-lg flex items-center gap-2">
                        <p>{allInfo?.personalInfo?.email}</p>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Contact Info */}
            <div className="col-span-12 xl:col-span-8 bg-white  my-10">
              <div className="shadow-md rounded-lg">
                <div className="flex justify-between bg-white shadow-md pt-7 pb-3 px-4">
                  <div>
                    <h2 className="capitalize text-2xl font-semibold text-gray-800 ">
                      Contact Info
                    </h2>
                  </div>
                </div>
                <div className="px-5 py-5 bg-[#f1f5f9]">
                  <div className="w-full rounded-md grid grid-cols-1 lg:grid-cols-2  gap-x-2">
                    <CommonComponent
                      name={"Whatsapp Number"}
                      value={allInfo?.contactInfo?.whatsappNumber}
                    />
                    <CommonComponent
                      name={"Facebook URL"}
                      value={allInfo?.contactInfo?.facebookUrl}
                    />
                    <CommonComponent
                      name={"Google Meet URL"}
                      value={allInfo?.contactInfo?.googleMeetUrl}
                    />
                    <CommonComponent
                      name={"Interview Convenient Time"}
                      value={allInfo?.contactInfo?.interviewConvenientTime}
                    />
                    <CommonComponent
                      name={"Emergency Contact Name"}
                      value={allInfo?.contactInfo?.emergencyContactName}
                    />
                    <CommonComponent
                      name={"Emergency Contact Number"}
                      value={allInfo?.contactInfo?.emergencyContactNumber}
                    />

                    <CommonComponent
                      name={"Emergency Contact Relation"}
                      value={allInfo?.contactInfo?.emergencyContactRelation}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Academic Info */}
            <div className="col-span-12 xl:col-span-8 bg-white  my-10">
              <div className="shadow-md rounded-lg">
                <div className="flex justify-between bg-white shadow-md pt-7 pb-3 px-4">
                  <div>
                    <h2 className="capitalize text-2xl font-semibold text-gray-800 ">
                      Academic Info
                    </h2>
                  </div>
                </div>
                <div className="px-5 py-5 bg-[#f1f5f9]">
                  <div className="w-full rounded-md grid grid-cols-1 lg:grid-cols-2  gap-x-2">
                    <CommonComponent
                      name={"Education Variant"}
                      value={allInfo?.academicInfo?.educationVariant}
                    />
                    <CommonComponent
                      name={"School Name"}
                      value={allInfo?.academicInfo?.schoolName}
                    />
                    <CommonComponent
                      name={"High School Board"}
                      value={allInfo?.academicInfo?.highSchoolBoard}
                    />
                    <CommonComponent
                      name={"High School Result"}
                      value={allInfo?.academicInfo?.highSchoolResult}
                    />
                    <CommonComponent
                      name={"Collage Name"}
                      value={allInfo?.academicInfo?.collageName}
                    />
                    <CommonComponent
                      name={"Collage Board"}
                      value={allInfo?.academicInfo?.collageBoard}
                    />
                    <CommonComponent
                      name={"Collage Result"}
                      value={allInfo?.academicInfo?.collageResult}
                    />
                    <CommonComponent
                      name={"University Name"}
                      value={allInfo?.academicInfo?.universityName}
                    />
                    <CommonComponent
                      name={"Subject Name"}
                      value={allInfo?.academicInfo?.subjectsName}
                    />
                    <CommonComponent
                      name={"University Running Year"}
                      value={allInfo?.academicInfo?.universityRunningYear}
                    />
                    <CommonComponent
                      name={"Current Affair"}
                      value={allInfo?.academicInfo?.currentAffair}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Tutoring Info */}
            <div className="col-span-12 xl:col-span-8 bg-white  my-10">
              <div className="shadow-md rounded-lg">
                <div className="flex justify-between bg-white shadow-md pt-7 pb-3 px-4">
                  <div>
                    <h2 className="capitalize text-2xl font-semibold text-gray-800 ">
                      Tutoring Info
                    </h2>
                  </div>
                </div>
                <div className="px-5 py-5 bg-[#f1f5f9]">
                  <div className="w-full rounded-md grid grid-cols-1 lg:grid-cols-2  gap-x-2">
                    <ArrayCommonComponent
                      name={"Tutoring Variants"}
                      values={allInfo?.tutoringInfo?.tutoringVariant}
                      valueName={"variantName"}
                    />
                    <ArrayCommonComponent
                      name={"Tutoring Grades"}
                      values={allInfo?.tutoringInfo?.tutoringGrade}
                      valueName={"gradeName"}
                    />
                    <SubjectCommonComponent
                      name={"Tutoring Subjects"}
                      allSubject={transformSubjectArray(
                        allInfo?.tutoringInfo?.tutoringSubjects
                      )}
                    />
                    <ArrayCommonComponent
                      name={"Tutoring Curriculum"}
                      values={allInfo?.tutoringInfo?.tutoringCurriculum}
                      valueName={"curriculumBoard"}
                    />
                    <CommonComponent
                      name={"Teach Admission Test"}
                      value={
                        allInfo?.tutoringInfo?.isTeachAdmissionTest
                          ? "Yes"
                          : "No"
                      }
                    />
                    {allInfo?.tutoringInfo?.isTeachAdmissionTest ? (
                      <SubjectCommonComponent
                        name={"Tutoring Subjects"}
                        allSubject={transformSubjectArray(
                          allInfo?.tutoringInfo?.teachAdmissionTest
                        )}
                      />
                    ) : (
                      ""
                    )}
                    <CommonComponent
                      name={"Teach Test Paper"}
                      value={
                        allInfo?.tutoringInfo?.isTeachTestPapers ? "Yes" : "No"
                      }
                    />
                    {allInfo?.tutoringInfo?.isTeachAdmissionTest ? (
                      <SubjectCommonComponent
                        name={"Tutoring Subjects"}
                        allSubject={transformSubjectArray(
                          allInfo?.tutoringInfo?.teachTestPapers
                        )}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Additional Tutoring Info */}
            <div className="col-span-12 xl:col-span-8 bg-white  my-10">
              <div className="shadow-md rounded-lg">
                <div className="flex justify-between bg-white shadow-md pt-7 pb-3 px-4">
                  <div>
                    <h2 className="capitalize text-2xl font-semibold text-gray-800 ">
                      Additional Tutoring Info
                    </h2>
                  </div>
                </div>
                <div className="px-5 py-5 bg-[#f1f5f9]">
                  <div className="w-full rounded-md grid grid-cols-1 lg:grid-cols-2  gap-x-2">
                    <CommonComponent
                      name={"Grow Tutoring Program"}
                      value={
                        allInfo?.additionalInfo?.isGrowTutoringProgram
                          ? "Yes"
                          : "No"
                      }
                    />
                    {allInfo?.additionalInfo?.isGrowTutoringProgram ? (
                      <ArrayCommonComponent
                        name={"Tutoring Programs"}
                        values={allInfo?.additionalInfo?.tutoringProgram}
                        valueName={"programName"}
                      />
                    ) : (
                      ""
                    )}
                    <CommonComponent
                      name={"Have Tutoring Training"}
                      value={
                        allInfo?.additionalInfo?.isTutoringTraining
                          ? "Yes"
                          : "No"
                      }
                    />
                    <CommonComponent
                      name={"Have Teaching Experience"}
                      value={
                        allInfo?.additionalInfo?.isTeachingExperience
                          ? "Yes"
                          : "No"
                      }
                    />
                    <CommonComponent
                      name={"Years Of Experience"}
                      value={allInfo?.additionalInfo?.yearsOfExperience}
                    />

                    <CommonComponent
                      name={"Teaching History"}
                      value={allInfo?.additionalInfo?.teachingHistory}
                    />

                    <ArrayCommonComponent
                      name={"Tutoring Place"}
                      values={allInfo?.additionalInfo?.tutoringPlace}
                      valueName={"placeName"}
                    />
                    <ArrayCommonComponent
                      name={"Student Variant"}
                      values={allInfo?.additionalInfo?.studentVariant}
                      valueName={"variantName"}
                    />

                    <CommonComponent
                      name={"Min. Exp. Salary"}
                      value={allInfo?.additionalInfo?.minExpectedSalary}
                    />
                    <CommonComponent
                      name={"Max. Exp. Salary"}
                      value={allInfo?.additionalInfo?.maxExpectedSalary}
                    />
                    <CommonComponent
                      name={"Personal Statement"}
                      value={allInfo?.additionalInfo?.personalStatement}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Promo Info */}
            <div className="bg-white  my-10">
              <div className="">
                <div className="shadow-md rounded-lg">
                  <div className="flex justify-between bg-white shadow-md pt-7 pb-3 px-4">
                    <div>
                      <h2 className="capitalize text-2xl font-semibold text-gray-800 ">
                        Promo Info
                      </h2>
                    </div>
                  </div>
                  <div className="px-5 py-5 bg-[#f1f5f9]">
                    <div className="w-full rounded-md grid grid-cols-1">
                      <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                        <h4 className="font-medium text-sm mb-1">Media</h4>
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="flex gap-5 flex-wrap justify-center">
                            {allInfo?.promoInfo?.mediaGallery?.map(
                              (media, idx) => (
                                <img
                                  key={idx}
                                  src={media?.imgUrl}
                                  className="max-w-[250px] w-full h-[150px] object-cover"
                                />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                        <h4 className="font-medium text-sm mb-1">Video</h4>
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="flex gap-5 flex-wrap justify-center">
                            {allInfo?.promoInfo?.videoGallery?.map(
                              (video, idx) => (
                                <video
                                  key={idx}
                                  controls
                                  width="100%"
                                  className="max-w-[300px] w-full h-auto"
                                >
                                  <source
                                    src={video?.videoUrl}
                                    type="video/mp4"
                                  />
                                  Your browser does not support the video tag.
                                </video>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* old one */}
          <div className="hidden">
            {/* <div className="flex justify-between items-center mb-5">
              <h1 className="font-bold text-xl md:text-2xl text-white">
                Tutor Profile
              </h1>
            </div> */}
            <div className="bg-white border rounded-md p-2 sm:p-5 md:p-10">
              <div>
                {/* hero */}
                {/* <div className="md:flex justify-between items-center ">
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
                </div> */}

                {/* personal Info */}
                {/* <div className="pt-10">
                  <h1 className="bg-blue-50 font-bold text-[#01183b] py-2 ps-1">
                    Personal Info:
                  </h1>
                  <div className="my-5">
                    <PersonalInfo personalInfo={allInfo?.personalInfo} />
                  </div>
                </div> */}
                {/* Contact Info */}
                {/* <div className="pt-10">
                  <h1 className="bg-blue-50 font-bold text-[#01183b] py-2 ps-1">
                    Contact Info:
                  </h1>
                  <div className="my-5">
                    <ContactInfo contactInfo={allInfo?.contactInfo} />
                  </div>
                </div> */}
                {/* Academic Info */}
                {/* <div className="pt-10">
                  <h1 className="bg-blue-50 font-bold text-[#01183b] py-2 ps-1">
                    Academic Info:
                  </h1>
                  <div className="my-5">
                    <AcademicInfo academicInfo={allInfo?.academicInfo} />
                  </div>
                </div> */}

                {/* Tutoring Info */}
                {/* <div className="pt-10">
                  <h1 className="bg-blue-50 font-bold text-[#01183b] py-2 ps-1">
                    Tutoring Info:
                  </h1>
                  <div className="my-5">
                    <TutoringInfo tutoringInfo={allInfo?.tutoringInfo} />
                  </div>
                </div> */}

                {/*Additional Tutoring Info */}
                {/* <div className="pt-10">
                  <h1 className="bg-blue-50 font-bold text-[#01183b] py-2 ps-1">
                    Additional Tutoring Info:
                  </h1>
                  <div className="my-5">
                    <AdditionalTutoringInfo
                      additionalTutoringInfo={allInfo?.additionalInfo}
                    />
                  </div>
                </div> */}

                {/*Promo Info */}
                {/* <div className="pt-10">
                  <h1 className="bg-blue-50 font-bold text-[#01183b] py-2 ps-1">
                    Promo Info:
                  </h1>
                  <div className="my-5">
                    <PromoInfo promoInfo={allInfo?.promoInfo} />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorProfile;
