import React from 'react'
import css from './Button.module.sass'

const Button = (props) =>
    <button
        onClick={props.onClick}
        onDoubleClick={props.onClick}
        disabled={props.disabled}
        className={`${css.btn} ${props.className}`}
        style={props.style}
    >
        {props.text}
    </button>

export default Button