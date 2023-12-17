import { FaStreetView } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useGetTutorInfoFilterDataQuery } from "../../../store/service/tutorInfoFilter/tutorInfoFilterApiService";

const AcademicTutoring = () => {
  const { data: tutorsInfoData } =
    useGetTutorInfoFilterDataQuery("8801708666342");
  const tutorsInfo = tutorsInfoData?.data[0];
  console.log(tutorsInfo);

  const tableDataClasses = "p-4 border-b border-blue-gray-50 whitespace-nowrap";
  const tableDataArrayClasses =
    "bg-gray-200 mx-1 px-2 py-1 hover:text-[#1C6AAF] hover:bg-light-blue-50";
  const tableHeadClasses =
    "border-b border-blue-gray-100 bg-blue-gray-50 p-4 whitespace-nowrap";

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
              <th className={`${tableHeadClasses} text-center`}>
                <h2>Promotion</h2>
                <div className="flex justify-between border-t-2 border-white">
                  <p className="border-r border-white w-full">Image</p>
                  <p className="border-l border-white w-full">Video</p>
                </div>
              </th>
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
                  <div className="flex gap-2">
                    <div>
                      <div className="border-b font-semibold">Main Subject</div>
                      <div className="font-semibold">Sub Subject</div>
                    </div>
                    <div className="flex">
                      {tutorsInfo?.tutoringInfo?.tutoringSubjects?.map(
                        (subject, idx) => (
                          <div key={idx} className="px-5">
                            <div className="border-b">
                              {subject?.mainSubject}
                            </div>
                            <div>
                              {subject?.subSubject
                                ? subject?.subSubject
                                : "Empty"}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.tutoringInfo?.isTeachTestPapers ? "Yes" : "No"}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.tutoringInfo?.isTeachTestPapers ? (
                    <div className="flex gap-2">
                      <div>
                        <div className="border-b font-semibold">
                          Main Subject
                        </div>
                        <div className="font-semibold">Sub Subject</div>
                      </div>
                      <div className="flex">
                        {tutorsInfo?.tutoringInfo?.teachTestPapers?.map(
                          (subject, idx) => (
                            <div key={idx} className="px-5">
                              <div className="border-b">
                                {subject?.mainSubject}
                              </div>
                              <div>
                                {subject?.subSubject
                                  ? subject?.subSubject
                                  : "Empty"}
                              </div>
                            </div>
                          )
                        )}
                      </div>
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
                    <div className="flex gap-2">
                      <div>
                        <div className="border-b font-semibold">
                          Main Subject
                        </div>
                        <div className="font-semibold">Sub Subject</div>
                      </div>
                      <div className="flex">
                        {tutorsInfo?.tutoringInfo?.teachAdmissionTest?.map(
                          (subject, idx) => (
                            <div key={idx} className="px-5">
                              <div className="border-b">
                                {subject?.mainSubject}
                              </div>
                              <div>
                                {subject?.subSubject
                                  ? subject?.subSubject
                                  : "Empty"}
                              </div>
                            </div>
                          )
                        )}
                      </div>
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
                  {tutorsInfo?.additionalInfo?.teachingHistory}
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
                  {tutorsInfo?.additionalInfo?.personalStatement}
                </td>
                <td className={tableDataClasses}>
                  <div className="flex justify-between">
                    <p className="border-r  w-full">Image</p>
                    <p className="border-l  w-full">Video</p>
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
    </div>
  );
};

export default AcademicTutoring;
