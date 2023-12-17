import { FaStreetView } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useGetTutorInfoFilterDataQuery } from "../../../store/service/tutorInfoFilter/tutorInfoFilterApiService";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { CiCircleRemove } from "react-icons/ci";
import { useState } from "react";

const AcademicTutoring = () => {
  const [open, setOpen] = useState(false);
  const [textForModal, setTextForModal] = useState(null);

  const handleOpen = () => {
    setOpen(!open);
    setTextForModal(null);
  };
  const { data: tutorsInfoData } =
    useGetTutorInfoFilterDataQuery("8801708666342");
  const tutorsInfo = tutorsInfoData?.data[0];

  const tableDataClasses =
    "px-4 py-3 border-b border-blue-gray-50 whitespace-nowrap";
  const tableDataArrayClasses =
    "bg-gray-200 mx-1 px-2 py-1 hover:text-[#1C6AAF] hover:bg-light-blue-50";
  const tableHeadClasses =
    "border-b border-blue-gray-100 bg-blue-gray-50 p-4 whitespace-nowrap";

  const transformSubjectArray = (inputArray) => {
    // Check if the input is an array
    if (!Array.isArray(inputArray)) {
      console.error("Input is not an array");
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
    <div className="py-10 w-full">
      <div className="flex justify-between items-center border-b pb-3">
        <h1 className="font-bold mb-3">All Tutor Account</h1>
      </div>
      <div className="overflow-x-scroll">
        <table className="w-full text-left h-auto">
          {/* head */}
          <thead>
            <tr>
              <th className={tableHeadClasses}>Sl</th>
              <th className={tableHeadClasses}>Name</th>
              <th className={tableHeadClasses}>Number</th>
              <th className={tableHeadClasses}>Tutoring Variant</th>
              <th className={tableHeadClasses}>Tutoring Grade</th>
              <th className={tableHeadClasses}>Tutoring Curriculum</th>
              <th className={tableHeadClasses}>Tutoring Subjects</th>
              <th className={tableHeadClasses}>Teach Test Papers</th>
              <th className={tableHeadClasses}>Test Paper Subjects</th>
              <th className={tableHeadClasses}>Teach Admission Test</th>
              <th className={tableHeadClasses}>Admission Test Subjects</th>
              <th className={tableHeadClasses}>Grow Tutoring Program</th>
              <th className={tableHeadClasses}>Tutoring Programs</th>
              <th className={tableHeadClasses}>Tutoring Training</th>
              <th className={tableHeadClasses}>Teaching Experience</th>
              <th className={tableHeadClasses}>Years of Experience</th>
              <th className={tableHeadClasses}>Teaching History</th>
              <th className={tableHeadClasses}>Tutoring Place</th>
              <th className={tableHeadClasses}>Student Variant</th>
              <th className={tableHeadClasses}>Min. Exp. Salary</th>
              <th className={tableHeadClasses}>Max. Exp. Salary</th>
              <th className={tableHeadClasses}>Tutoring Location</th>
              <th className={tableHeadClasses}>Personal Statement</th>
              <th className={`${tableHeadClasses} text-center`}>Promotion</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-[120px] text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {[tutorsInfo, tutorsInfo]?.map((info, idx) => (
              <tr className={tableDataClasses} key={idx}>
                <th className={tableDataClasses}>{idx + 1}</th>
                <td className={tableDataClasses}>
                  {tutorsInfo?.personalInfo?.fullName}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.personalInfo?.phoneNumber}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.tutoringInfo?.tutoringVariant?.map(
                    (variant, idx) => (
                      <span key={idx} className={tableDataArrayClasses}>
                        {variant?.variantName}
                      </span>
                    )
                  )}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.tutoringInfo?.tutoringGrade?.map(
                    (grade, idx) => (
                      <span key={idx} className={tableDataArrayClasses}>
                        {grade?.gradeName}
                      </span>
                    )
                  )}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.tutoringInfo?.tutoringCurriculum?.map(
                    (curriculum, idx) => (
                      <span key={idx} className={tableDataArrayClasses}>
                        {curriculum?.curriculumBoard}
                      </span>
                    )
                  )}
                </td>
                <td className={tableDataClasses}>
                  <div className="flex">
                    {transformSubjectArray(
                      tutorsInfo?.tutoringInfo?.tutoringSubjects
                    )?.map((subject, idx) => (
                      <span key={idx} className={tableDataArrayClasses}>
                        {subject.subSubjects?.length
                          ? `${subject.mainSubject}(${subject?.subSubjects?.map(
                              (subSub) => subSub
                            )})`
                          : subject?.mainSubject}
                      </span>
                    ))}
                  </div>
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.tutoringInfo?.isTeachTestPapers ? "Yes" : "No"}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.tutoringInfo?.isTeachTestPapers ? (
                    <div className="flex">
                      {transformSubjectArray(
                        tutorsInfo?.tutoringInfo?.teachTestPapers
                      )?.map((subject, idx) => (
                        <span key={idx} className={tableDataArrayClasses}>
                          {subject.subSubjects?.length
                            ? `${
                                subject.mainSubject
                              }(${subject?.subSubjects?.map(
                                (subSub) => subSub
                              )})`
                            : subject?.mainSubject}
                        </span>
                      ))}
                    </div>
                  ) : (
                    "Empty"
                  )}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.tutoringInfo?.isTeachAdmissionTest
                    ? "Yes"
                    : "No"}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.tutoringInfo?.isTeachAdmissionTest ? (
                    <div className="flex">
                      {transformSubjectArray(
                        tutorsInfo?.tutoringInfo?.teachAdmissionTest
                      )?.map((subject, idx) => (
                        <span key={idx} className={tableDataArrayClasses}>
                          {subject.subSubjects?.length
                            ? `${
                                subject.mainSubject
                              }(${subject?.subSubjects?.map(
                                (subSub) => subSub
                              )})`
                            : subject?.mainSubject}
                        </span>
                      ))}
                    </div>
                  ) : (
                    "Empty"
                  )}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.additionalInfo?.isGrowTutoringProgram
                    ? "Yes"
                    : "No"}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.additionalInfo?.tutoringProgram?.map(
                    (program, idx) => (
                      <span key={idx} className={tableDataArrayClasses}>
                        {program?.programName}
                      </span>
                    )
                  )}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.additionalInfo?.isTutoringTraining
                    ? "Yes"
                    : "No"}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.additionalInfo?.isTeachingExperience
                    ? "Yes"
                    : "No"}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.additionalInfo?.yearsOfExperience}
                </td>
                <td className={tableDataClasses}>
                  <div>
                    {tutorsInfo?.additionalInfo?.teachingHistory?.length >
                    30 ? (
                      <p>
                        {tutorsInfo?.additionalInfo?.teachingHistory?.slice(
                          0,
                          30
                        )}
                        <span
                          onClick={() => {
                            setOpen(!open);
                            setTextForModal(
                              tutorsInfo?.additionalInfo?.teachingHistory
                            );
                          }}
                          className="cursor-pointer text-[#1D6AAF]"
                        >
                          ...See More
                        </span>
                      </p>
                    ) : (
                      tutorsInfo?.additionalInfo?.teachingHistory
                    )}
                  </div>
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.additionalInfo?.tutoringPlace?.map(
                    (place, idx) => (
                      <span key={idx} className={tableDataArrayClasses}>
                        {place?.placeName}
                      </span>
                    )
                  )}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.additionalInfo?.studentVariant?.map(
                    (variant, idx) => (
                      <span key={idx} className={tableDataArrayClasses}>
                        {variant?.variantName}
                      </span>
                    )
                  )}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.additionalInfo?.minExpectedSalary}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.additionalInfo?.maxExpectedSalary}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.additionalInfo?.tutoringLocation?.map(
                    (location, idx) => (
                      <span key={idx} className={tableDataArrayClasses}>
                        {location?.locationName}
                      </span>
                    )
                  )}
                </td>
                <td className={tableDataClasses}>
                  <div>
                    {tutorsInfo?.additionalInfo?.personalStatement?.length >
                    30 ? (
                      <p>
                        {tutorsInfo?.additionalInfo?.personalStatement?.slice(
                          0,
                          30
                        )}
                        <span
                          onClick={() => {
                            setOpen(!open);
                            setTextForModal(
                              tutorsInfo?.additionalInfo?.personalStatement
                            );
                          }}
                          className="cursor-pointer text-[#1D6AAF]"
                        >
                          ...See More
                        </span>
                      </p>
                    ) : (
                      tutorsInfo?.additionalInfo?.personalStatement
                    )}
                  </div>
                </td>
                <td className={tableDataClasses}>
                  <div className="flex justify-between">
                    <p className="border-r  w-full px-5 cursor-pointer hover:text-[#1D6AAF]">
                      Show Images
                    </p>
                    <p className="border-l  w-full px-5 cursor-pointer hover:text-[#1D6AAF]">
                      Show Videos
                    </p>
                  </div>
                </td>
                <td
                  className={`${tableDataClasses} w-[120px] flex gap-3 border-b-0`}
                >
                  <Link
                    to={`/tutor-profile/${tutorsInfo?.personalInfo?.phoneNumber}`}
                    className="text-center flex justify-center mx-auto"
                  >
                    <FaStreetView
                      title="View Profile"
                      className="text-center mx-auto cursor-pointer hover:text-blue-500"
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {textForModal && open ? (
        <Dialog open={open} handler={handleOpen}>
          <DialogBody className="relative p-5 pr-10">
            <CiCircleRemove
              onClick={handleOpen}
              className="cursor-pointer text-4xl text-red-500 absolute top-0 right-0"
            />
            {textForModal}
          </DialogBody>
        </Dialog>
      ) : (
        ""
      )}
    </div>
  );
};

export default AcademicTutoring;
