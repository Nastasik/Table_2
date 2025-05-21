import React, { memo, useCallback, useState } from "react";
import * as cls from "./ArticlesTable.module.scss";
import { Pagination } from "@features";
import { Table } from "@shared/ui";
import { TABLE_HEAD } from "./const/tableHead";
import { useGetArticlesQuery } from "./api/articleTableApi";

export const ArticlesTable = memo(({}) => {
    const [page, setPage] = useState(1);
    const [offset, setOffset] = useState(3);
    const { data, isLoading, error} = useGetArticlesQuery({ page, offset })

    const handlerClickNextButton = useCallback(() => {
        setPage(page+1)
    }, [page])

    const handlerClickPrevButton = useCallback(() => {
        setPage(page-1)
    }, [page])

    const handlerClickNumButton = useCallback(({ target }: any) => {
        setPage(Number(target.innerText))
    }, [])

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
            <Table head={TABLE_HEAD} data={data.articles} />
            <div className={cls.wrapper}>
                <Pagination 
                    offset={offset} 
                    total={data.total} 
                    page={page} 
                    onClickNextButton={handlerClickNextButton} 
                    onClickPrevButton={handlerClickPrevButton} 
                    onClickNumButton={handlerClickNumButton}/> 
            </div>
        </div>
    )
});

