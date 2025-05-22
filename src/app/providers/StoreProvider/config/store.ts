import { configureStore } from "@reduxjs/toolkit";
import { articlesReducer } from "@widgets/ArticlesTable/model/slices/articlesSlice";
import axios from "axios";

export const $api = axios.create({
    baseURL: __API__,
});

export const store = configureStore({ 
    reducer: { 
      // Add the generated reducer as a specific top-level slice  
      articles: articlesReducer,  
    }, 
  
    // Adding the api middleware enables caching, invalidation, polling, 
  
    // and other useful features of `rtk-query`. 
  
    middleware: (getDefaultMiddleware) =>   
        getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    api: $api,
                },
            },
        }),   
  }) 

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch