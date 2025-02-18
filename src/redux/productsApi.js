import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:3001/';

const typeTag = 'Products'; 
const src = 'products';

export const productsApi = createApi({
   reducerPath: src,
   tagTypes: [typeTag],
   baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),

   endpoints: (build) => ({

      getProducts: build.query({
         query: (id = '') => `${src}/${id}`,
         providesTags: (result) =>
            result && Array.isArray(result)
               ? [
                  ...result.map(({ id }) => ({ type: typeTag, id })),
                  { type: typeTag, id: 'LIST' },
               ]
               : [{ type: typeTag, id: 'LIST' }],
      })
   })
});

export const { useGetProductsQuery } = productsApi;
