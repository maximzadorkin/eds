import {combineReducers} from 'redux'
import dateRanges from './dateRanges.js'
import navigation from './navigation.js'
import report from './report.js'
import specification from './specification.js'
import statuses from './statuses.js'

const rootReducer = combineReducers({
    navigation,
    dateRanges,
    specification,
    report,
    statuses
})

export default rootReducer