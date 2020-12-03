import React from 'react'
import { connect } from 'react-redux'
import { nextLayer } from '../../redux/actions/actions.js'
import Button from '../ui/Button.js'

const CREATE_REPORT = 'Создать отчет'

const styled = {
    div: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        width: 250,
        position: 'absolute',
        top: 'calc(50% - 30px)',
        left: 'calc(50% - 125px)'
    }
}

const Start = props =>
    <div style={styled.div}>
        <Button
            text={CREATE_REPORT}
            onClick={props.start}
            style={styled.btn}
        />
    </div>

const mapDispatchToProps = dispatch => ({
    start: () => dispatch(nextLayer(true))
})

export default connect(null, mapDispatchToProps)(Start)