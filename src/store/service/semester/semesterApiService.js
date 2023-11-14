import { baseApi } from "../../api/baseApi";

const semesterApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSemesters: build.query({
      query: () => ({
        url: "semester/all",
      }),
      providesTags: ["Semester"],
    }),
    addSemester: build.mutation({
      query: (payload) => ({
        url: "semester/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Semester"],
    }),
    deleteSemester: build.mutation({
      query: (id) => ({
        url: `semester/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Semester"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddSemesterMutation,
  useDeleteSemesterMutation,
  useGetSemestersQuery,
} = semesterApiService;
