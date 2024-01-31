import { baseApi } from "../../api/baseApi";

const mediaLibraryApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllMedia: build.query({
      query: (type) => ({
        url: "media-library/all-media",
        method: "GET",
        params: { type: type },
      }),
      providesTags: ["MediaLibrary"],
    }),
    uploadMedia: build.mutation({
      query: (payload) => ({
        url: "media-library/insert",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["MediaLibrary"],
    }),
    deleteMedia: build.mutation({
      query: (id) => ({
        url: `media-library/media/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MediaLibrary"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllMediaQuery,
  useUploadMediaMutation,
  useDeleteMediaMutation,
} = mediaLibraryApiService;
