import { baseApi } from "../../api/baseApi";

const subjectClassVariantApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSubjectClassVariants: build.query({
            query: () => ({
                url: "subject-class-variant/get-all",
            }),
            providesTags: ["SubjectClassVariant"],
        }),
        addSubjectClassVariant: build.mutation({
            query: (payload) => ({
                url: "subject-class-variant/save",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["SubjectClassVariant"],
        }),
        editSubjectClassVariant: build.mutation({
            query: (payload) => ({
                url: `subject-class-variant/update`,
                method: "PATCH",
                body: payload?.data,
            }),
            invalidatesTags: ["SubjectClassVariant"],
        }),
        deleteSubjectClassVariant: build.mutation({
            query: (payload) => ({
                url: `subject-class-variant/delete`,
                method: "DELETE",
                body: payload,
            }),
            invalidatesTags: ["SubjectClassVariant"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useAddSubjectClassVariantMutation,
    useGetSubjectClassVariantsQuery,
    useDeleteSubjectClassVariantMutation,
    useEditSubjectClassVariantMutation,
} = subjectClassVariantApiService;
