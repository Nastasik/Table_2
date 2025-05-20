import React, { memo, useEffect, useState } from "react";
import * as cls from "./ArticlesTable.module.scss";
import { Pagination } from "@features";
import { Table } from "@shared/ui";
import { TABLE_HEAD } from "./const/tableHead";

export const ArticlesTable = memo(({}) => {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('http://localhost:8000/articles', {

        }).then((res) => {
            return res.json();
           
        }).then(({articles, total}) => {
            console.log(articles, 'upData')
            setData(articles)
        }).catch((er) => {
            console.log(er, 'error')
            setData([])
        })
    }, [])
    
    return (
        <div className={cls.ArticlesTable}>
            <Table head={TABLE_HEAD} data={data} />
            <Pagination offset={5} total={25} page={2} /> 
        </div>
    )
});

