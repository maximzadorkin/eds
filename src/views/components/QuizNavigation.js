import React from 'react'
import { connect } from 'react-redux'
import { nextLayer, previousLayer, setFirstLayer } from '../../redux/actions/actions.js'
import {ERROR, REPORT} from '../../constants.js'
import ButtonIcon from '../ui/ButtonIcon.js'
import css from './QuizNavigation.module.sass'
import colors from '../ui/Colors.module.sass'

const DOWNLOAD_TEXT = 'Скачать отчет'

const QuizNavigation = (props) =>
    <div className={css.block}>
        <div className={css.leftGroupBtn}>
            <ButtonIcon icon='&#x38;' className={`${css.btnIcon} ${colors['red-color']}`} onClick={props.toStart}/>
            <ButtonIcon icon='&#x34;' className={css.btnIcon} onClick={props.previous}/>
            {props.extraBtn}
        </div>
        {
            props.layer === REPORT
            ? (<a download={props.downloadReportName} target='_blank'
                  href={props.downloadReportUrl}
                  className={css.btn}>
                    {DOWNLOAD_TEXT}
               </a>)
            : props.layer === ERROR
            ? null : (<ButtonIcon
                icon='&#xe04e;'
                style={{marginRight: 0}}
                onClick={() => props.next(props.canNext)}
              />)
        }
    </div>

const mapStateToProps = state => ({
    layer: state.navigation.active,
    downloadReportUrl: state.report.file.url,
    downloadReportName: state.report.file.name
})

const mapDispatchToProps = dispatch => ({
    next: () => dispatch(nextLayer()),
    previous: () => dispatch(previousLayer()),
    toStart: () => dispatch(setFirstLayer())
})

export default connect(mapStateToProps, mapDispatchToProps)(QuizNavigation)