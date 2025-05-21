import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetArticlesTableArg {
    offset: number,
    page: number
}

interface Article {
    "id": string,
    "title": string,
    "subtitle": string,
    "img": string,
    "views": number,
    "createdAt": string,
    "userId": string,
    "type": string[],
}

interface Data {
    articles: Article[],
    total: number
}
export const articlesTableApi = createApi({
    reducerPath: 'articlesTable',
    baseQuery: fetchBaseQuery({
        baseUrl: __API__,
        prepareHeaders: (headers) => {},
    }),
    endpoints: (builder) => ({
        getArticles: builder.query<Data, GetArticlesTableArg>({
            query: ({ offset, page }) => ({
                url: '/articles',
                params: {
                    offset,
                    page,
                },
            }),
        }),
        // rateArticle: builder.mutation<void, ArticlesTableArg>({
        //     query: (arg) => ({
        //         url: '/articles',
        //         method: 'POST',
        //         body: arg,
        //     }),
        // }),
    }),
});

export const { useGetArticlesQuery } = articlesTableApi; 