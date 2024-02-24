import { baseApi } from "../../api/baseApi";

const subCategoryApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllSubCategory: build.query({
      query: () => ({
        url: `/blogs/sub-categories`,
      }),
      providesTags: ["SubCategory"],
    }),
    addSubCategory: build.mutation({
      query: (payload) => ({
        url: `blogs/sub-categories`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["SubCategory"],
    }),
    updateSubCategory: build.mutation({
      query: (payload) => ({
        url: `blogs/sub-categories/${payload.id}`,
        method: "PATCH",
        body: payload?.formData,
      }),
      invalidatesTags: ["SubCategory"],
    }),
    deleteSubCategory: build.mutation({
      query: (id) => ({
        url: `blogs/sub-categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubCategory"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllSubCategoryQuery,
  useDeleteSubCategoryMutation,
  useAddSubCategoryMutation,
  useUpdateSubCategoryMutation,
} = subCategoryApiService;
