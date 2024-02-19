import { baseApi } from "../../../api/baseApi";

const mediaGalleryApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTutorMediaGallery: build.query({
      query: (number) => ({
        url: `tutor/media-gallery/user/${number}`,
      }),
      providesTags: ["MediaGallery"],
    }),
    changeCoachingVideoUrl: build.mutation({
      query: (payload) => ({
        url: `/coaching-media/change-video-url`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["MediaGallery"],
    }),
    changePromoVideoUrl: build.mutation({
      query: (payload) => ({
        url: `tutor/promo-info/change-video-url`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["MediaGallery"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTutorMediaGalleryQuery,
  useChangeCoachingVideoUrlMutation,
  useChangePromoVideoUrlMutation,
} = mediaGalleryApiService;
