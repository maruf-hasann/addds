import { baseApi } from "../../api/baseApi";

const parentInfoFilterApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getParentInfoFilterData: build.query({
            query: (number) => ({
                url: `parents/info-filter/all/${number}`,
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useLazyGetParentInfoFilterDataQuery,
    useGetParentInfoFilterDataQuery,
} = parentInfoFilterApiService;
