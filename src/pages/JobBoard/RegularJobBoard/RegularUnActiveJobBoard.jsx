import { FaStreetView } from "react-icons/fa6";
import {
    useGetAllJobsByStatusQuery,
    useUpdateJobStatusMutation,
} from "../../../store/service/jobBoard/jobBoardApiService";
import { jobBoardStatus } from "../../../data/jobBoard";
import tutoringSubject from "../../../libs/tutoringSubject";

const RegularUnActiveJobBoard = () => {
    // redux api call
    const { data: regularUnActiveJobsData } = useGetAllJobsByStatusQuery({
        status: "inactive",
        jobType: "Regular",
    });
    const allRegularUnActiveJobs = regularUnActiveJobsData?.data;

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

    return (
        <div className="py-10 w-full">
            <div className="flex justify-between items-center border-b pb-3">
                <h1 className="font-bold mb-1 text-white text-2xl">
                    All In-Active Regular Jobs
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
                        {allRegularUnActiveJobs?.map((regularJob, idx) => (
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
                                    {/* <select
                                        onChange={(e) =>
                                            handleStatusChange({
                                                status: e.target.value,
                                                jobId: regularJob?.jobId,
                                                jobType: regularJob?.jobType,
                                            })
                                        }
                                        className="rounded-lg bg-primary focus:outline-none p-2 text-white"
                                    >
                                        {regularJob?.regularStatus && (
                                            <option
                                                className="text-white py-6"
                                                value={
                                                    regularJob?.regularStatus
                                                }
                                            >
                                                {regularJob?.regularStatus}
                                            </option>
                                        )}
                                        {jobBoardStatus
                                            ?.filter(
                                                (status) =>
                                                    status?.toLowerCase() !==
                                                    regularJob?.regularStatus?.toLowerCase()
                                            )
                                            ?.map((status, idx) => (
                                                <option
                                                    key={idx}
                                                    className="text-white py-6"
                                                    value={status}
                                                >
                                                    {status}
                                                </option>
                                            ))}
                                    </select> */}
                                    <span className="bg-red-100 text-red-800 text-base font-medium me-2 px-2.5 py-1 rounded border border-red-400">
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
                                                }-800 text-base font-medium me-2 px-2.5 py-[1px] rounded border border-${
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
                                    <span className="text-center flex justify-center mx-auto">
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

export default RegularUnActiveJobBoard;
