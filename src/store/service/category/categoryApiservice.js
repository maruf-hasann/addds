import { baseApi } from "../../api/baseApi";

const categoryApiservice = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCategory: build.query({
      query: () => ({
        url: `/blogs/categories`,
      }),
      providesTags: ["Category"],
    }),
    addCategory: build.mutation({
      query: (payload) => ({
        url: `blogs/categories`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: build.mutation({
      query: (payload) => ({
        url: `blogs/categories/${payload.id}`,
        method: "PATCH",
        body: payload?.formData,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `blogs/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllCategoryQuery, useDeleteCategoryMutation ,useAddCategoryMutation,useUpdateCategoryMutation} =
  categoryApiservice;
