import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchArticles } from '../services/fetchArticles'
import { ArticlesSchema, Data } from '../types/articlesSchema'

// Define a type for the slice state


// Define the initial state using that type
const initialState: ArticlesSchema = {
    data: [],
    total: 0,
    offset: 3,
    page: 1,
    isLoading: false,
    error: undefined
}

export const articlesSlice = createSlice({
  name: 'articlesSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setOffset: (state, { payload }) => {
      state.offset = payload
    },
    setPage: (state, { payload }) => {
      state.page = payload
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchArticles.pending, (state) => {
            state.error = '';
            state.isLoading = true;
        })
        .addCase(fetchArticles.fulfilled, (
            state,
            { payload }: PayloadAction<Data>,
        ) => {
            state.isLoading = false;
            state.total = payload.total;
            state.data = payload.articles;
        })
        .addCase(fetchArticles.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
},
})

export const {
    reducer: articlesReducer,
    actions: articlesActions,
} = articlesSlice;