import { baseApi } from "../../api/baseApi";

const tutoringClassesApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getClasses: build.query({
      query: () => ({
        url: "tutoring-classes/get-classes",
      }),
      providesTags: ["TutoringClass"],
    }),
    getSubjectsByClass: build.query({
      query: (subject) => ({
        url: `tutoring-classes/class-wise-subjects/${subject}`,
      }),
      providesTags: ["TutoringClass"],
    }),
    addClass: build.mutation({
      query: (payload) => ({
        url: "tutoring-classes/add-class",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["TutoringClass"],
    }),
    deleteClass: build.mutation({
      query: (payload) => ({
        url: `tutoring-classes/delete-class/${payload.class}/${payload.subject}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TutoringClass"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddClassMutation,
  useDeleteClassMutation,
  useGetClassesQuery,
  useGetSubjectsByClassQuery
} = tutoringClassesApiService;
