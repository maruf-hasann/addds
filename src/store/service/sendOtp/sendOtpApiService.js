import { baseApi } from "../../api/baseApi";

const sendOtpApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sendOtp: build.query({
      query: ({ number }) => ({
        url: `/schooling-otp/send/${number}`,
      }),
      invalidatesTags: ["SendOtp"],
    }),
  }),
  overrideExisting: false,
});

export const { useSendOtpQuery, useLazySendOtpQuery } = sendOtpApiService;
