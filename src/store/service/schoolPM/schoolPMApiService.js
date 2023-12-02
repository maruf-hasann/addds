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
    editSchoolPM: build.mutation({
      query: (payload) => ({
        url: `school-pm/update/${payload?.id}`,
        method: "PATCH",
        body: payload?.data,
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
  useEditSchoolPMMutation
} = schoolPMApiService;
