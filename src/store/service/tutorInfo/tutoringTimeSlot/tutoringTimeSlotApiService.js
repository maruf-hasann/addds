import { baseApi } from "../../../api/baseApi";

const tutoringTimeSlotApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserTimeSlot: build.query({
      query: (number) => ({
        url: `tutoring-time-slot/fetch/${number}`,
      }),
      providesTags: ["TutoringTimeSlot"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserTimeSlotQuery, useLazyGetUserTimeSlotQuery } =
  tutoringTimeSlotApiService;
