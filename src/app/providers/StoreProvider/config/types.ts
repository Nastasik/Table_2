import { ArticlesSchema } from "@widgets/ArticlesTable/model/types/articlesSchema";
import { AxiosInstance } from "axios";

export interface StateSchema {
    articles: ArticlesSchema,
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}