import React from 'react'
import { connect } from 'react-redux'
import { nextLayer } from '../../redux/actions/actions.js'
import Button from '../ui/Button.js'

const CREATE_REPORT = 'Создать отчет'

const styled = {
    div: {
        height: 550,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

const Start = props =>
    <div style={styled.div}>
        <Button
            text={CREATE_REPORT}
            onClick={props.start}
        />
        <div
            dangerouslySetInnerHTML={
                {
                    __html: `&nbsp;<a id="email" style="box-sizing: border-box; -webkit-tap-highlight-color: transparent; text-decoration-line: none; background-color: #ffffff; -webkit-font-smoothing: antialiased; color: #007ab5; font-family: Roboto, Helvetica, Arial, sans-serif; font-size: 14px;" href="mailto:+7(968)825-38-00" target="_blank" rel="noopener">+7(968)825-38-00</a>`
                }
            }
        />
    </div>

const mapDispatchToProps = dispatch => ({
    start: () => dispatch(nextLayer(true))
})

export default connect(null, mapDispatchToProps)(Start)