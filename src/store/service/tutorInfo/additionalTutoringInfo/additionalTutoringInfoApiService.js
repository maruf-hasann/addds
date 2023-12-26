import { baseApi } from "../../../api/baseApi";

const additionalTutoringInfoApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    saveAdditionalTutoringInfo: build.mutation({
      query: (payload) => ({
        url: "tutor/additional-tutoring-info/save",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["AdditionalTutoringInfo"],
    }),
    getAdditionalTutoringInfo: build.query({
      query: (number) => ({
        url: `tutor/additional-tutoring-info/get/${number}`,
      }),
      providesTags: ["AdditionalTutoringInfo"],
    }),
    updateAdditionalTutoringInfo: build.mutation({
      query: (payload) => ({
        url: `tutor/additional-tutoring-info/update/${payload?.number}`,
        method: "PATCH",
        body: payload?.data,
      }),
      invalidatesTags: ["AdditionalTutoringInfo"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useSaveAdditionalTutoringInfoMutation,
  useGetAdditionalTutoringInfoQuery,
  useUpdateAdditionalTutoringInfoMutation,
  useLazyGetAdditionalTutoringInfoQuery,
} = additionalTutoringInfoApiService;
