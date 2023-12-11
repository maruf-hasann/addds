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
    getPersonalInfo: build.query({
      query: () => ({
        url: `personal-info/8801708666342`,
      }),
      invalidatesTags: ["PersonalInfo"],
    }),
  }),
  overrideExisting: false,
});

export const { useSavePersonalInfoMutation, useGetPersonalInfoQuery } =
  personalInfoApiService;
