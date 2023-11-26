import { baseApi } from "../../api/baseApi";

const curriculumBoardApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCurriculumBoards: build.query({
      query: () => ({
        url: "curriculum-board/all",
      }),
      providesTags: ["CurriculumBoard"],
    }),
    addCurriculumBoard: build.mutation({
      query: (payload) => ({
        url: "curriculum-board/save",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["CurriculumBoard"],
    }),
    deleteCurriculumBoard: build.mutation({
      query: (id) => ({
        url: `curriculum-board/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CurriculumBoard"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddCurriculumBoardMutation,
  useDeleteCurriculumBoardMutation,
  useGetCurriculumBoardsQuery,
} = curriculumBoardApiService;
