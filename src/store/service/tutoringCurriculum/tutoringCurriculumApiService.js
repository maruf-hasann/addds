import { baseApi } from "../../api/baseApi";

const tutoringCurriculumApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTutoringCurriculum: build.query({
            query: () => ({
                url: "tutoring-curriculum/get-all",
            }),
            providesTags: ["TutoringCurriculum"],
        }),
        addTutoringCurriculum: build.mutation({
            query: (payload) => ({
                url: "tutoring-curriculum/add",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["TutoringCurriculum"],
        }),
        editTutoringCurriculum: build.mutation({
            query: (payload) => ({
                url: `tutoring-curriculum/update/${payload?.id}`,
                method: "PATCH",
                body: payload?.data,
            }),
            invalidatesTags: ["TutoringCurriculum"],
        }),
        deleteTutoringCurriculum: build.mutation({
            query: (id) => ({
                url: `tutoring-curriculum/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["TutoringCurriculum"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useAddTutoringCurriculumMutation,
    useGetTutoringCurriculumQuery,
    useDeleteTutoringCurriculumMutation,
    useEditTutoringCurriculumMutation,
} = tutoringCurriculumApiService;
