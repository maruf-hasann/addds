import { Button } from "@material-tailwind/react";
import { FaStreetView, FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

import DataTable from "../../../components/Shared/DataTable/DataTable";

import { useGetAllStudentQuery } from "../../../store/service/studentInfoFilter/studentInfoFilterApiService";


const StudentAccount = () => {
    const { data: studentsInfoData, isLoading } =
        useGetAllStudentQuery("8801919195934");
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
            <DataTable
                isLoading={isLoading}
                error={false}
                tableData={studentsInfo}
                handleSelectedRowItem={(data) => console.log(data)}
                columns={[
                    {
                        name: "Profile Image",
                        render: ({ item }) => (
                            <div>
                                {item?.identityInfo?.personalPhoto ? (
                                    <img
                                        className="h-10 w-10 rounded-full"
                                        src={item?.identityInfo?.personalPhoto}
                                        alt={item?.personalInfo?.fullName}
                                    />
                                ) : (
                                    <FaUser className="h-10 w-10 rounded-full" />
                                )}
                            </div>
                        ),
                    },
                    {
                        name: "Full Name",
                        dataIndex: "personalInfo",
                        dataIndex2: "fullName",
                        key: "_id",
                    },
                    {
                        name: "Phone Number",
                        dataIndex: "personalInfo",
                        dataIndex2: "phoneNumber",
                        key: "_id",
                    },
                    {
                        name: "Gender",
                        dataIndex: "personalInfo",
                        dataIndex2: "gender",
                        key: "_id",
                    },
                    {
                        name: "Country",
                        dataIndex: "personalInfo",
                        dataIndex2: "country",
                        key: "_id",
                    },
                    {
                        name: "City",
                        dataIndex: "personalInfo",
                        dataIndex2: "city",
                        key: "_id",
                    },
                    {
                        name: "Area",
                        dataIndex: "personalInfo",
                        dataIndex2: "area",
                        key: "_id",
                    },
                    {
                        name: "Home Address",
                        dataIndex: "personalInfo",
                        dataIndex2: "homeAddress",
                        key: "_id",
                    },
                    {
                        name: "Whatsapp Number",
                        dataIndex: "contactInfo",
                        dataIndex2: "whatsappNumber",
                        key: "_id",
                    },
                    {
                        name: "Emergency Contact Number",
                        dataIndex: "contactInfo",
                        dataIndex2: "emergencyContactNumber",
                        key: "_id",
                    },
                    {
                        name: "Actions",
                        render: ({ item }) => (
                            <Link
                                to={`/student-profile/${item?.phoneNumber}`}
                                className="text-center flex justify-center mx-auto"
                            >
                                <Button
                                    color="blue"
                                    size="md"
                                    className="px-3.5 py-2.5 bg-blue-400 shadow-lg"
                                >
                                    <FaStreetView
                                        title="View Profile"
                                        className="text-center text-[16px]"
                                    />
                                </Button>
                            </Link>
                        ),
                    },
                ]}
            />
        </div>
    );
};

export default StudentAccount;
