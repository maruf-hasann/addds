import { baseApi } from "../../api/baseApi";

const subSubjectApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSubSubject: build.query({
            query: () => ({
                url: "sub-subject/all",
            }),
            providesTags: ["SubSubject"],
        }),
        addSubSubject: build.mutation({
            query: (payload) => ({
                url: "sub-subject/save",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["SubSubject"],
        }),
        editSubSubject: build.mutation({
            query: (payload) => ({
                url: `sub-subject/update/${payload?.id}`,
                method: "PATCH",
                body: payload?.data,
            }),
            invalidatesTags: ["SubSubject"],
        }),
        deleteSubSubject: build.mutation({
            query: (id) => ({
                url: `sub-subject/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["SubSubject"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useAddSubSubjectMutation,
    useDeleteSubSubjectMutation,
    useGetSubSubjectQuery,
    useEditSubSubjectMutation,
} = subSubjectApiService;