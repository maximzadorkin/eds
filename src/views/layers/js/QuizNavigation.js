import React from 'react'
import { connect } from 'react-redux'
import { downloadReport, nextLayer, previousLayer, setFirstLayer } from '../../../redux/actions/actions.js'
import { REPORT } from '../../../constants.js'
import Button from '../../components/js/Button.js'
import ButtonIcon from "../../components/js/ButtonIcon.js";
import css from '../sass/QuizNavigation.module.sass'

const DOWNLOAD_TEXT = 'Скачать отчет'

const QuizNavigation = (props) =>
    <div className={css.block}>
        <div>
            <ButtonIcon icon='&#x40;' style={{color: 'red'}} onClick={props.toStart}/>
            <ButtonIcon icon='&#x3c;' onClick={props.previous}/>

        </div>
        {
            props.layer === REPORT ? (
                <Button text={DOWNLOAD_TEXT}
                    className={css.btn} onClick={props.downloadReport}
                />
            )
            : <ButtonIcon
                icon='&#x3d;'
                style={{marginRight: 0}}
                onClick={() => props.next(props.canNext)}
              />
        }
    </div>

const mapStateToProps = state => {
    const props = {
        layer: state.navigation.active
    }
    return props
}

const mapDispatchToProps = dispatch => {
    const props = {
        next: () => dispatch(nextLayer()),
        previous: () => dispatch(previousLayer()),
        toStart: () => dispatch(setFirstLayer()),
        downloadReport: () => dispatch(downloadReport())
    }
    return props
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizNavigation)