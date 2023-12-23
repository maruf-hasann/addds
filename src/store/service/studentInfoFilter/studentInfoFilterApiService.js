import { baseApi } from "../../api/baseApi";

const studentInfoFilterApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getStudentInfoFilterData: build.query({
            query: (number) => ({
                url: `students/info-filter/all/${number}`,
            }),
        }),
        getAllStudent: build.query({
            query: (number) => ({
                url: `students/info-filter/all`,
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useLazyGetStudentInfoFilterDataQuery,
    useGetStudentInfoFilterDataQuery,
    useGetAllStudentQuery
} = studentInfoFilterApiService;
