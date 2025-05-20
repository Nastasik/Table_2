import React, { memo, useMemo } from "react";
import * as cls from "./Pagination.module.scss";
import { setPaginationType } from "./lib/setPaginationType";
import { Button, ButtonTheme } from "@shared/ui";

interface PaginationProps {
    total: number, 
    page: number, 
    offset: number
}

export const Pagination = memo(({ total, page, offset }: PaginationProps) => {
    const lastPage = useMemo(() => Math.ceil(total/offset), [offset, total])
    const roundSelected = useMemo(() => setPaginationType({page, lastPage}), [page, lastPage])

    return (
        <div className={cls.Pagination}>
        <Button text='Назад' />
        {roundSelected.map((el) => <Button text={el} selected={el===page} theme={ButtonTheme.CLEAR} />)}
        <Button text='Вперед' />
        </div>
    )
});

