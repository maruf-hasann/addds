import { baseApi } from "../../api/baseApi";

const currentAffairApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCurrentAffairs: build.query({
      query: () => ({
        url: "current-affairs/all",
      }),
      providesTags: ["CurrentAffair"],
    }),
    addCurrentAffair: build.mutation({
      query: (payload) => ({
        url: "current-affairs/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["CurrentAffair"],
    }),
    deleteCurrentAffair: build.mutation({
      query: (id) => ({
        url: `current-affairs/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CurrentAffair"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddCurrentAffairMutation,
  useDeleteCurrentAffairMutation,
  useGetCurrentAffairsQuery,
} = currentAffairApiService;
