import React from 'react'
import { connect } from 'react-redux'
import { nextLayer } from '../../../redux/actions/actions.js'
import Button from '../../components/js/Button.js'

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
    </div>

const mapDispatchToProps = dispatch => ({
    start: () => dispatch(nextLayer(true))
})

export default connect(null, mapDispatchToProps)(Start)