import { baseApi } from "../../api/baseApi";

const tutorConvenientTimeApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTutorConvenientTime: build.query({
      query: () => ({
        url: "/convenient-time/all",
      }),
      providesTags: ["ConvenientTime"],
    }),
    addTutorConvenientTime: build.mutation({
      query: (payload) => ({
        url: `/convenient-time/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["ConvenientTime"],
    }),
    updateTutorConvenientTime: build.mutation({
      query: (payload) => ({
        url: `convenient-time/update/${payload.id}`,
        method: "PATCH",
        body: payload?.submitData,
      }),
      invalidatesTags: ["ConvenientTime"],
    }),
    deleteTutorConvenientTime: build.mutation({
      query: (id) => ({
        url: `convenient-time/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ConvenientTime"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTutorConvenientTimeQuery,
  useAddTutorConvenientTimeMutation,
  useDeleteTutorConvenientTimeMutation,
  useUpdateTutorConvenientTimeMutation,
} = tutorConvenientTimeApiService;
