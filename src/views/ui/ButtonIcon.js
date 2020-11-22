import React from 'react'
import css from './ButtonIcon.module.sass'

const ButtonIcon = (props) =>
    <button
        className={`${css.btn} ${props.className} ${props.lightHover ? css.lightHover : null}`}
        style={props.style}
        onClick={props.onClick}
    >
        {props.icon}
    </button>

export default ButtonIcon