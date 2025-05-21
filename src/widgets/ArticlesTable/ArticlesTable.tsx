import React, { ChangeEvent, memo, useCallback, useState } from "react";
import * as cls from "./ArticlesTable.module.scss";
import { Pagination, SelectOffset } from "@features";
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

    const handlerChangeOffset = useCallback(({ target }: ChangeEvent<HTMLSelectElement>) => {
        setOffset(Number(target.value))
        setPage(1)
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
                <div className={cls.total}>{`Total: ${data.total}`}</div>
                <Pagination 
                    offset={offset} 
                    total={data.total} 
                    page={page} 
                    onClickNextButton={handlerClickNextButton} 
                    onClickPrevButton={handlerClickPrevButton} 
                    onClickNumButton={handlerClickNumButton}/>
                 <SelectOffset onChange={handlerChangeOffset} />       
            </div>
        </div>
    )
});

