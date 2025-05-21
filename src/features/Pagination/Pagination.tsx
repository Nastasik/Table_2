import React, { memo, useMemo } from "react";
import * as cls from "./Pagination.module.scss";
import { setPaginationType } from "./lib/setPaginationType";
import { Button, ButtonTheme } from "@shared/ui";

interface PaginationProps {
    total: number, 
    page: number, 
    offset: number,
    onClickNextButton: () => void,
    onClickPrevButton: () => void,
    onClickNumButton: (el: any) => void,
}

export const Pagination = memo(({ total, page, offset, onClickNextButton, onClickPrevButton, onClickNumButton }: PaginationProps) => {
    const lastPage = useMemo(() => Math.ceil(total/offset), [offset, total]);
    const roundSelected = useMemo(() => setPaginationType({page, lastPage}), [page, lastPage]);
    const disabledNextBtn = useMemo(() => page === lastPage, [page, lastPage]);
    const disabledPrevBtn = useMemo(() => page === 1, [page]);

    return (
        <div className={cls.Pagination}>
            <Button text='Назад' disabled={disabledPrevBtn} onClick={onClickPrevButton} />
            <div className={cls.wrapper}>
                {roundSelected.map((el) => <Button text={el} onClick={onClickNumButton} selected={el===page} theme={ButtonTheme.CLEAR} />)}
            </div>
            <Button text='Вперед' disabled={disabledNextBtn} onClick={onClickNextButton} />
        </div>
    )
});

