import { baseApi } from "../../../../api/baseApi";

const coachingScheduleApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCoachingSchedule: build.mutation({
      query: (payload) => ({
        url: "coaching-schedule/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["CoachingSchedule"],
    }),
    getWeeklyCoachingScheduleByCoachingId: build.query({
      query: (coachingId) => ({
        url: `coaching-schedule/weekly/coaching/${coachingId}`,
      }),
      providesTags: ["CoachingSchedule"],
    }),
    getWeeklyCoachingScheduleByUser: build.query({
      query: (number) => ({
        url: `/coaching-schedule/weekly/user/${number}`,
      }),
      providesTags: ["CoachingSchedule"],
    }),
  }),
});

export const {
  useCreateCoachingScheduleMutation,
  useGetWeeklyCoachingScheduleByCoachingIdQuery,
  useGetWeeklyCoachingScheduleByUserQuery,
} = coachingScheduleApiService;
