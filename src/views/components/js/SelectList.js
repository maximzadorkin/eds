import React from 'react'
import * as uniqid from 'uniqid'
import css from '../sass/SelectList.module.sass'
import ButtonIcon from './ButtonIcon.js'

const SelectList = props =>
    <ul className={`${css.select} ${props.className}`}>
        {
            props.items.map(i =>
                <li key={uniqid()}
                    onClick={() => props.onChange(i)}
                    className={css.item}
                >
                    {i}
                    <ButtonIcon icon='&#x59;'/>
                </li>)
        }
    </ul>

export default SelectList