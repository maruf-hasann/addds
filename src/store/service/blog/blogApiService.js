import { baseApi } from "../../api/baseApi";


const blogApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBlogs: build.query({
      query: () => ({
        url: `/blogs/blogs`,
      }),
      providesTags: ["Blog"],
    }),
    deleteBlog: build.mutation({
      query: (id) => ({
        url: `blogs/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllBlogsQuery,
  useDeleteBlogMutation
} = blogApiService;
