import { baseApi } from "../../api/baseApi";


const blogVideoApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBlogVideo: build.query({
      query: () => ({
        url: `/blogs/videos?sortBy=views&sortOrder=desc`,
      }),
      providesTags: ["Video"],
    }),
    addVideo: build.mutation({
      query: (payload) => ({
        url: `blogs/videos`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Video"],
    }),
    deleteVideo: build.mutation({
      query: (id) => ({
        url: `blogs/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Video"],
    }),
    updateVideo: build.mutation({
      query: (payload) => ({
        url: `blogs/videos/${payload.id}`,
        method: "PATCH",
        body: payload?.videoData,
      }),
      invalidatesTags: ["Video"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetBlogVideoQuery,useAddVideoMutation ,useDeleteVideoMutation,useUpdateVideoMutation} =
  blogVideoApiService;
