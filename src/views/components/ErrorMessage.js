import React from 'react'

const ERROR_TEXT = 'Что-то пошло не так. Попробуй-те снова'
const style = {
    width: 320,
    color: '#FF4460',
    textAlign: 'center',
    fontFamily: 'Roboto',
    position: 'absolute',
    top: 'calc(50%)',
    left: 'calc(50% - 160px)'
}
const ErrorMessage = props =>
    <h3 style={style}>{props.message || ERROR_TEXT}</h3>

export default ErrorMessage