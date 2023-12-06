import { baseApi } from "../../api/baseApi";

const tutoringLocationApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    saveTutoringLocation: build.mutation({
      query: (payload) => ({
        url: "tutoring-location/save",
        body: payload,
        method: "POST",
      }),
      invalidatesTags: ["TutoringLocation"],
    }),
    updateTutoringLocationById: build.mutation({
      query: (payload) => ({
        url: `tutoring-location/update/${payload.id}`,
        body: payload?.data,
        method: "PATCH",
      }),
      invalidatesTags: ["TutoringLocation"],
    }),
    deleteTutoringLocationById: build.mutation({
      query: (id) => ({
        url: `tutoring-location/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TutoringLocation"],
    }),
    getAllTutoringLocation: build.query({
      query: () => ({
        url: "tutoring-location/all",
      }),
      providesTags: ["TutoringLocation"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllTutoringLocationQuery,
  useDeleteTutoringLocationByIdMutation,
  useSaveTutoringLocationMutation,
  useUpdateTutoringLocationByIdMutation,
} = tutoringLocationApiService;
