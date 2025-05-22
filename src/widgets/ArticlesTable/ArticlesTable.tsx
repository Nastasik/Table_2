import React, { ChangeEvent, memo, useCallback, useEffect, useState } from "react";
import * as cls from "./ArticlesTable.module.scss";
import { Pagination, SelectOffset } from "@features";
import { Table } from "@shared/ui";
import { TABLE_HEAD } from "./const/tableHead";
import { useDispatch, useSelector } from "react-redux";
import { getArticlesData, getArticlesError, getArticlesIsLoading, getArticlesOffset, getArticlesPage, getArticlesTotal } from "./model/selectors/articlesSelectors";
import { AppDispatch } from "@app/providers/StoreProvider/config/store";
import { articlesActions } from "./model/slices/articlesSlice";
import { fetchArticles } from "./model/services/fetchArticles";

export const ArticlesTable = memo(({}) => {
    const page = useSelector(getArticlesPage);
    const offset = useSelector(getArticlesOffset);
    const data = useSelector(getArticlesData);
    const total = useSelector(getArticlesTotal);
    const isLoading = useSelector(getArticlesIsLoading);
    const error = useSelector(getArticlesError);
    const dispatch = useDispatch<AppDispatch>();
    
    useEffect(() => { dispatch(fetchArticles()) }, [])

    const handlerClickNextButton = useCallback(() => {
        dispatch(articlesActions.setPage(page+1))
        dispatch(fetchArticles())
    }, [page, dispatch])

    const handlerClickPrevButton = useCallback(() => {
        dispatch(articlesActions.setPage(page-1))
        dispatch(fetchArticles())
    }, [page, dispatch])

    const handlerClickNumButton = useCallback(({ target }: any) => {
        dispatch(articlesActions.setPage(Number(target.innerText)))
        dispatch(fetchArticles())
    }, [dispatch])

    const handlerChangeOffset = useCallback(({ target }: ChangeEvent<HTMLSelectElement>) => {
        dispatch(articlesActions.setOffset(Number(target.value)))
        dispatch(articlesActions.setPage(1))
        dispatch(fetchArticles())
    }, [dispatch])

    if(error) {
        return 'Error'
    }

    if(isLoading) {
        return 'Загрузка...'
    }

    if(!data) {
        return 'No data'
    }

    return (
        <div className={cls.ArticlesTable}>
            <Table head={TABLE_HEAD} data={data} />
            <div className={cls.wrapper}>
                <div className={cls.total}>{`Total: ${total}`}</div>
                <Pagination 
                    offset={offset} 
                    total={total} 
                    page={page} 
                    onClickNextButton={handlerClickNextButton} 
                    onClickPrevButton={handlerClickPrevButton} 
                    onClickNumButton={handlerClickNumButton}/>
                 <SelectOffset onChange={handlerChangeOffset} />       
            </div>
        </div>
    )
});

