import React from 'react'
import { connect } from 'react-redux'
import { nextLayer } from '../../../redux/actions/actions.js'
import Button from '../../components/js/Button.js'
import css from '../sass/Start.module.sass'

const CREATE_REPORT = 'Создать отчет'

const Start = props =>
    <div className={css.screen}>
        <Button
            text={CREATE_REPORT}
            onClick={props.start}
        />
    </div>

function mapDispatchToProps(dispatch) {
    const props = {
        start: () => dispatch(nextLayer(true))
    }
    return props
}

export default connect(null, mapDispatchToProps)(Start)