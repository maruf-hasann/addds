import { baseApi } from "../../api/baseApi";

const personalInfoApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    savePersonalInfo: build.mutation({
      query: (payload) => ({
        url: "/personal-info/save",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["PersonalInfo"],
    }),
  }),
  overrideExisting: false,
});

export const { useSavePersonalInfoMutation } = personalInfoApiService;
