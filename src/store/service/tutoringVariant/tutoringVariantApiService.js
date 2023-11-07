import { baseApi } from "../../api/baseApi";

const tutoringVariantApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTutoringVariants: build.query({
      query: () => ({
        url: "tutoring-variant/get",
      }),
      providesTags: ["TutoringVariant"],
    }),
    addTutoringVariant: build.mutation({
      query: (payload) => ({
        url: "tutoring-variant/add",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["TutoringVariant"],
    }),
    deleteTutoringVariant: build.mutation({
      query: ({ name }) => ({
        url: `tutoring-variant/delete/${name}`,
        method: "DELETE"
      }),
      invalidatesTags: ["TutoringVariant"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddTutoringVariantMutation,
  useGetTutoringVariantsQuery,
  useDeleteTutoringVariantMutation,
} = tutoringVariantApiService;
