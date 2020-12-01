import React from 'react'

const ERROR_TEXT = 'Что-то пошло не так. Попробуй-те снова'
const style = {
    color: '#FF4460',
    textAlign: 'center',
    fontFamily: 'Roboto'
}
const ErrorMessage = props =>
    <h3 style={style}>{props.message || ERROR_TEXT}</h3>

export default ErrorMessage