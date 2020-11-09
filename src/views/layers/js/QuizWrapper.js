import React from 'react'
import '../../../fonts/fontIcons.css'
import { connect } from 'react-redux'
import { CATEGORY, DATE_RANGES, LOADING, REPORT, SPECIFICATION, START, STATUSES } from '../../../constants.js'
import Loading from '../../components/js/Loading.js'
import css from '../sass/QuizWrapper.module.sass'
import Category from './Category.js'
import Dates from './Dates.js'
import QuizNavigation from './QuizNavigation.js'
import Report from './Report.js'
import Specification from './Specification.js'
import Start from './Start.js'
import Statuses from './Statuses.js'

const QuizWrapper = props =>
    <div className={css.wrapper}>
        <div className={css.container}>
            {
                props.layer === START || props.layer === LOADING
                    ? null
                    : <QuizNavigation />
            }
            {
                props.layer === START
                ? <Start />
                : props.layer === STATUSES
                ? <Statuses />
                : props.layer === CATEGORY
                ? <Category />
                : props.layer === SPECIFICATION
                ? <Specification />
                : props.layer === DATE_RANGES
                ? <Dates />
                : props.layer === REPORT
                ? <Report />
                : props.layer === LOADING
                ? <Loading />
                : null
            }
        </div>
    </div>

function mapStateToProps(state) {
    const props = {
        layer: state.navigation.active
    }
    return props
}

export default connect(mapStateToProps)(QuizWrapper)