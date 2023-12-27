import { baseApi } from "../../api/baseApi";

const jobBoardApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllRegularJobs: build.query({
            query: () => ({
                url: "job-portal/urgent-requirement/regular",
            }),
            providesTags: ["JobBoards"],
        }),
        getAllMockTestJobs: build.query({
            query: () => ({
                url: "job-portal/urgent-requirement/mock-test",
            }),
            providesTags: ["JobBoards"],
        }),
        getAllJobsByStatus: build.query({
            query: ({ status, jobType }) => ({
                url: `job-portal/list-of-jobs/${status}/${jobType}`,
            }),
            providesTags: ["JobBoards"],
        }),
        getSingleJob: build.query({
            query: ({ jobId, jobType }) => ({
                url: `job-portal/info?jobId=${jobId}&jobType=${jobType}`,
            }),
            providesTags: ["JobBoards"],
        }),
        getSingleJobUserInfo: build.query({
            query: ({ jobId, jobType }) => ({
                url: `job-portal/user-info?jobId=${jobId}&jobType=${jobType}`,
            }),
            providesTags: ["JobBoards"],
        }),
        updateJobStatus: build.mutation({
            query: (payload) => ({
                url: "job-portal/update/status",
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: ["JobBoards"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetAllMockTestJobsQuery,
    useGetAllRegularJobsQuery,
    useUpdateJobStatusMutation,
    useGetAllJobsByStatusQuery,
    useLazyGetSingleJobQuery,
    useLazyGetSingleJobUserInfoQuery
} = jobBoardApiService;
