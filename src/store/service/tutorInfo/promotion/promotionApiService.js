import { baseApi } from "../../../api/baseApi";

const promotionApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    uploadPromotionInfo: build.mutation({
      query: (payload) => ({
        url: "/tutor/promo-info/save-info",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["PromoVideo"],
    }),
    deletePromotionInfoObject: build.mutation({
      query: (payload) => ({
        url: `tutor/promo-info/delete-object`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["PromoVideo"],
    }),
    uploadSingleImage: build.mutation({
      query: (payload) => ({
        url: `tutor/promo-info/upload-single-image/${payload?.number}`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ["PromoVideo"],
    }),
    uploadSingleVideo: build.mutation({
      query: (payload) => ({
        url: `tutor/promo-info/upload-single-video/${payload?.number}`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ["PromoVideo"],
    }),
    getPromotionInfo: build.query({
      query: (number) => ({
        url: `tutor/promo-info/user/${number}`,
      }),
      providesTags: ["PromoVideo"],
    }),
    uploadPromoVideo: build.mutation({
      query: (payload) => ({
          url: "/tutor/promo-info/save-info",
          method: "POST",
          body: payload,
      }),
      invalidatesTags: ["PromoVideo"],
  }),
  }),
  overrideExisting: false,
});

export const {
  useDeletePromotionInfoObjectMutation,
  useGetPromotionInfoQuery,
  useLazyGetPromotionInfoQuery,
  useUploadPromotionInfoMutation,
  useUploadSingleImageMutation,
  useUploadSingleVideoMutation,
  useUploadPromoVideoMutation
} = promotionApiService;
