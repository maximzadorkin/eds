import React from 'react'
import * as uniqid from 'uniqid'
import css from './CheckBoxesBlock.module.sass'

const CheckBoxesBlock = props =>
    <div className={`${css.block} ${props.className}`}>
        <span className={css.title}>{props.title}</span>
        <ul className={css.list}>
            {
                props.items.map((i, ind) =>
                    <li className={css.item} key={uniqid()}><label>
                        <input type='checkbox' className={css.checkbox}
                            checked={i.checked} onChange={(ind) => props.onChange(ind)}/>
                        <p className={css.text}>{i.text}</p>
                    </label></li>
                )
            }
        </ul>
    </div>

export default CheckBoxesBlock