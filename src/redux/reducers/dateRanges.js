import _ from 'lodash'
import { ADD_DATE_RANGE, DELETE_DATE_RANGE } from '../actions/actionTypes.js'

const dateToZeroHour = ({startDate, endDate}) => {
    const startYear = startDate.getFullYear()
    const startMonth = startDate.getMonth()
    const startDay = startDate.getDate()
    const endYear = endDate.getFullYear()
    const endMonth = endDate.getMonth()
    const endDay = endDate.getDate()
    const zeroDate = {
        startDate: new Date(startYear, startMonth, startDay),
        endDate: new Date(endYear, endMonth, endDay)
    }
    return zeroDate
}

const parseRangeToString = ({startDate, endDate}) =>
    `${startDate}&&${endDate}`

const parseRangeToObj = string => {
    const [s, e] = string.split('&&')
    return {startDate: new Date(s), endDate: new Date(e)}
}

const sortDates = (date1, date2) => {
    // если + то добавится в начало (более новые даты наверх)
    // если - то в конец
    const comp1 = date2.startDate - date1.startDate
    const comp2 = date2.endDate - date1.endDate
    return comp1 === 0 ? comp2 : comp1
}

const initialState = []

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DATE_RANGE:
            const truePayload = dateToZeroHour(action.payload)
            const sortedRanges = [...state, truePayload].sort(sortDates)
            const rangesString = sortedRanges.map(parseRangeToString)
            const uniqRangesString = _.uniq(rangesString)
            const wasLength = rangesString.length
            const nowLength = uniqRangesString.length
            if (wasLength > nowLength) alert('Период уже есть в списке')
            const wrongLength = state.length > 0
                ? state.filter(d =>
                    d.endDate - d.startDate !== truePayload.endDate - truePayload.startDate
                ).length > 0
                : false
            if (wrongLength) {
                alert('Длины периодов должны быть равны')
                return state
            }
            const ranges = uniqRangesString.map(parseRangeToObj)
            return ranges
        case DELETE_DATE_RANGE:
            const [startDate, endDate] = action.payload.split(' - ')
                .map(d => d.split('.'))
                .map(d => _.reverse(d))
                .map(d => d.map(s => Number(s)))
                .map(d => [d[0], d[1] - 1, d[2]])
                .map(d => new Date(...d))
            const stringState = state.map(parseRangeToString)
            const stringDelete = parseRangeToString({startDate, endDate})
            const deleteRangeIndex = stringState.indexOf(stringDelete)
            state.splice(deleteRangeIndex, 1)
            return [...state]
        default:
            return state
    }
}

export default reducer