import { baseApi } from "../../api/baseApi";

const tutoringClassPMApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTutoringClassPM: build.query({
            query: () => ({
                url: "tutoring-class-pm/all",
            }),
            providesTags: ["TutoringClassPM"],
        }),
        addTutoringClassPM: build.mutation({
            query: (payload) => ({
                url: "tutoring-class-pm/save",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["TutoringClassPM"],
        }),
        deleteTutoringClassPM: build.mutation({
            query: (id) => ({
                url: `tutoring-class-pm/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["TutoringClassPM"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetTutoringClassPMQuery,
    useAddTutoringClassPMMutation,
    useDeleteTutoringClassPMMutation,
} = tutoringClassPMApiService;
