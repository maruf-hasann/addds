import { baseApi } from "../../api/baseApi";

const extraSubjectApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getExtraSubjects: build.query({
      query: () => ({
        url: "extra-subjects/get-subjects",
      }),
      providesTags: ["ExtraSubject"],
    }),
    addExtraSubject: build.mutation({
      query: (payload) => ({
        url: "extra-subjects/add-subject",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["ExtraSubject"],
    }),
    deleteExtraSubject: build.mutation({
      query: ({ id }) => ({
        url: `extra-subjects/delete-subject/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ExtraSubject"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddExtraSubjectMutation,
  useDeleteExtraSubjectMutation,
  useGetExtraSubjectsQuery,
} = extraSubjectApiService;
