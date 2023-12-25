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
} = jobBoardApiService;
