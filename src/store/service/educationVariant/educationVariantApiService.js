import { baseApi } from "../../api/baseApi";

const educationVariantApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getEducationVariants: build.query({
      query: () => ({
        url: "education-variant/get-all",
      }),
      providesTags: ["EducationVariant"],
    }),
    addEducationVariant: build.mutation({
      query: (payload) => ({
        url: "education-variant/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["EducationVariant"],
    }),
    deleteEducationVariant: build.mutation({
      query: ({ name }) => ({
        url: `education-variant/delete?variantName=${name}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EducationVariant"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddEducationVariantMutation,
  useDeleteEducationVariantMutation,
  useGetEducationVariantsQuery,
} = educationVariantApiService;
