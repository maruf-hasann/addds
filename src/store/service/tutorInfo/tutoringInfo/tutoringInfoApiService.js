import { baseApi } from "../../../api/baseApi";

const tutoringInfoApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    saveTutoringInfo: build.mutation({
      query: (payload) => ({
        url: "tutor/tutoring-info/save",
        method: "POST",
        body: payload,
      }),
      providesTags: ["TutoringInfo"],
    }),
    updateTutoringInfo: build.mutation({
      query: (payload) => ({
        url: `tutor/tutoring-info/update/${payload?.number}`,
        method: "PATCH",
        body: payload?.data,
      }),
      providesTags: ["TutoringInfo"],
    }),
    getTutoringInfo: build.query({
      query: (number) => ({
        url: `tutor/tutoring-info/user-info/${number}`,
      }),
      invalidatesTags: ["TutoringInfo"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useSaveTutoringInfoMutation,
  useGetTutoringInfoQuery,
  useLazyGetTutoringInfoQuery,
  useUpdateTutoringInfoMutation,
} = tutoringInfoApiService;
