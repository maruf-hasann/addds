import { baseApi } from "../../api/baseApi";

const tutoringProgramApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTutoringPrograms: build.query({
      query: () => ({
        url: "tutoring-program/get-all",
      }),
      providesTags: ["TutoringProgram"],
    }),
    addTutoringProgram: build.mutation({
      query: (payload) => ({
        url: "tutoring-program/save",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["TutoringProgram"],
    }),
    deleteTutoringProgram: build.mutation({
      query: ({ name }) => ({
        url: `tutoring-program/delete/${name}`,
        method: "DELETE"
      }),
      invalidatesTags: ["TutoringProgram"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddTutoringProgramMutation,
  useGetTutoringProgramsQuery,
  useDeleteTutoringProgramMutation,
} = tutoringProgramApiService;
