import { baseApi } from "../../api/baseApi";

const tutoringPlaceApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTutoringPlaces: build.query({
      query: () => ({
        url: "tutoring-place/all",
      }),
      providesTags: ["TutoringPlace"],
    }),
    addTutoringPlace: build.mutation({
      query: (payload) => ({
        url: "tutoring-place/save",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["TutoringPlace"],
    }),
    deleteTutoringPlace: build.mutation({
      query: ({ name }) => ({
        url: `tutoring-place/delete/${name}`,
        method: "DELETE"
      }),
      invalidatesTags: ["TutoringPlace"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddTutoringPlaceMutation,
  useGetTutoringPlacesQuery,
  useDeleteTutoringPlaceMutation,
} = tutoringPlaceApiService;
