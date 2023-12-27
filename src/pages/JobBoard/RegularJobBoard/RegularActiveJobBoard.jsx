import { FaStreetView } from "react-icons/fa6";
import { jobBoardStatus } from "../../../data/jobBoard";
import {
    useGetAllJobsByStatusQuery,
    useUpdateJobStatusMutation,
} from "../../../store/service/jobBoard/jobBoardApiService";
import tutoringSubject from "../../../libs/tutoringSubject";
import { useNavigate } from "react-router-dom";

const RegularActiveJobBoard = () => {
    const navigate = useNavigate();
    // redux api call
    const { data: regularActiveJobsData } = useGetAllJobsByStatusQuery({
        status: "active",
        jobType: "Regular",
    });
    const allRegularActiveJobs = regularActiveJobsData?.data;

    // update redux api for regular job
    const [updateJobStatus] = useUpdateJobStatusMutation();
    // handle change status
    const handleStatusChange = async (value) => {
        const updateData = {
            status: value?.status,
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
        "Book Id",
        "Tutoring Place",
        "Tutoring Category",
        "Tutoring Variant",
        "Education Variant",
        "Job Type",
        "Institute",
        "Curriculum",
        "Tutoring Days PerWeek",
        "Salary",
        "Preferred Gender",
        "Convenient Time",
        "Student Gender",
        "Tutoring Subjects",
        "Location",
        "Regular Status",
    ];
    // redirect to single job details
    const handleNavigateSingleJob = (value) => {
        if (value?.jobId && value?.jobType) {
            navigate("/regular-job-details", {
                state: { ...value, title: "Active" },
            });
        } else {
            toast.error("Please try again!");
        }
    };

    return (
        <div className="py-10 w-full">
            <div className="flex justify-between items-center border-b pb-3">
                <h1 className="font-bold mb-1 text-white text-2xl">
                    All Regular Active Jobs
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
                        {allRegularActiveJobs?.map((regularJob, idx) => (
                            <tr
                                className={tableDataClasses}
                                key={regularJob?.jobId}
                            >
                                <th className={tableDataClasses}>{idx + 1}</th>
                                <td className={tableDataClasses}>
                                    {regularJob?.bookId}
                                </td>
                                <td className={tableDataClasses}>
                                    {regularJob?.tutoringPlace}
                                </td>
                                <td className={tableDataClasses}>
                                    {regularJob?.tutoringCategory}
                                </td>
                                <td
                                    className={`capitalize ${tableDataClasses}`}
                                >
                                    {regularJob?.tutoringVariant}
                                </td>
                                <td className={tableDataClasses}>
                                    {regularJob?.tutoringEducationVariant}
                                </td>
                                <td className={tableDataClasses}>
                                    {regularJob?.jobType}
                                </td>
                                <td className={tableDataClasses}>
                                    {regularJob?.institute}
                                </td>
                                <td className={tableDataClasses}>
                                    {regularJob?.curriculum}
                                </td>
                                <td className={tableDataClasses}>
                                    {regularJob?.tutoringDaysPerWeek}
                                </td>
                                <td className={tableDataClasses}>
                                    {regularJob?.salary}
                                </td>
                                <td className={tableDataClasses}>
                                    {regularJob?.preferredGender}
                                </td>
                                <td className={tableDataClasses}>
                                    {regularJob?.convenientTime}
                                </td>
                                <td className={tableDataClasses}>
                                    {regularJob?.studentGender}
                                </td>
                                <td className={`${tableDataClasses} text-left`}>
                                    <b className="flex flex-wrap gap-1 w-[450px]">
                                        {tutoringSubject(
                                            regularJob?.tutoringSubjects
                                        )}
                                    </b>
                                </td>
                                <td className={tableDataClasses}>
                                    {regularJob?.location}
                                </td>
                                <td className={tableDataClasses}>
                                    <span className="bg-blue-100 text-blue-800 text-base font-medium me-2 px-2.5 py-1 rounded border border-blue-400">
                                        {regularJob?.regularStatus}
                                    </span>
                                </td>
                                <td
                                    className={`${tableDataClasses} flex gap-2 items-center justify-center`}
                                >
                                    {jobBoardStatus
                                        ?.filter(
                                            (status) =>
                                                status?.toLowerCase() !==
                                                regularJob?.regularStatus?.toLowerCase()
                                        )
                                        ?.map((status, idx) => (
                                            <span
                                                key={idx}
                                                onClick={() =>
                                                    handleStatusChange({
                                                        status: status,
                                                        jobId: regularJob?.jobId,
                                                        jobType:
                                                            regularJob?.jobType,
                                                    })
                                                }
                                                className={`bg-${
                                                    status?.toLowerCase() ==
                                                    "active"
                                                        ? "blue"
                                                        : status?.toLowerCase() ==
                                                          "inactive"
                                                        ? "red"
                                                        : "gray"
                                                }-100 text-${
                                                    status?.toLowerCase() ==
                                                    "active"
                                                        ? "blue"
                                                        : status?.toLowerCase() ==
                                                          "inactive"
                                                        ? "red"
                                                        : "gray"
                                                }-800 text-base font-medium me-2 px-2.5 py-[2px] rounded border border-${
                                                    status?.toLowerCase() ==
                                                    "active"
                                                        ? "blue"
                                                        : status?.toLowerCase() ==
                                                          "inactive"
                                                        ? "red"
                                                        : "gray"
                                                }-400 cursor-pointer`}
                                            >
                                                {status}
                                            </span>
                                        ))}
                                    <span
                                        onClick={() =>
                                            handleNavigateSingleJob({
                                                jobId: regularJob?.jobId,
                                                jobType: regularJob?.jobType,
                                            })
                                        }
                                        className="text-center flex justify-center mx-auto"
                                    >
                                        <FaStreetView
                                            title="View Profile"
                                            className="text-center mx-auto cursor-pointer hover:text-blue-500"
                                        />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RegularActiveJobBoard;
