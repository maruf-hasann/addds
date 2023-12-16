import { baseApi } from "../../api/baseApi";

const tutorInfoFilterApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTutorInfoFilterData: build.query({
      query: (number) => ({
        url: `tutor/info-filter/all/${number}`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetTutorInfoFilterDataQuery, useGetTutorInfoFilterDataQuery } = tutorInfoFilterApiService;
