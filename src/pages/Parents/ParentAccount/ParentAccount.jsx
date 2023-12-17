import { FaStreetView } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useGetParentInfoFilterDataQuery } from "../../../store/service/parentInfoFilter/parentInfoFilterApiService";

const ParentAccount = () => {
    const { data: parentsInfoData } =
        useGetParentInfoFilterDataQuery("8801917272522");
    const parentsInfo = parentsInfoData?.data[0];
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
                <h1 className="font-bold mb-3">All Parent Account</h1>
            </div>
            <div className="overflow-x-scroll">
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
                        {[parentsInfo, parentsInfo]?.map((info, idx) => (
                            <tr className={tableDataClasses} key={idx}>
                                <th className={tableDataClasses}>{idx + 1}</th>
                                <td className={tableDataClasses}>
                                    {parentsInfo?.personalInfo?.fullName}
                                </td>
                                <td className={tableDataClasses}>
                                    {parentsInfo?.personalInfo?.phoneNumber}
                                </td>
                                <td className={tableDataClasses}>
                                    {parentsInfo?.personalInfo?.email}
                                </td>
                                <td
                                    className={`capitalize ${tableDataClasses}`}
                                >
                                    {parentsInfo?.personalInfo?.gender}
                                </td>
                                <td className={tableDataClasses}>
                                    {parentsInfo?.personalInfo?.country}
                                </td>
                                <td className={tableDataClasses}>
                                    {parentsInfo?.personalInfo?.city}
                                </td>
                                <td className={tableDataClasses}>
                                    {parentsInfo?.personalInfo?.area}
                                </td>
                                <td className={tableDataClasses}>
                                    {parentsInfo?.contactInfo?.whatsappNumber}
                                </td>
                                <td
                                    className={`${tableDataClasses} w-[120px] flex gap-3 border-b-0`}
                                >
                                    <Link
                                        to={`/parent-profile/${parentsInfo?.personalInfo?.phoneNumber}`}
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
