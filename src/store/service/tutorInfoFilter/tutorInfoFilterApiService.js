import { baseApi } from "../../api/baseApi";

const tutorInfoFilterApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTutorInfoFilterData: build.query({
      query: (number) => ({
        url: `tutor/info-filter/all/${number}`,
      }),
    }),
    getListOfTutorWithAcademicInfo: build.query({
      query: () => ({
        url: `tutor/info-filter/list-of-tutor-with-academic-info`,
      }),
    }),
    getListOfTutorWithTutoringInfo: build.query({
      query: () => ({
        url: `/tutor/info-filter/list-of-tutor-with-tutoring-info`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLazyGetTutorInfoFilterDataQuery,
  useGetTutorInfoFilterDataQuery,
  useGetListOfTutorWithAcademicInfoQuery,
  useGetListOfTutorWithTutoringInfoQuery,
} = tutorInfoFilterApiService;
