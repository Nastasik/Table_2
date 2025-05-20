import { memo } from 'react';
import * as cls from './App.module.scss';
import { ArticlesTable } from '@widgets';
            
export const App = memo(() => {
    return <div className={cls.App}>
                <ArticlesTable />
            </div>
})