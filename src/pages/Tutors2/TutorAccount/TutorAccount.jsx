import { FaStreetView } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useGetTutorInfoFilterDataQuery } from "../../../store/service/tutorInfoFilter/tutorInfoFilterApiService";

const TutorAccount = () => {
  const { data: tutorsInfoData } =
    useGetTutorInfoFilterDataQuery("8801708666342");
  const tutorsInfo = tutorsInfoData?.data[0];
  console.log(tutorsInfo);

  const tableDataClasses =
    "p-4 text-base text-gray-800 font-normal border-b whitespace-nowrap";
  const tableHeadClasses =
    "text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold whitespace-nowrap";

  return (
    <div className="py-10 w-full">
      <div className="flex justify-between items-center pb-3">
        <h1 className="font-bold text-2xl text-white">All Tutor Account</h1>
      </div>
      <div className="overflow-x-scroll rounded bg-white">
        <table className="w-full text-left h-auto">
          {/* head */}
          <thead>
            <tr>
              <th className={`${tableHeadClasses}`}>Sl</th>
              <th className={`${tableHeadClasses}`}>Name</th>

              <th className={`${tableHeadClasses}`}>Number</th>
              <th className={`${tableHeadClasses}`}>Email</th>
              <th className={`${tableHeadClasses}`}>Gender</th>
              <th className={`${tableHeadClasses}`}>Country</th>
              <th className={`${tableHeadClasses}`}>City</th>
              <th className={`${tableHeadClasses}`}>Area</th>
              <th className={`${tableHeadClasses}`}>Whatsapp Number</th>
              <th className={`${tableHeadClasses}`}>Facebook URL</th>
              <th className={`${tableHeadClasses}`}>Google Meet URL</th>
              <th className={`${tableHeadClasses}`}>Emergency Contact Name</th>
              <th className={`${tableHeadClasses}`}>
                Emergency Contact Number
              </th>
              <th className={`${tableHeadClasses}`}>
                Emergency Contact Relation
              </th>
              <th className={`${tableHeadClasses}`}>
                Interview Convenient Time
              </th>
              <th className={`${tableHeadClasses}`}>Education Variant</th>
              <th className={`${tableHeadClasses}`}>School Name</th>
              <th className={`${tableHeadClasses}`}>High School Board</th>
              <th className={`${tableHeadClasses}`}>High School Result</th>
              <th className={`${tableHeadClasses}`}>Collage Name</th>
              <th className={`${tableHeadClasses}`}>Collage Board</th>
              <th className={`${tableHeadClasses}`}>Collage Result</th>
              <th className={`${tableHeadClasses}`}>University Name</th>
              <th className={`${tableHeadClasses}`}>Subject Name</th>
              <th className={`${tableHeadClasses}`}>University Running Year</th>
              <th className={`${tableHeadClasses}`}>Current Affair</th>

              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold w-[120px] text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {[tutorsInfo, tutorsInfo]?.map((info, idx) => (
              <tr className={`hover:bg-blue-50`} key={idx}>
                <th className={tableDataClasses}>{idx + 1}</th>
                <td className={tableDataClasses}>
                  {tutorsInfo?.personalInfo?.fullName}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.personalInfo?.phoneNumber}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.personalInfo?.email}
                </td>
                <td className={`capitalize ${tableDataClasses}`}>
                  {tutorsInfo?.personalInfo?.gender}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.personalInfo?.country}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.personalInfo?.city}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.personalInfo?.area}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.contactInfo?.whatsappNumber}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.contactInfo?.facebookUrl}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.contactInfo?.googleMeetUrl}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.contactInfo?.emergencyContactName}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.contactInfo?.emergencyContactNumber}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.contactInfo?.emergencyContactRelation}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.contactInfo?.interviewConvenientTime}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.academicInfo?.educationVariant}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.academicInfo?.schoolName}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.academicInfo?.highSchoolBoard}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.academicInfo?.highSchoolResult}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.academicInfo?.collageName}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.academicInfo?.collageBoard}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.academicInfo?.collageResult}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.academicInfo?.universityName}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.academicInfo?.subjectsName}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.academicInfo?.universityRunningYear}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.academicInfo?.currentAffair}
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

export default TutorAccount;
