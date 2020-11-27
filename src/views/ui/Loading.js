import React from 'react'
import css from './Loading.module.sass'

const Loading = props =>
    <div className={css.section}>
        <div className={css.block}>
            <div className={css.load}>
                &#xe02d;
            </div>
        </div>
    </div>

export default Loading