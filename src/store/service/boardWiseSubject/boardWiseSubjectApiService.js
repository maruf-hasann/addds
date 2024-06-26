import { baseApi } from "../../api/baseApi";

const boardWiseSubjectApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSubjects: build.query({
      query: () => ({
        url: "board-wise-subjects/all",
      }),
      providesTags: ["BoardSubject"],
    }),
    addBoardAndSubject: build.mutation({
      query: (payload) => ({
        url: "board-wise-subjects/add-board-and-subject",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["BoardSubject"],
    }),
    deleteSubject: build.mutation({
      query: ({ id }) => ({
        url: `board-wise-subjects/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BoardSubject"],
    }),

    getAllOLevelSubjects: build.query({
      query: () => ({
        url: "board-wise-subjects/type/o-level",
      }),
      invalidatesTags: ["BoardSubject"],
    }),
    getAllALevelSubjects: build.query({
      query: () => ({
        url: "board-wise-subjects/type/a-level",
      }),
      invalidatesTags: ["BoardSubject"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddBoardAndSubjectMutation,
  useDeleteSubjectMutation,
  useGetSubjectsQuery,
  useGetAllALevelSubjectsQuery,
  useGetAllOLevelSubjectsQuery
} = boardWiseSubjectApiService;
