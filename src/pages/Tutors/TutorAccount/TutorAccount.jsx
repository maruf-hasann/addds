import { FaStreetView } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {
  useGetListOfTutorWithAcademicInfoQuery,
  useGetTutorInfoFilterDataQuery,
} from "../../../store/service/tutorInfoFilter/tutorInfoFilterApiService";

const TutorAccount = () => {
  const { data: tutorsInfoData } = useGetListOfTutorWithAcademicInfoQuery();
  const tutorsInfo = tutorsInfoData?.data;

  const tableDataClasses =
    "p-4 text-base text-gray-800 font-normal border-b whitespace-nowrap";
  const tableHeadClasses =
    "text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold whitespace-nowrap";

  return (
    <div className="py-10 w-full">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-xl md:text-2xl text-white">
          All Tutor Account
        </h1>
      </div>
      <div className="overflow-x-scroll rounded bg-white">
        <table className="w-full text-left h-auto">
          {/* head */}
          <thead>
            <tr>
              <th className={`${tableHeadClasses}`}>Sl</th>

              <th className={`${tableHeadClasses}`}>Profile</th>
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
            {tutorsInfo?.map((info, idx) => (
              <tr className={`hover:bg-blue-50`} key={idx}>
                <th className={tableDataClasses}>{idx + 1}</th>
                {/* profile */}
                <td className={`${tableDataClasses} mx-auto text-center`}>
                  {info?.identityInfo?.personalPhoto ? (
                    <img
                      src={info?.identityInfo?.personalPhoto}
                      alt=""
                      className="h-12 w-12 object-cover rounded-full"
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                {/* name */}
                <td className={tableDataClasses}>
                  {info?.personalInfo?.fullName
                    ? info?.personalInfo?.fullName
                    : "N/A"}
                </td>
                {/* phone number */}
                <td className={tableDataClasses}>
                  {info?.personalInfo?.phoneNumber
                    ? info?.personalInfo?.phoneNumber
                    : "N/A"}
                </td>
                {/* email */}
                <td className={tableDataClasses}>
                  {info?.personalInfo?.email
                    ? info?.personalInfo?.email
                    : "N/A"}
                </td>
                {/* gender */}
                <td className={`capitalize ${tableDataClasses}`}>
                  {info?.personalInfo?.gender
                    ? info?.personalInfo?.gender
                    : "N/A"}
                </td>
                {/* country */}
                <td className={tableDataClasses}>
                  {info?.personalInfo?.country
                    ? info?.personalInfo?.country
                    : "N/A"}
                </td>
                {/* city */}
                <td className={tableDataClasses}>
                  {info?.personalInfo?.city ? info?.personalInfo?.city : "N/A"}
                </td>
                {/* area */}
                <td className={tableDataClasses}>
                  {info?.personalInfo?.area ? info?.personalInfo?.area : "N/A"}
                </td>
                {/* whatsapp number */}
                <td className={tableDataClasses}>
                  {info?.contactInfo?.whatsappNumber
                    ? info?.contactInfo?.whatsappNumber
                    : "N/A"}
                </td>
                {/* facebook url */}
                <td className={tableDataClasses}>
                  {info?.contactInfo?.facebookUrl
                    ? info?.contactInfo?.facebookUrl
                    : "N/A"}
                </td>
                {/* google meet */}
                <td className={tableDataClasses}>
                  {info?.contactInfo?.googleMeetUrl
                    ? info?.contactInfo?.googleMeetUrl
                    : "N/A"}
                </td>
                {/* emergency contact name */}
                <td className={tableDataClasses}>
                  {info?.contactInfo?.emergencyContactName
                    ? info?.contactInfo?.emergencyContactName
                    : "N/A"}
                </td>
                {/* emergency contact number */}
                <td className={tableDataClasses}>
                  {info?.contactInfo?.emergencyContactNumber
                    ? info?.contactInfo?.emergencyContactNumber
                    : "N/A"}
                </td>
                {/* emergency contact relation */}
                <td className={tableDataClasses}>
                  {info?.contactInfo?.emergencyContactRelation
                    ? info?.contactInfo?.emergencyContactRelation
                    : "N/A"}
                </td>
                {/* interview convenient time */}
                <td className={tableDataClasses}>
                  {info?.contactInfo?.interviewConvenientTime
                    ? info?.contactInfo?.interviewConvenientTime
                    : "N/A"}
                </td>
                {/* education variant */}
                <td className={tableDataClasses}>
                  {info?.academicInfo?.educationVariant
                    ? info?.academicInfo?.educationVariant
                    : "N/A"}
                </td>
                {/* school name */}
                <td className={tableDataClasses}>
                  {info?.academicInfo?.schoolName
                    ? info?.academicInfo?.schoolName
                    : "N/A"}
                </td>
                {/* highschool board */}
                <td className={tableDataClasses}>
                  {info?.academicInfo?.highSchoolBoard
                    ? info?.academicInfo?.highSchoolBoard
                    : "N/A"}
                </td>
                {/* high school result */}
                <td className={tableDataClasses}>
                  {info?.academicInfo?.highSchoolResult
                    ? info?.academicInfo?.highSchoolResult
                    : "N/A"}
                </td>
                {/* collage name */}
                <td className={tableDataClasses}>
                  {info?.academicInfo?.collageName
                    ? info?.academicInfo?.collageName
                    : "N/A"}
                </td>
                {/* collage board */}
                <td className={tableDataClasses}>
                  {info?.academicInfo?.collageBoard
                    ? info?.academicInfo?.collageBoard
                    : "N/A"}
                </td>
                {/* collage result */}
                <td className={tableDataClasses}>
                  {info?.academicInfo?.collageResult
                    ? info?.academicInfo?.collageResult
                    : "N/A"}
                </td>
                {/* university name */}
                <td className={tableDataClasses}>
                  {info?.academicInfo?.universityName
                    ? info?.academicInfo?.universityName
                    : "N/A"}
                </td>
                {/* subject name */}
                <td className={tableDataClasses}>
                  {info?.academicInfo?.subjectsName
                    ? info?.academicInfo?.subjectsName
                    : "N/A"}
                </td>
                {/* university running year */}
                <td className={tableDataClasses}>
                  {info?.academicInfo?.universityRunningYear
                    ? info?.academicInfo?.universityRunningYear
                    : "N/A"}
                </td>
                {/* current affair */}
                <td className={tableDataClasses}>
                  {info?.academicInfo?.currentAffair
                    ? info?.academicInfo?.currentAffair
                    : "N/A"}
                </td>
                <td className={`${tableDataClasses} w-[120px]`}>
                  <Link
                    to={`/tutor-profile/${info?.personalInfo?.phoneNumber}`}
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
