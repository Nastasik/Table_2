import { configureStore } from "@reduxjs/toolkit";
import { articlesTableApi } from "@widgets/ArticlesTable/api/articleTableApi";

export const store = configureStore({ 
    reducer: { 
      // Add the generated reducer as a specific top-level slice  
      [articlesTableApi.reducerPath]: articlesTableApi.reducer,  
    }, 
  
    // Adding the api middleware enables caching, invalidation, polling, 
  
    // and other useful features of `rtk-query`. 
  
    middleware: (getDefaultMiddleware) =>   
      getDefaultMiddleware().concat(articlesTableApi.middleware),   
  }) 