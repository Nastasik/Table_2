import { StateSchema } from "@app/providers/StoreProvider/config/types";

export const getArticlesIsLoading = (state: StateSchema) => state.articles?.isLoading || false;
export const getArticlesError = (state: StateSchema) => state.articles?.error;
export const getArticlesOffset = (state: StateSchema) => state.articles?.offset || 3;
export const getArticlesPage = (state: StateSchema) => state.articles?.page || 1;
export const getArticlesTotal = (state: StateSchema) => state.articles?.total || 0;
export const getArticlesData = (state: StateSchema) => state.articles?.data || [];