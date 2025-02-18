import { configureStore } from "@reduxjs/toolkit";
import { richHumansApi } from "./richHumansApi";
import { productsApi } from "./productsApi";

export const store = configureStore({
   reducer: {
      [richHumansApi.reducerPath]: richHumansApi.reducer,
      [productsApi.reducerPath]: productsApi.reducer
   },

   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(richHumansApi.middleware, productsApi.middleware),
});
