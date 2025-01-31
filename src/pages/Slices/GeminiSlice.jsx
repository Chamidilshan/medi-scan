import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const geminiSlice = createApi({
    reducerPath: 'gemini',  
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_BACKEND_API_URL}/gemini`}),
    tagTypes: ['Result'], 
    endpoints: (builder) => ({
        genereateResult: builder.mutation({
            query: (formData) => ({
              url: '/generate-result',
              method: 'POST',
              body: formData,
            }),
            extraOptions: { fixedCacheKey: 'shared-result' },  
          }), 
    })
});

export const { useGenereateResultMutation } = geminiSlice;