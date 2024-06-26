import { baseApi } from "../../api/baseApi";


const blogApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBlogs: build.query({
      query: () => ({
        url: `/blogs/blogs`,
      }),
      providesTags: ["Blog"],
    }),
    getTutorBlogs: build.query({
      query: (payload) => ({
        url: `/blogs/blogs?phoneNumber=${payload}`,
      }),
      providesTags: ["Blog"],
    }),
    addBlog: build.mutation({
      query: (payload) => ({
        url: `blogs/blogs`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Blog"],
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
  useGetTutorBlogsQuery,
  useDeleteBlogMutation,
  useAddBlogMutation
} = blogApiService;
