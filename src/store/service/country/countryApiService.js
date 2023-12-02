import { baseApi } from "../../api/baseApi";

const countryApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCountries: build.query({
            query: () => ({
                url: `https://api.countrystatecity.in/v1/countries`,
                headers: {
                    "X-CSCAPI-KEY":
                        "OHJGV1poUEN5TzhYT3B2SU1yRHNIUGxHczl1SXVjYUd3Q3RTS1Q3UQ==",
                },
            }),
            providesTags: ["Country"],
        }),
        getCountryDistrict: build.query({
            query: (payload) => ({
                url: `https://api.countrystatecity.in/v1/countries/${payload}/states`,
                headers: {
                    "X-CSCAPI-KEY":
                        "OHJGV1poUEN5TzhYT3B2SU1yRHNIUGxHczl1SXVjYUd3Q3RTS1Q3UQ==",
                },
            }),
            providesTags: ["Country"],
        }),
    }),
    overrideExisting: false,
});

export const { useGetCountriesQuery, useLazyGetCountryDistrictQuery } =
    countryApiService;
