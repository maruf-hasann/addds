import { baseApi } from "../../api/baseApi";

const schoolPMApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSchoolPM: build.query({
      query: () => ({
        url: "school-pm/all",
      }),
      providesTags: ["SchoolPM"],
    }),
    addSchoolPM: build.mutation({
      query: (payload) => ({
        url: "school-pm/save",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["SchoolPM"],
    }),
    deleteSchoolPM: build.mutation({
      query: (id) => ({
        url: `school-pm/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SchoolPM"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddSchoolPMMutation,
  useDeleteSchoolPMMutation,
  useGetSchoolPMQuery,
} = schoolPMApiService;
