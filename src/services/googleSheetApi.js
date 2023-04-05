import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const googleSheetApiService = createApi({
    reducerPath: 'googleSheetApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://sheets.googleapis.com/v4/spreadsheets/'
    }),
    endpoints: (builder) => ({
      getAllStores: builder.query({
        query: () => `${process.env.REACT_APP_ID}/values/${process.env.REACT_APP_SHEET}?alt=json&key=${process.env.REACT_APP_KEY}`,
      }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllStoresQuery } = googleSheetApiService