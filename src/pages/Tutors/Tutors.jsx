import { FaStreetView } from "react-icons/fa6";
import { useGetPersonalInfoQuery } from "../../store/service/personalInfo/personalInfoApiService";
import { Link } from "react-router-dom";

const Tutors = () => {
  const { data: personalInfoData } = useGetPersonalInfoQuery();
  const personalInfo = personalInfoData?.data;
  console.log(personalInfo);

  const classes = "p-4 border-b border-blue-gray-50 whitespace-nowrap";

  return (
    <div className="py-10">
      <div className="flex justify-between items-center border-b pb-3">
        <h1 className="font-bold">All School PM</h1>
        <div className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 bg-white cursor-pointer">
          Add New
        </div>
      </div>
      <div>
        <table className="w-full text-left overflow-x-scroll">
          {/* head */}
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Sl
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Name
              </th>

              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Number
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Email
              </th>
              {/* <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Gender
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Country
              </th> */}
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                City
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Area
              </th>

              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-[120px] text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {[personalInfo, personalInfo]?.map((info, idx) => (
              <tr className={classes} key={idx}>
                <th className={classes}>{idx + 1}</th>
                <td className={classes}>{personalInfo?.fullName}</td>
                <td className={classes}>{personalInfo?.phoneNumber}</td>
                <td className={classes}>{personalInfo?.email}</td>
                {/* <td className={`capitalize ${classes}`}>
                  {personalInfo?.gender}
                </td>
                <td className={classes}>{personalInfo?.country}</td> */}
                <td className={classes}>{personalInfo?.city}</td>
                <td className={classes}>{personalInfo?.area}</td>
                <td className={`${classes} w-[120px] flex gap-3 border-b-0`}>
                  <Link
                    to={`/tutor-profile/${personalInfo?.phoneNumber}`}
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

export default Tutors;
