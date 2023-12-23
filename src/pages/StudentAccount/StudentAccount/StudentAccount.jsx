import { FaStreetView, FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useGetAllStudentQuery } from "../../../store/service/studentInfoFilter/studentInfoFilterApiService";

const StudentAccount = () => {
    const { data: studentsInfoData } = useGetAllStudentQuery("8801919195934");
    const studentsInfo = studentsInfoData?.data;
    console.log(studentsInfo, "studentsInfo");

    const tableDataClasses =
        "p-4 border-b border-blue-gray-50 whitespace-nowrap";
    const tableHeadClasses =
        "border-b border-blue-gray-100 bg-blue-gray-50 p-4 whitespace-nowrap";

    const headerOfTable = [
        "Sl",
        "Profile Image",
        "Full Name",
        "Phone Number",
        "Gender",
        "Country",
        "City",
        "Area",
        "Home Address",
        "Whatsapp Number",
        "Emergency Contact Number",
    ];

    return (
        <div className="py-10 w-full">
            <div className="flex justify-between items-center border-b pb-3">
                <h1 className="font-bold mb-1 text-white text-2xl">
                    All Student Account
                </h1>
            </div>
            <div className="overflow-x-scroll bg-white">
                <table className="w-full text-left h-auto">
                    {/* head */}
                    <thead>
                        <tr>
                            {headerOfTable?.map((ht) => (
                                <th key={ht} className={`${tableHeadClasses}`}>
                                    {ht}
                                </th>
                            ))}
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-[120px] text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentsInfo?.map((info, idx) => (
                            <tr className={tableDataClasses} key={idx}>
                                <th className={tableDataClasses}>{idx + 1}</th>
                                <th
                                    scope="row"
                                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                                >
                                    {info?.identityInfo?.personalPhoto ? (
                                        <img
                                            class="w-10 h-10 rounded-full"
                                            src={
                                                info?.identityInfo
                                                    ?.personalPhoto
                                            }
                                            alt={info?.personalInfo?.fullName}
                                        />
                                    ) : (
                                        <FaUser class="w-10 h-10 rounded-full" />
                                    )}
                                </th>
                                <td className={tableDataClasses}>
                                    {info?.personalInfo?.fullName}
                                </td>
                                <td className={tableDataClasses}>
                                    {info?.personalInfo?.phoneNumber}
                                </td>
                                <td className={tableDataClasses}>
                                    {info?.personalInfo?.email}
                                </td>
                                <td
                                    className={`capitalize ${tableDataClasses}`}
                                >
                                    {info?.personalInfo?.gender}
                                </td>
                                <td className={tableDataClasses}>
                                    {info?.personalInfo?.country}
                                </td>
                                <td className={tableDataClasses}>
                                    {info?.personalInfo?.city}
                                </td>
                                <td className={tableDataClasses}>
                                    {info?.personalInfo?.area}
                                </td>
                                <td className={tableDataClasses}>
                                    {info?.contactInfo?.whatsappNumber}
                                </td>
                                <td className={tableDataClasses}>
                                    {info?.contactInfo?.emergencyContactNumber}
                                </td>
                                <td
                                    className={`${tableDataClasses} w-[120px] flex gap-3 border-b-0`}
                                >
                                    <Link
                                        to={`/student-profile/${info?.phoneNumber}`}
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

export default StudentAccount;
