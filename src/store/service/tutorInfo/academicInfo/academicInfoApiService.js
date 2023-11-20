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
  }),
  overrideExisting: false,
});

export const { useSaveAcademicInfoMutation } = academicInfoInfoApiService;
