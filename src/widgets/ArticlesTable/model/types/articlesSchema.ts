

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

export interface Data {
    articles: Article[],
    total: number
}

export interface ArticlesSchema {
    data: Article[],
    total: number,
    offset: number,
    page: number,
    isLoading: boolean,
    error?: string
}