import React from 'react'
import '../../fonts/fontIcons.css'
import { connect } from 'react-redux'
import { CATEGORY, DATE_RANGES, LOADING, REPORT, SPECIFICATION, START, STATUSES } from '../../constants.js'
import Loading from '../ui/Loading.js'
import css from './QuizWrapper.module.sass'
import Category from '../components/Category.js'
import Dates from '../components/Dates.js'
import QuizNavigation from '../components/QuizNavigation.js'
import Report from '../components/Report.js'
import Specification from '../components/Specification.js'
import Start from '../components/Start.js'
import Statuses from '../components/Statuses.js'

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

const mapStateToProps = state => ({
    layer: state.navigation.active
})

export default connect(mapStateToProps)(QuizWrapper)