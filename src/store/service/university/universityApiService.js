import { baseApi } from "../../api/baseApi";

const universityApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUniversities: build.query({
      query: () => ({
        url: "university/get-all",
      }),
      providesTags: ["university"],
    }),
    addUniversity: build.mutation({
      query: (payload) => ({
        url: "university/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["university"],
    }),
    deleteUniversity: build.mutation({
      query: (id) => ({
        url: `university/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["university"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddUniversityMutation,
  useDeleteUniversityMutation,
  useGetUniversitiesQuery,
} = universityApiService;
