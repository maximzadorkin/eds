import {combineReducers} from 'redux'
import dateRanges from './reducers/dateRanges.js'
import navigation from './reducers/navigation.js'
import report from './reducers/report.js'
import specification from './reducers/specification.js'
import statuses from './reducers/statuses.js'

const rootReducer = combineReducers({
    navigation,
    dateRanges,
    specification,
    report,
    statuses
})

export default rootReducer