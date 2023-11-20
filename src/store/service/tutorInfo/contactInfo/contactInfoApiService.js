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
  }),
  overrideExisting: false,
});

export const {
  useSaveContactInfoMutation
} = contactInfoApiService;
