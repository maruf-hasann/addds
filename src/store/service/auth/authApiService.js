import { baseApi } from "../../api/baseApi";

const authApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (payload) => ({
        url: "auth/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
  overrideExisting: false,
});

export const { useLoginUserMutation } = authApiService;
