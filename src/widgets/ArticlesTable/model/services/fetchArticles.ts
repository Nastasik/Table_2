import { createAsyncThunk } from '@reduxjs/toolkit';
import { getArticlesOffset, getArticlesPage } from '../selectors/articlesSelectors';
import { ThunkConfig } from '@app/providers/StoreProvider/config/types';
import { Data } from '../types/articlesSchema';

// Data, - result
// void, - props fetchArticles
// ThunkConfig<string>
export const fetchArticles = createAsyncThunk<
    Data,
    void,
    ThunkConfig<string>
    >(
        'articles/fetchArticles',
        async (props, thunkApi) => {
            const { extra, rejectWithValue, getState } = thunkApi;

            try {
                const offset = getArticlesOffset(getState());
                const page = getArticlesPage(getState());

                const response = await extra.api.get<Data>('/articles', {
                    params: {
                        offset, 
                        page,
                    },
                });

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                return rejectWithValue('error');
            }
        },
    );
