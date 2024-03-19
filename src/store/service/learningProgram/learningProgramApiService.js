import { baseApi } from "../../api/baseApi";

;

const learningProgramApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProgram: build.query({
      query: () => ({
        url: `/learning-program/fetch`,
      }),
      providesTags: ["Program"],
    }),
    addLearningProgram: build.mutation({
      query: (payload) => ({
        url: `learning-program/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Program"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllProgramQuery,
 useAddLearningProgramMutation
} = learningProgramApiService;
