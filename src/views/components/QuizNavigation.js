import React from 'react'
import { connect } from 'react-redux'
import { nextLayer, previousLayer, setFirstLayer } from '../../redux/actions/actions.js'
import { REPORT } from '../../constants.js'
import ButtonIcon from '../ui/ButtonIcon.js'
import css from './QuizNavigation.module.sass'
import colors from '../ui/Colors.module.sass'

const DOWNLOAD_TEXT = 'Скачать отчет'

const QuizNavigation = (props) =>
    <div className={css.block}>
        <div>
            <ButtonIcon icon='&#xe049;' className={colors['red-color']} onClick={props.toStart}/>
            <ButtonIcon icon='&#xe04d;' onClick={props.previous}/>

        </div>
        {
            props.layer === REPORT
            ? <a href={props.downloadReportUrl} onClick={() => {
                //window.open('https://dev.dcorpse.keenetic.pro/api/eds/test', '_blank')
                }} className={css.btn}>{DOWNLOAD_TEXT}</a>
            : <ButtonIcon
                icon='&#xe04e;'
                style={{marginRight: 0}}
                onClick={() => props.next(props.canNext)}
              />
        }
    </div>

const mapStateToProps = state => ({
    layer: state.navigation.active,
    downloadReportUrl: state.report.url
})

const mapDispatchToProps = dispatch => ({
    next: () => dispatch(nextLayer()),
    previous: () => dispatch(previousLayer()),
    toStart: () => dispatch(setFirstLayer())
})

export default connect(mapStateToProps, mapDispatchToProps)(QuizNavigation)