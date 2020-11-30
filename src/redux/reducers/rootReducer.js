import {combineReducers} from 'redux'
import categories from './categories.js'
import dateRanges from './dateRanges.js'
import navigation from './navigation.js'
import report from './report.js'
import statuses from './statuses.js'

const rootReducer = combineReducers({
    navigation,
    dateRanges,
    categories,
    report,
    statuses
})

export default rootReducer