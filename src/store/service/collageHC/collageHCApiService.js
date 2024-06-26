import { baseApi } from "../../api/baseApi";

const collageHCApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCollageHC: build.query({
            query: () => ({
                url: "collage-hc/all",
            }),
            providesTags: ["CollageHC"],
        }),
        addCollageHC: build.mutation({
            query: (payload) => ({
                url: "collage-hc/save",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["CollageHC"],
        }),
        editCollageHC: build.mutation({
            query: (payload) => ({
                url: `collage-hc/update/${payload?.id}`,
                method: "PATCH",
                body: payload?.data,
            }),
            invalidatesTags: ["CollageHC"],
        }),
        deleteCollageHC: build.mutation({
            query: (id) => ({
                url: `collage-hc/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["CollageHC"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useAddCollageHCMutation,
    useGetCollageHCQuery,
    useDeleteCollageHCMutation,
    useEditCollageHCMutation,
} = collageHCApiService;
