import React from 'react'
import * as uniqid from 'uniqid'
import css from './ListWithDeleteElements.module.sass'

const TITLE_OF_EMPTY = 'Нет элементов'

const List = props =>
    <ul className={`${css.list} ${props.className}`} style={props.style}>
        {
            props.items.length === 0
            ? <span className={css.text}>{TITLE_OF_EMPTY}</span>
            : props.items.map(i =>
                <li key={uniqid()} className={css.item} onClick={() => props.deleteHandler(i)}>
                    <span className={css.text}>{i}</span>
                    <span className={css.icon}>
                        &#x58;
                    </span>
                </li>
            )
        }
    </ul>

export default List