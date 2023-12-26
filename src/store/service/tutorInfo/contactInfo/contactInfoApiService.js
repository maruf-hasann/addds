import { baseApi } from "../../../api/baseApi";

const contactInfoApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    saveContactInfo: build.mutation({
      query: (payload) => ({
        url: "tutor/contact-info/save",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["ContactInfo"],
    }),
    getTutorContactInfo: build.query({
      query: (number) => ({
        url: `tutor/contact-info/get/${number}`,
      }),
      providesTags: ["ContactInfo"],
    }),
    updateTutorContactInfo: build.mutation({
      query: (payload) => ({
        url: `/tutor/contact-info/update/${payload?.number}`,
        method: "PATCH",
        body: payload?.data,
      }),
      invalidatesTags: ["ContactInfo"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useSaveContactInfoMutation,
  useGetTutorContactInfoQuery,
  useLazyGetTutorContactInfoQuery,
  useUpdateTutorContactInfoMutation,
} = contactInfoApiService;
