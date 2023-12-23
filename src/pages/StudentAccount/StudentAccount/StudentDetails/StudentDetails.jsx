import { useParams } from "react-router-dom";
import { useGetStudentInfoFilterDataQuery } from "../../../../store/service/studentInfoFilter/studentInfoFilterApiService";

const StudentDetails = () => {
    const param = useParams();
    const { data: studentsInfoData } = useGetStudentInfoFilterDataQuery(
        param?.number
    );

    const studentInfo = studentsInfoData?.data?.[0];

    return (
        <div className="pt-10 px-2">
            {/* Parent Info Image and Info */}
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-8">
                    <div className="shadow-md rounded-lg">
                        <div className="flex justify-between bg-white shadow-md pt-7 pb-3 px-4">
                            <div>
                                <h2 className="capitalize text-2xl font-semibold text-gray-800 ">
                                    personal Info
                                </h2>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-0 focus:outline-none focus:ring-cyan-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                        <div className="px-5 py-5 bg-[#f1f5f9]">
                            <div className="flex gap-5">
                                <div className="w-full rounded-md">
                                    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                        <h4 className="font-medium text-sm mb-1">
                                            Full Name
                                        </h4>
                                        <h2 className="capitalize font-bold text-lg">
                                            {
                                                studentInfo?.personalInfo
                                                    ?.fullName
                                            }
                                        </h2>
                                    </div>
                                    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                        <h4 className="font-medium text-sm mb-1">
                                            Email
                                        </h4>
                                        <h2 className="font-bold text-lg">
                                            {studentInfo?.personalInfo?.email}
                                        </h2>
                                    </div>
                                    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                        <h4 className="font-medium text-sm mb-1">
                                            Gender
                                        </h4>
                                        <h2 className="capitalize font-bold text-lg">
                                            {studentInfo?.personalInfo?.gender}
                                        </h2>
                                    </div>
                                </div>
                                <div className="w-full rounded-md">
                                    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                        <h4 className="font-medium text-sm mb-1">
                                            Country
                                        </h4>
                                        <h2 className="capitalize font-bold text-lg">
                                            {studentInfo?.personalInfo?.country}
                                        </h2>
                                    </div>
                                    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                        <h4 className="capitalize font-medium text-sm mb-1">
                                            City
                                        </h4>
                                        <h2 className="font-bold text-lg">
                                            {studentInfo?.personalInfo?.city}
                                        </h2>
                                    </div>
                                    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                        <h4 className="font-medium text-sm mb-1">
                                            What's App Number
                                        </h4>
                                        <h2 className="capitalize font-bold text-lg">
                                            {studentInfo?.contactInfo
                                                ?.whatsappNumber
                                                ? studentInfo?.contactInfo
                                                      ?.whatsappNumber
                                                : "No Info"}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="shadow-md rounded-lg my-5">
                        <div className="flex justify-between bg-white shadow-md pt-7 pb-3 px-4">
                            <div>
                                <h2 className="capitalize text-2xl font-semibold text-gray-800 ">
                                    Academic Info
                                </h2>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-0 focus:outline-none focus:ring-cyan-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                        <div className="px-5 py-5 bg-[#f1f5f9]">
                            <div className="flex gap-5">
                                <div className="w-full rounded-md">
                                    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                        <h4 className="font-medium text-sm mb-1">
                                            Education Variant
                                        </h4>
                                        <h2 className="capitalize font-bold text-lg">
                                            {studentInfo?.academicInfo
                                                ?.educationVariant
                                                ? studentInfo?.academicInfo
                                                      ?.educationVariant
                                                : "No Info"}
                                        </h2>
                                    </div>
                                    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                        <h4 className="font-medium text-sm mb-1">
                                            Grade
                                        </h4>
                                        <h2 className="font-bold text-lg">
                                            {studentInfo?.academicInfo?.grade
                                                ? studentInfo?.academicInfo
                                                      ?.grade
                                                : "No Info"}
                                        </h2>
                                    </div>
                                </div>
                                <div className="w-full rounded-md">
                                    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                        <h4 className="font-medium text-sm mb-1">
                                            Institute
                                        </h4>
                                        <h2 className="capitalize font-bold text-lg">
                                            {studentInfo?.academicInfo
                                                ?.institute
                                                ? studentInfo?.academicInfo
                                                      ?.institute
                                                : "No Info"}
                                        </h2>
                                    </div>
                                    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                        <h4 className="font-medium text-sm mb-1">
                                            Curriculum
                                        </h4>
                                        <h2 className="capitalize font-bold text-lg">
                                            {studentInfo?.academicInfo
                                                ?.curriculum
                                                ? studentInfo?.academicInfo
                                                      ?.curriculum
                                                : "No Info"}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-4">
                    <div>
                        <div className="p-3 w-full bg-white shadow-md rounded-lg h-[359px]">
                            {studentInfo?.identity?.personalPhoto ? (
                                <img
                                    className="inline-block w-full rounded-full h-full"
                                    src={studentInfo?.identity?.personalPhoto}
                                    alt={studentInfo?.identity?.fullName}
                                />
                            ) : (
                                <img
                                    src="http://admin.carbangla.com/img/placeholder-profile.png"
                                    className="inline-block w-full h-full"
                                    alt=""
                                />
                            )}
                        </div>
                    </div>
                    <div className="my-4 rounded-md shadow-md">
                        <div className="w-full ">
                            <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                <h4 className="font-medium text-sm mb-1">
                                    Phone Number
                                </h4>
                                <h2 className="font-bold text-lg">
                                    {studentInfo?.personalInfo?.phoneNumber}
                                </h2>
                            </div>
                            <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                <h4 className="font-medium text-sm mb-1">
                                    Home Address
                                </h4>
                                <h2 className="font-bold text-lg">
                                    {studentInfo?.personalInfo?.homeAddress
                                        ? studentInfo?.personalInfo?.homeAddress
                                        : "No Info"}
                                </h2>
                            </div>
                            <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                <h4 className="font-medium text-sm mb-1">
                                    Area
                                </h4>
                                <h2 className="font-bold text-lg">
                                    {studentInfo?.personalInfo?.area
                                        ? studentInfo?.personalInfo?.area
                                        : "No Info"}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDetails;
