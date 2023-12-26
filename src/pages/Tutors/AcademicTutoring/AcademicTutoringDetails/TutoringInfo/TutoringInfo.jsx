import React from "react";
import { FaLocationPin, FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { TbSquareRoundedCheckFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

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

const TutoringInfo = ({ tutoringInfo, personalInfo, identityInfo }) => {
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

  return (
    <div>
      <div>
        {/* personal info */}
        <div className="bg-white xl:hidden">
          <div className="flex justify-center p-10 ">
            <img
              src={
                identityInfo?.personalPhoto
                  ? identityInfo?.personalPhoto
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
                <h2 className="font-bold text-lg">{personalInfo?.fullName}</h2>
              </div>
              <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                <h4 className="font-medium text-sm mb-1">Location</h4>
                <div className="font-bold text-lg flex  items-center gap-2">
                  <FaLocationPin />{" "}
                  <p>
                    {personalInfo?.homeAddress}, {personalInfo?.area},{" "}
                    {personalInfo?.city}
                  </p>
                </div>
              </div>
              <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                <h4 className="font-medium text-sm mb-1">Number</h4>
                <h2 className="font-bold text-lg flex  items-center gap-2">
                  <FaPhone />
                  <p>{personalInfo?.phoneNumber}</p>
                </h2>
              </div>
              <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                <h4 className="font-medium text-sm mb-1 ">Email</h4>
                <h2 className="font-bold text-lg flex  items-center gap-2 ">
                  <IoMdMail />
                  <p>{personalInfo?.email}</p>
                </h2>
              </div>
            </div>
          </div>
        </div>
        {/* Info Image and Info */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 xl:col-span-8 bg-white rounded-sm">
            <div className="shadow-md rounded-sm">
              <div className="flex justify-between bg-white shadow-md pt-7 pb-3 px-4 rounded-sm">
                <div>
                  <h2 className="capitalize text-2xl font-semibold text-gray-800 ">
                    Tutoring Info
                  </h2>
                </div>
                <div>
                  <Link
                    to={`/edit/tutoring-info/${personalInfo?.phoneNumber}`}
                    className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-0 focus:outline-none focus:ring-cyan-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Edit
                  </Link>
                </div>
              </div>
              <div className="px-5 py-5 bg-[#f1f5f9] ">
                <div className="w-full rounded-md grid grid-cols-1 lg:grid-cols-2  gap-x-2">
                  <ArrayCommonComponent
                    name={"Tutoring Variants"}
                    values={tutoringInfo?.tutoringVariant}
                    valueName={"variantName"}
                  />
                  <ArrayCommonComponent
                    name={"Tutoring Grades"}
                    values={tutoringInfo?.tutoringGrade}
                    valueName={"gradeName"}
                  />
                  <SubjectCommonComponent
                    name={"Tutoring Subjects"}
                    allSubject={transformSubjectArray(
                      tutoringInfo?.tutoringSubjects
                    )}
                  />
                  <ArrayCommonComponent
                    name={"Tutoring Curriculum"}
                    values={tutoringInfo?.tutoringCurriculum}
                    valueName={"curriculumBoard"}
                  />
                  <CommonComponent
                    name={"Teach Admission Test"}
                    value={tutoringInfo?.isTeachAdmissionTest ? "Yes" : "No"}
                  />
                  {tutoringInfo?.isTeachAdmissionTest ? (
                    <SubjectCommonComponent
                      name={"Tutoring Subjects"}
                      allSubject={transformSubjectArray(
                        tutoringInfo?.teachAdmissionTest
                      )}
                    />
                  ) : (
                    ""
                  )}
                  <CommonComponent
                    name={"Teach Test Paper"}
                    value={tutoringInfo?.isTeachTestPapers ? "Yes" : "No"}
                  />
                  {tutoringInfo?.isTeachAdmissionTest ? (
                    <SubjectCommonComponent
                      name={"Tutoring Subjects"}
                      allSubject={transformSubjectArray(
                        tutoringInfo?.teachTestPapers
                      )}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 hidden xl:block rounded-sm">
            <div>
              <div className="p-3 w-full bg-white shadow-md rounded-sm flex justify-center">
                <img
                  src={
                    identityInfo?.personalPhoto
                      ? identityInfo?.personalPhoto
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
                    {personalInfo?.fullName}
                  </h2>
                </div>
                <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                  <h4 className="font-medium text-sm mb-1">Location</h4>
                  <div className="font-bold text-lg flex  items-center gap-2">
                    <p>
                      {personalInfo?.homeAddress}, {personalInfo?.area},{" "}
                      {personalInfo?.city}
                    </p>
                  </div>
                </div>
                <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                  <h4 className="font-medium text-sm mb-1">Number</h4>
                  <h2 className="font-bold text-lg flex  items-center gap-2">
                    <p>{personalInfo?.phoneNumber}</p>
                  </h2>
                </div>
                <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white overflow-hidden">
                  <h4 className="font-medium text-sm mb-1 ">Email</h4>
                  <h2 className="font-bold text-lg flex items-center gap-2">
                    <p>{personalInfo?.email}</p>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutoringInfo;
