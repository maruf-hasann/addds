import { FaStreetView } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";

import {
    useGetAllJobsByStatusQuery,
    useUpdateJobStatusMutation,
} from "../../../store/service/jobBoard/jobBoardApiService";
import { jobBoardStatus } from "../../../data/jobBoard";
import DataTable from "../../../components/Shared/DataTable/DataTable";
import { transformSubjectArray } from "../../../libs/TutorProfile/transformSubjectArray";

const RegularHiredJobBoard = () => {
    // redux api call
    const { data: regularHiredJobsData, isLoading } =
        useGetAllJobsByStatusQuery({
            status: "hired",
            jobType: "Regular",
        });
    const allRegularHiredJobs = regularHiredJobsData?.data;

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

    return (
        <div className="py-10 w-full">
            <div className="flex justify-between items-center pb-3">
                <h1 className="font-bold mb-1 text-white text-2xl">
                    All Hired Regular Jobs
                </h1>
            </div>
            <DataTable
                isLoading={isLoading}
                error={false}
                tableData={allRegularHiredJobs}
                handleSelectedRowItem={(data) => console.log(data)}
                columns={[
                    { name: "Book Id", dataIndex: "bookId", key: "_id" },
                    {
                        name: "Tutoring Place",
                        dataIndex: "tutoringPlace",
                        key: "_id",
                    },
                    {
                        name: "Tutoring Category",
                        dataIndex: "tutoringCategory",
                        key: "_id",
                    },
                    {
                        name: "Tutoring Variant",
                        dataIndex: "tutoringVariant",
                        key: "_id",
                    },
                    {
                        name: "Education Variant",
                        dataIndex: "tutoringEducationVariant",
                        key: "_id",
                    },
                    { name: "Job Type", dataIndex: "jobType", key: "_id" },
                    { name: "Institute", dataIndex: "institute", key: "_id" },
                    { name: "Curriculum", dataIndex: "curriculum", key: "_id" },
                    {
                        name: "Tutoring Days PerWeek",
                        dataIndex: "tutoringDaysPerWeek",
                        key: "_id",
                    },
                    { name: "Salary", dataIndex: "salary", key: "_id" },
                    {
                        name: "Preferred Gender",
                        dataIndex: "preferredGender",
                        key: "_id",
                    },
                    {
                        name: "Convenient Time",
                        dataIndex: "convenientTime",
                        key: "_id",
                    },
                    {
                        name: "Student Gender",
                        dataIndex: "studentGender",
                        key: "_id",
                    },
                    {
                        name: "Tutoring Subjects",
                        render: ({ item }) => (
                            <>
                                {item?.tutoringSubjects?.length
                                    ? transformSubjectArray(
                                          item?.tutoringSubjects
                                      )?.map((subject, idx) => (
                                          <>
                                              <span key={idx}>
                                                  {subject.subSubjects?.length
                                                      ? `${
                                                            subject.mainSubject
                                                        }(${subject?.subSubjects?.map(
                                                            (subSub) => subSub
                                                        )})`
                                                      : subject?.mainSubject}
                                              </span>
                                              <br></br>
                                          </>
                                      ))
                                    : "N/A"}
                            </>
                        ),
                    },
                    { name: "Location", dataIndex: "location", key: "_id" },
                    {
                        name: "Regular Status",
                        render: ({ item }) => (
                            <Button
                                color="green"
                                size="md"
                                className="px-3.5 py-2.5 bg-green-400 shadow-lg"
                            >
                                <span className="text-center text-[13px]">
                                    {item?.regularStatus}
                                </span>
                            </Button>
                        ),
                    },
                    {
                        name: "Actions",
                        render: ({ item }) => (
                            <div className="flex gap-2 items-center justify-center">
                                {jobBoardStatus
                                    ?.filter(
                                        (status) =>
                                            status?.toLowerCase() !==
                                            item?.regularStatus?.toLowerCase()
                                    )
                                    ?.map((status, idx) => (
                                        <Button
                                            key={idx}
                                            onClick={() =>
                                                handleStatusChange({
                                                    status: status,
                                                    jobId: item?.jobId,
                                                    jobType: item?.jobType,
                                                })
                                            }
                                            color={`${
                                                status?.toLowerCase() ==
                                                "active"
                                                    ? "blue"
                                                    : status?.toLowerCase() ==
                                                      "inactive"
                                                    ? "red"
                                                    : "green"
                                            }`}
                                            className={`px-3.5 py-[7px] shadow-lg text-base font-medium me-2  rounded-lg  cursor-pointer capitalize`}
                                        >
                                            {status}
                                        </Button>
                                    ))}
                                <Link
                                    to={`/regular-job-details/${item?.jobType}/${item?.jobId}`}
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

export default RegularHiredJobBoard;
