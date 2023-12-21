import { FaStreetView } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useGetStudentInfoFilterDataQuery } from "../../../store/service/studentInfoFilter/studentInfoFilterApiService";

const StudentAccount = () => {
    const { data: studentsInfoData } =
        useGetStudentInfoFilterDataQuery("8801919195934");
    const studentsInfo = studentsInfoData?.data[0];
    console.log(studentsInfo);

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
                <h1 className="font-bold mb-1 text-white text-2xl">All Student Account</h1>
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
                        {[studentsInfo, studentsInfo]?.map((info, idx) => (
                            <tr className={tableDataClasses} key={idx}>
                                <th className={tableDataClasses}>{idx + 1}</th>
                                <th
                                    scope="row"
                                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                                >
                                    <img
                                        class="w-10 h-10 rounded-full"
                                        src={
                                            studentsInfo?.identity
                                                ?.personalPhoto
                                        }
                                        alt={
                                            studentsInfo?.personalInfo?.fullName
                                        }
                                    />
                                </th>
                                <td className={tableDataClasses}>
                                    {studentsInfo?.personalInfo?.fullName}
                                </td>
                                <td className={tableDataClasses}>
                                    {studentsInfo?.personalInfo?.phoneNumber}
                                </td>
                                <td className={tableDataClasses}>
                                    {studentsInfo?.personalInfo?.email}
                                </td>
                                <td
                                    className={`capitalize ${tableDataClasses}`}
                                >
                                    {studentsInfo?.personalInfo?.gender}
                                </td>
                                <td className={tableDataClasses}>
                                    {studentsInfo?.personalInfo?.country}
                                </td>
                                <td className={tableDataClasses}>
                                    {studentsInfo?.personalInfo?.city}
                                </td>
                                <td className={tableDataClasses}>
                                    {studentsInfo?.personalInfo?.area}
                                </td>
                                <td className={tableDataClasses}>
                                    {studentsInfo?.contactInfo?.whatsappNumber}
                                </td>
                                <td className={tableDataClasses}>
                                    {
                                        studentsInfo?.contactInfo
                                            ?.emergencyContactNumber
                                    }
                                </td>
                                <td
                                    className={`${tableDataClasses} w-[120px] flex gap-3 border-b-0`}
                                >
                                    <Link
                                        to={`/Student-profile/${studentsInfo?.personalInfo?.phoneNumber}`}
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
