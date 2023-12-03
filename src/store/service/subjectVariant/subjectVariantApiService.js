import { baseApi } from "../../api/baseApi";

const subjectVariantApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSubjectVariant: build.query({
            query: () => ({
                url: "subject-variant/get-all",
            }),
            providesTags: ["SubjectVariant"],
        }),
        addSubjectVariant: build.mutation({
            query: (payload) => ({
                url: "subject-variant/save",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["SubjectVariant"],
        }),
        editSubjectVariant: build.mutation({
            query: (payload) => ({
                url: `subject-variant/update/${payload?.id}`,
                method: "PATCH",
                body: payload?.data,
            }),
            invalidatesTags: ["SubjectVariant"],
        }),
        deleteSubjectVariant: build.mutation({
            query: (id) => ({
                url: `subject-variant/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["SubjectVariant"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useAddSubjectVariantMutation,
    useGetSubjectVariantQuery,
    useDeleteSubjectVariantMutation,
    useEditSubjectVariantMutation,
} = subjectVariantApiService;
