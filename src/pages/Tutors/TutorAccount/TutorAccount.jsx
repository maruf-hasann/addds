import { FaStreetView } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useGetListOfTutorWithAcademicInfoQuery } from "../../../store/service/tutorInfoFilter/tutorInfoFilterApiService";
import DataTable from "../../../components/Shared/DataTable/DataTable";
import { Button } from "@material-tailwind/react";

const TutorAccount = () => {
    const { data: tutorsInfoData, isLoading } =
        useGetListOfTutorWithAcademicInfoQuery();
    const tutorsInfo = tutorsInfoData?.data;

    return (
        <div className="py-10 w-full">
            <div className="flex justify-between items-center mb-5">
                <h1 className="font-bold text-xl md:text-2xl text-white">
                    All Tutor Account
                </h1>
            </div>

            <DataTable
                isLoading={isLoading}
                F
                error={false}
                tableData={tutorsInfo}
                handleSelectedRowItem={(data) => console.log(data)}
                columns={[
                    // personal info start
                    {
                        name: "Profile",
                        render: ({ item }) => (
                            <div>
                                {item?.identityInfo?.personalPhoto ? (
                                    <img
                                        src={item?.identityInfo?.personalPhoto}
                                        alt=""
                                        className="h-8 w-8 object-cover rounded-full"
                                    />
                                ) : (
                                    "N/A"
                                )}
                            </div>
                        ),
                    },
                    {
                        name: "Name",
                        dataIndex: "personalInfo",
                        dataIndex2: "fullName",
                        key: "_id",
                    },
                    {
                        name: "Number",
                        dataIndex: "personalInfo",
                        dataIndex2: "phoneNumber",
                        key: "_id",
                    },
                    {
                        name: "Email",
                        dataIndex: "personalInfo",
                        dataIndex2: "email",
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
                    // contact info start
                    {
                        name: "Whatsapp Number",
                        dataIndex: "contactInfo",
                        dataIndex2: "whatsappNumber",
                        key: "_id",
                    },
                    {
                        name: "Facebook URL",
                        dataIndex: "contactInfo",
                        dataIndex2: "facebookUrl",
                        key: "_id",
                    },
                    {
                        name: "Google Meet URL",
                        dataIndex: "contactInfo",
                        dataIndex2: "googleMeetUrl",
                        key: "_id",
                    },
                    {
                        name: "Emergency Contact Name",
                        dataIndex: "contactInfo",
                        dataIndex2: "emergencyContactName",
                        key: "_id",
                    },
                    {
                        name: "Emergency Contact Number",
                        dataIndex: "contactInfo",
                        dataIndex2: "emergencyContactNumber",
                        key: "_id",
                    },
                    {
                        name: "Emergency Contact Relation",
                        dataIndex: "contactInfo",
                        dataIndex2: "emergencyContactRelation",
                        key: "_id",
                    },
                    {
                        name: "Interview Convenient Time",
                        dataIndex: "contactInfo",
                        dataIndex2: "interviewConvenientTime",
                        key: "_id",
                    },
                    // academic info start
                    {
                        name: "Education Variant",
                        dataIndex: "academicInfo",
                        dataIndex2: "educationVariant",
                        key: "_id",
                    },
                    {
                        name: "School Name",
                        dataIndex: "academicInfo",
                        dataIndex2: "schoolName",
                        key: "_id",
                    },
                    {
                        name: "High School Board",
                        dataIndex: "academicInfo",
                        dataIndex2: "highSchoolBoard",
                        key: "_id",
                    },
                    {
                        name: "High School Result",
                        dataIndex: "academicInfo",
                        dataIndex2: "highSchoolResult",
                        key: "_id",
                    },
                    {
                        name: "Collage Name",
                        dataIndex: "academicInfo",
                        dataIndex2: "collageName",
                        key: "_id",
                    },
                    {
                        name: "Collage Board",
                        dataIndex: "academicInfo",
                        dataIndex2: "collageBoard",
                        key: "_id",
                    },
                    {
                        name: "Collage Result",
                        dataIndex: "academicInfo",
                        dataIndex2: "collageResult",
                        key: "_id",
                    },
                    {
                        name: "University Name",
                        dataIndex: "academicInfo",
                        dataIndex2: "universityName",
                        key: "_id",
                    },
                    {
                        name: "Subject Name",
                        dataIndex: "academicInfo",
                        dataIndex2: "subjectsName",
                        key: "_id",
                    },
                    {
                        name: "University Running Year",
                        dataIndex: "academicInfo",
                        dataIndex2: "universityRunningYear",
                        key: "_id",
                    },
                    {
                        name: "Current Affair",
                        dataIndex: "academicInfo",
                        dataIndex2: "currentAffair",
                        key: "_id",
                    },
                    {
                        name: "Actions",
                        render: ({ item }) => (
                            <div className="flex gap-2">
                                <Link
                                    to={`/tutor-account-details/${item?.personalInfo?.phoneNumber}`}
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
                            </div>
                        ),
                    },
                ]}
            />
        </div>
    );
};

export default TutorAccount;
