import { baseApi } from "../../api/baseApi";

const tutoringClassHCApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTutoringClassHC: build.query({
      query: () => ({
        url: "tutoring-class-hc/all",
      }),
      providesTags: ["TutoringClassHC"],
    }),
    addTutoringClassHC: build.mutation({
      query: (payload) => ({
        url: "tutoring-class-hc/save",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["TutoringClassHC"],
    }),
    deleteTutoringClassHC: build.mutation({
      query: (id) => ({
        url: `tutoring-class-hc/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TutoringClassHC"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTutoringClassHCQuery,
  useAddTutoringClassHCMutation,
  useDeleteTutoringClassHCMutation,
} = tutoringClassHCApiService;
