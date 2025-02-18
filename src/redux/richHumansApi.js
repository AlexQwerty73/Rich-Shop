import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:3001/';

const typeTag = 'RichHumans';
const src = 'rich-humans';

export const richHumansApi = createApi({
   reducerPath: src,
   tagTypes: [typeTag],
   baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),

   endpoints: (build) => ({
      getRichHumans: build.query({
         query: (id) => id ? `${src}/${id}` : src,
         transformResponse: (response) => {
            if (Array.isArray(response)) return response;
            return [response];
         },
         providesTags: (result) => {
            if (result?.length) {
               return [
                  ...result.map(({ id }) => ({ type: typeTag, id })),
                  { type: typeTag, id: 'LIST' }
               ];
            }
            return [{ type: typeTag, id: 'LIST' }];
         }
      }),
   }),
});

export const { useGetRichHumansQuery } = richHumansApi;
