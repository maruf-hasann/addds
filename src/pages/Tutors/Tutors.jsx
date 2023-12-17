import { FaStreetView } from "react-icons/fa6";
import { useGetPersonalInfoQuery } from "../../store/service/personalInfo/personalInfoApiService";
import { Link } from "react-router-dom";

const Tutors = () => {
  const { data: personalInfoData } = useGetPersonalInfoQuery();
  const personalInfo = personalInfoData?.data;
  console.log(personalInfo);

  const classes =
    "p-4 text-base text-gray-800 font-normal border-b whitespace-nowrap";

  return (
    <div className="py-10">
      <div className="flex justify-between items-center pb-3">
        <h1 className="font-bold text-2xl text-white">All School PM</h1>
        <div className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer">
          Add New
        </div>
      </div>
      <div>
        <table className="w-full text-left overflow-x-scroll">
          {/* head */}
          <thead>
            <tr>
              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold w-[120px]">
                Sl
              </th>
              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold">
                Name
              </th>

              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold">
                Number
              </th>
              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold">
                Email
              </th>

              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold">
                City
              </th>
              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold">
                Area
              </th>

              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold w-[120px] text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {[personalInfo, personalInfo]?.map((info, idx) => (
              <tr className={`hover:bg-blue-50`} key={idx}>
                <th className={`${classes} w-[120px]`}>{idx + 1}</th>
                <td className={classes}>{personalInfo?.fullName}</td>
                <td className={classes}>{personalInfo?.phoneNumber}</td>
                <td className={classes}>{personalInfo?.email}</td>

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
