import React, { memo } from "react";
import * as cls from "./Table.module.scss";

export const Table = memo(({ head, data }: any) => {
  return (
    <div className={cls.Table}>
        <div className={cls.thead}>
            <div className={cls.tr}>
                {head.map(({ key, label }: any) =>
                    <div className={cls.th} key={key}>
                    <span>{label}</span>
                    </div>
                )}
            </div>
        </div>
        <div className={cls.tbody}>
            {data.map((item: any) => (
                <div key={`${item.name}`} className={cls.tr}>
                    {head.map(({key}: any) => <div className={cls.td} key={`${item.name}${key}`}>{item[key]}</div>)}
                </div>
            ))}
        </div>
    </div>
  )
});





