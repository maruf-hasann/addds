import { baseApi } from "../../../api/baseApi";

const coachingApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCoachingByUser: build.query({
      query: (number) => ({
        url: `/coaching/fetch?phoneNumber=${number}`,
      }),
      providesTags: ["Coaching"],
    }),
    updateCoaching: build.mutation({
      query: (payload) => ({
        url: `/coaching/update?coachingId=${payload?.id}`,
        method: "PATCH",
        body: payload?.data,
      }),
      invalidatesTags: ["Coaching"],
    }),
    deleteCoaching: build.mutation({
      query: (id) => ({
        url: `/coaching/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coaching"],
    }),
    uploadCoachingMedia: build.mutation({
      query: (payload) => ({
        url: `/coaching/uploader`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Coaching"],
    }),
    deleteCoachingMedia: build.mutation({
      query: (payload) => ({
        url: `/coaching/file-remover`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Coaching"],
    }),
    uploadCoachingSingleVideo: build.mutation({
      query: (payload) => ({
        url: `coaching-media/upload-single-video/${payload?.number}`,
        method: "PATCH",
        body: payload?.data,
      }),
      invalidatesTags: ["Coaching"],
    }),
    uploadCoachingSingleImage: build.mutation({
      query: (payload) => ({
        url: `coaching-media/upload-single-image/${payload?.number}`,
        method: "PATCH",
        body: payload?.data,
      }),
      invalidatesTags: ["Coaching"],
    }),
    getCoachingMediaById: build.query({
      query: (id) => ({
        url: `coaching-media/${id}`,
      }),
      providesTags: ["Coaching"],
    }),
  }),
});

export const {
  useGetCoachingByUserQuery,
  useLazyGetCoachingByUserQuery,
  useUpdateCoachingMutation,
  useDeleteCoachingMutation,
  useUploadCoachingMediaMutation,
  useDeleteCoachingMediaMutation,
  useUploadCoachingSingleImageMutation,
  useUploadCoachingSingleVideoMutation,
  useGetCoachingMediaByIdQuery
} = coachingApiService;
