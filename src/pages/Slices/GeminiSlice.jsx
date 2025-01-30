import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const geminiSlice = createApi({
    reducerPath: 'gemini',  
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000/gemini'}),
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