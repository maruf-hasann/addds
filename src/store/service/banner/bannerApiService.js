import { baseApi } from "../../api/baseApi";


const bannerApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBanners: build.query({
      query: () => ({
        url: `/blogs/banners`,
      }),
      providesTags: ["Banner"],
    }),
    addBanner: build.mutation({
      query: (payload) => ({
        url: `blogs/banners`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Banner"],
    }),
    updateBanner: build.mutation({
      query: (payload) => ({
        url: `blogs/banners/${payload.id}`,
        method: "PATCH",
        body: payload?.formData,
      }),
      invalidatesTags: ["Banner"],
    }),
    deleteBanner: build.mutation({
      query: (id) => ({
        url: `blogs/banners/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banner"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllBannersQuery,
  useAddBannerMutation,
  useDeleteBannerMutation,
  useUpdateBannerMutation,
} = bannerApiService;
