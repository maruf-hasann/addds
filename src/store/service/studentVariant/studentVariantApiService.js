import { baseApi } from "../../api/baseApi";

const studentVariantApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStudentVariants: build.query({
      query: () => ({
        url: "student-variant/all",
      }),
      providesTags: ["StudentVariant"],
    }),
    addStudentVariant: build.mutation({
      query: (payload) => ({
        url: "student-variant/save",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["StudentVariant"],
    }),
    deleteStudentVariant: build.mutation({
      query: ({ name }) => ({
        url: `student-variant/delete/${name}`,
        method: "DELETE"
      }),
      invalidatesTags: ["StudentVariant"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddStudentVariantMutation,
  useGetStudentVariantsQuery,
  useDeleteStudentVariantMutation,
} = studentVariantApiService;
