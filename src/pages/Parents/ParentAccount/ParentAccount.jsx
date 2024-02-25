import { FaStreetView } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useGetAllParentsQuery } from "../../../store/service/parentInfoFilter/parentInfoFilterApiService";
import DataTable from "../../../components/Shared/DataTable/DataTable";
import { Button } from "@material-tailwind/react";

const ParentAccount = () => {
    const { data: parentsInfoData, isLoading } = useGetAllParentsQuery();
    const parentsInfo = parentsInfoData?.data;

    return (
        <div className="py-10 w-full">
            <div className="flex justify-between items-center pb-3">
                <h1 className="font-bold mb-1 text-white text-2xl">
                    All Parent Account
                </h1>
            </div>
            <DataTable
                isLoading={isLoading}
                error={false}
                tableData={parentsInfo}
                handleSelectedRowItem={(data) => console.log(data)}
                columns={[
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
                        name: "Actions",
                        render: ({ item }) => (
                            <Link
                                to={`/parent-profile/${item?.personalInfo?.phoneNumber}`}
                                className="text-center flex justify-center mx-auto "
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

export default ParentAccount;
