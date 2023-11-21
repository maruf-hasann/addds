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
  }),
  overrideExisting: false,
});

export const {
  useSaveTutoringInfoMutation,
} = tutoringInfoApiService;
