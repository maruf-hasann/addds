import { baseApi } from "../../api/baseApi";

const mainSubjectApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMainSubject: build.query({
            query: () => ({
                url: "main-subject/all",
            }),
            providesTags: ["MainSubject"],
        }),
        addMainSubject: build.mutation({
            query: (payload) => ({
                url: "main-subject/save",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["MainSubject"],
        }),
        editMainSubject: build.mutation({
            query: (payload) => ({
                url: `main-subject/update/${payload?.id}`,
                method: "PATCH",
                body: payload?.data,
            }),
            invalidatesTags: ["MainSubject"],
        }),
        deleteMainSubject: build.mutation({
            query: (id) => ({
                url: `main-subject/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["MainSubject"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetMainSubjectQuery,
    useDeleteMainSubjectMutation,
    useAddMainSubjectMutation,
    useEditMainSubjectMutation,
} = mainSubjectApiService;
