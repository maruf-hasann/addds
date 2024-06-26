import { baseApi } from "../../../api/baseApi";

const academicInfoInfoApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    saveAcademicInfo: build.mutation({
      query: (payload) => ({
        url: "tutor/academic-info/save",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["AcademicInfo"],
    }),
    getAcademicInfo: build.query({
      query: (number) => ({
        url: `tutor/academic-info/get/${number}`,
      }),
      providesTags: ["AcademicInfo"],
    }),
    updateAcademicInfo: build.mutation({
      query: (payload) => ({
        url: `/tutor/academic-info/update/${payload?.number}`,
        method: "PATCH",
        body: payload?.data,
      }),
      invalidatesTags: ["AcademicInfo"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useSaveAcademicInfoMutation,
  useGetAcademicInfoQuery,
  useLazyGetAcademicInfoQuery,
  useUpdateAcademicInfoMutation,
} = academicInfoInfoApiService;
