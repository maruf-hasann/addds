import { FaStreetView, FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {
    useGetAllMockTestJobsQuery,
    useUpdateJobStatusMutation,
} from "../../../store/service/jobBoard/jobBoardApiService";
import { jobBoardStatus } from "../../../data/jobBoard";
import tutoringSubject from "../../../libs/tutoringSubject";

const MockTestJobBoard = () => {
    // redux api call
    const { data: mockTestJobsData } = useGetAllMockTestJobsQuery();
    const allMockTestJobs = mockTestJobsData?.data;

    // update redux api for mock test job
    const [updateJobStatus] = useUpdateJobStatusMutation();
    // handle change status
    const handleStatusChange = async (value) => {
        console.log(value);
        const updateData = {
            phoneNumber: "8801793439379",
            jobId: value?.jobId,
            jobType: value?.jobType,
        };
        const response = await updateJobStatus(updateData);

        if (response?.error?.data?.success == false) {
            toast.error(response?.error?.data?.errorMessages?.[0]?.message);
            return;
        } else if (response?.data?.success) {
            toast.success("Update Job Post successfully !");
        } else {
            toast.error("Something went wrong..!");
        }
    };

    const tableDataClasses =
        "p-4 border-b border-blue-gray-50 whitespace-nowrap text-center";
    const tableHeadClasses =
        "border-b border-blue-gray-100 bg-blue-gray-50 p-4 whitespace-nowrap text-center";
    const headerOfTable = [
        "Sl",
        "Mock Job Id",
        "Tutoring Place",
        "Tutoring Category",
        "Tutoring Variant",
        "Education Variant",
        "Job Type",
        "Institute",
        "Curriculum",
        "Salary",
        "Preferred Gender",
        "Student Gender",
        "Tutoring Subjects",
        "Location",
        "Mock Test Status",
    ];

    return (
        <div className="py-10 w-full">
            <div className="flex justify-between items-center border-b pb-3">
                <h1 className="font-bold mb-1 text-white text-2xl">
                    All Mock Test Jobs
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
                        {allMockTestJobs?.map((mockTestJob, idx) => (
                            <tr
                                className={tableDataClasses}
                                key={mockTestJob?.jobId}
                            >
                                <th className={tableDataClasses}>{idx + 1}</th>
                                <td className={tableDataClasses}>
                                    {mockTestJob?.mockJobId}
                                </td>
                                <td className={tableDataClasses}>
                                    {mockTestJob?.tutoringPlace}
                                </td>
                                <td className={tableDataClasses}>
                                    {mockTestJob?.tutoringCategory}
                                </td>
                                <td
                                    className={`capitalize ${tableDataClasses}`}
                                >
                                    {mockTestJob?.tutoringVariant}
                                </td>
                                <td className={tableDataClasses}>
                                    {mockTestJob?.educationVariant}
                                </td>
                                <td className={tableDataClasses}>
                                    {mockTestJob?.jobType}
                                </td>
                                <td className={tableDataClasses}>
                                    {mockTestJob?.institute}
                                </td> 
                                <td className={tableDataClasses}>
                                    {mockTestJob?.curriculum}
                                </td>
                               
                                <td className={tableDataClasses}>
                                    {mockTestJob?.salary}
                                </td>
                                <td className={tableDataClasses}>
                                    {mockTestJob?.preferredGender}
                                </td>
                               
                                <td className={tableDataClasses}>
                                    {mockTestJob?.studentGender}
                                </td>
                                <td className={`${tableDataClasses} text-left`}>
                                    <b className="flex flex-wrap gap-1 w-[450px]">
                                        {tutoringSubject(
                                            mockTestJob?.tutoringSubjects
                                        )}
                                    </b>
                                </td>
                                <td className={tableDataClasses}>
                                    {mockTestJob?.location}
                                </td>
                                <td className={tableDataClasses}>
                                    <select
                                        onChange={(e) =>
                                            handleStatusChange({
                                                phone: mockTestJob?.phone,
                                                jobId: mockTestJob?.jobId,
                                                jobType: mockTestJob?.jobType,
                                            })
                                        }
                                        className="rounded-lg bg-primary focus:outline-none p-2 text-white"
                                    >
                                        {mockTestJob?.mockTestStatus && (
                                            <option
                                                className="text-white"
                                                value={
                                                    mockTestJob?.mockTestStatus
                                                }
                                            >
                                                {mockTestJob?.mockTestStatus}
                                            </option>
                                        )}
                                        {jobBoardStatus
                                            ?.filter(
                                                (status) =>
                                                    status?.toLowerCase() !==
                                                    mockTestJob?.mockTestStatus?.toLowerCase()
                                            )
                                            ?.map((status, idx) => (
                                                <option
                                                    key={idx}
                                                    className="text-white"
                                                    value={status}
                                                >
                                                    {status}
                                                </option>
                                            ))}
                                    </select>
                                </td>
                                <td
                                    className={`${tableDataClasses} w-[120px] flex gap-3 border-b-0`}
                                >
                                    <Link className="text-center flex justify-center mx-auto">
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

export default MockTestJobBoard;
