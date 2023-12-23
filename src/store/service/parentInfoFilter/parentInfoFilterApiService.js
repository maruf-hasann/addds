import { baseApi } from "../../api/baseApi";

const parentInfoFilterApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getParentInfoFilterData: build.query({
            query: (number) => ({
                url: `parents/info-filter/all/${number}`,
            }),
        }),
        getAllParents: build.query({
            query: (number) => ({
                url: `parents/info-filter/all`,
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useLazyGetParentInfoFilterDataQuery,
    useGetParentInfoFilterDataQuery,
    useGetAllParentsQuery
} = parentInfoFilterApiService;
