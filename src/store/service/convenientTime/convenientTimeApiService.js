import { baseApi } from "../../api/baseApi";


const convenientTimeService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getConvenient: build.query({
      query: () => ({
        url: `/convenient-time/all`,
      }),
      providesTags: ["convenient"],
    }),
  }),
});

export const { useGetConvenientQuery } = convenientTimeService;
