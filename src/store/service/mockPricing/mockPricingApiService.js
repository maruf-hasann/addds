import { baseApi } from "../../api/baseApi";

const mockPricingApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMockPricing: build.query({
            query: () => ({
                url: "mock-pricing/get-all",
            }),
            providesTags: ["MockPricing"],
        }),
        addMockPricing: build.mutation({
            query: (payload) => ({
                url: "mock-pricing/create",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["MockPricing"],
        }),
        editMockPricing: build.mutation({
            query: (payload) => ({
                url: `mock-pricing/update/${payload?.id}`,
                method: "PUT",
                body: payload?.data,
            }),
            invalidatesTags: ["MockPricing"],
        }),
        deleteMockPricing: build.mutation({
            query: (id) => ({
                url: `mock-pricing/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["MockPricing"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useAddMockPricingMutation,
    useGetMockPricingQuery,
    useDeleteMockPricingMutation,
    useEditMockPricingMutation,
} = mockPricingApiService;
