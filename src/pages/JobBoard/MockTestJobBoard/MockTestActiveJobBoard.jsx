import { FaStreetView } from "react-icons/fa6";
import { jobBoardStatus } from "../../../data/jobBoard";
import {
  useGetAllJobsByStatusQuery,
  useUpdateJobStatusMutation,
} from "../../../store/service/jobBoard/jobBoardApiService";
import tutoringSubject from "../../../libs/tutoringSubject";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DataTable from "../../../components/Shared/DataTable/DataTable";

const MockTestActiveJobBoard = () => {
  const navigate = useNavigate();
  // redux api call
  const { data: mockTestActiveJobsData, isLoading } =
    useGetAllJobsByStatusQuery({
      status: "active",
      jobType: "Mock",
    });
  const allMockTestActiveJobs = mockTestActiveJobsData?.data;

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

  // redirect to single job details
  const handleNavigateSingleJob = (value) => {
    if (value?.jobId && value?.jobType) {
      navigate("/mock-test-job-details", {
        state: { ...value, title: "Active" },
      });
    } else {
      toast.error("Please try again!");
    }
  };

  return (
    <div className="py-10 w-full">
      <div className="flex justify-between items-center pb-3">
        <h1 className="font-bold mb-1 text-white text-2xl">
          All Active Mock Test Jobs
        </h1>
      </div>
      <DataTable
        isLoading={isLoading}
        error={false}
        tableData={allMockTestActiveJobs}
        handleSelectedRowItem={(data) => console.log(data)}
        columns={[
          { name: "Mock Job Id", dataIndex: "mockJobId", key: "_id" },
          { name: "Tutoring Place", dataIndex: "tutoringPlace", key: "_id" },
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
            dataIndex: "educationVariant",
            key: "_id",
          },
          { name: "Job Type", dataIndex: "jobType", key: "_id" },
          { name: "Institute", dataIndex: "institute", key: "_id" },
          { name: "Curriculum", dataIndex: "curriculum", key: "_id" },

          { name: "Salary", dataIndex: "salary", key: "_id" },
          {
            name: "Preferred Gender",
            dataIndex: "preferredGender",
            key: "_id",
          },
          { name: "Student Gender", dataIndex: "studentGender", key: "_id" },

          {
            name: "Tutoring Subjects",
            render: ({ item }) => (
              <b className="flex flex-wrap gap-1 w-[450px]">
                {tutoringSubject(item?.tutoringSubjects)}
              </b>
            ),
          },
          { name: "Location", dataIndex: "location", key: "_id" },
          {
            name: "Mock Test Status",
            render: ({ item }) => (
              <span className="bg-blue-100 text-blue-800 text-base font-medium me-2 px-2.5 py-1 rounded border border-blue-400">
                {item?.mockTestStatus}
              </span>
            ),
          },
          {
            name: "Actions",
            render: ({ item }) => (
              <div className={`flex gap-2 items-center justify-center`}>
                {jobBoardStatus
                  ?.filter(
                    (status) =>
                      status?.toLowerCase() !==
                      item?.mockTestStatus?.toLowerCase()
                  )
                  ?.map((status, idx) => (
                    <span
                      key={idx}
                      onClick={() =>
                        handleStatusChange({
                          status: status,
                          jobId: item?.jobId,
                          jobType: item?.jobType,
                        })
                      }
                      className={`bg-${
                        status?.toLowerCase() == "active"
                          ? "blue"
                          : status?.toLowerCase() == "inactive"
                          ? "red"
                          : "gray"
                      }-100 text-${
                        status?.toLowerCase() == "active"
                          ? "blue"
                          : status?.toLowerCase() == "inactive"
                          ? "red"
                          : "gray"
                      }-800 text-base font-medium me-2 px-2.5 py-[2px] rounded border border-${
                        status?.toLowerCase() == "active"
                          ? "blue"
                          : status?.toLowerCase() == "inactive"
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
                      jobId: item?.jobId,
                      jobType: item?.jobType,
                    })
                  }
                  className="text-center flex justify-center mx-auto"
                >
                  <FaStreetView
                    title="View Profile"
                    className="text-center mx-auto cursor-pointer hover:text-blue-500"
                  />
                </span>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default MockTestActiveJobBoard;