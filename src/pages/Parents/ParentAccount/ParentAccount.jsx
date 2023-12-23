import { FaStreetView } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {
    useGetAllParentsQuery
} from "../../../store/service/parentInfoFilter/parentInfoFilterApiService";

const ParentAccount = () => {
    const { data: parentsInfoData } = useGetAllParentsQuery();
    const parentsInfo = parentsInfoData?.data;
    console.log(parentsInfo);

    const tableDataClasses =
        "p-4 border-b border-blue-gray-50 whitespace-nowrap";
    const tableHeadClasses =
        "border-b border-blue-gray-100 bg-blue-gray-50 p-4 whitespace-nowrap";

    const headerOfTable = [
        "Sl",
        "Full Name",
        "Phone Number",
        "Gender",
        "Country",
        "City",
        "Area",
        "Home Address",
        "Whatsapp Number",
    ];

    return (
        <div className="py-10 w-full">
            <div className="flex justify-between items-center border-b pb-3">
                <h1 className="font-bold mb-1 text-white text-2xl">
                    All Parent Account
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
                        {parentsInfo?.map((info, idx) => (
                            <tr className={tableDataClasses} key={idx}>
                                <th className={tableDataClasses}>{idx + 1}</th>
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
                                <td
                                    className={`${tableDataClasses} w-[120px] flex gap-3 border-b-0`}
                                >
                                    <Link
                                        to={`/parent-profile/${info?.personalInfo?.phoneNumber}`}
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

export default ParentAccount;
