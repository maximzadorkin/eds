import _ from 'lodash'
import { CHART, CHART_TYPES, COMP_TABLE, ORDERS_TABLE } from '../../constants.js'
import {CHANGE_REPORT_LAYER_STATUS, SET_REPORT, SET_REPORT_CHART_TYPE, SET_REPORT_VIEW} from '../actions/actionTypes.js'
import {SET_REPORT_STATISTIC_LISTS} from '../actions/actionTypes'

const initialState = {
    url: '',
    compare_table: [],
    orders_table: [],
    chart: [],
    layers: [],
    chartTypes: [CHART_TYPES.DYNAMIC, CHART_TYPES.CLASSIFIERS, CHART_TYPES.COMPANIES],
    chartType: CHART_TYPES.DYNAMIC,
    views: [CHART, COMP_TABLE, ORDERS_TABLE],
    view: ORDERS_TABLE,
    statistic: {
        list1: [],
        list2: []
    }
}

const getCompareTable = (table) => {
    const countOrders = table.length
    const classifiersArray = _.uniq(table.map(t => t.Classifier)).sort()
    const classifiersContainer = classifiersArray.map(c => ({
        name: c, statuses: {}
    }))
    table.forEach(cell => {
        const indexClassif = classifiersArray.indexOf(cell.Classifier)
        const status = cell.Status
        const haveStat = Boolean(classifiersContainer[indexClassif].statuses[status])
        if (haveStat) classifiersContainer[indexClassif].statuses[status] += 1
        else classifiersContainer[indexClassif].statuses[status] = 1
    })
    const compare_table = [
        ['Количество заявок', countOrders, ''],
        ['Количество заявок по классификаторам:', '', ''],
        ...classifiersContainer.map(c => {
            const title = [c.name, '', 'кол-во']
            const statuses = Object.keys(c.statuses).map(k => ['', k, c.statuses[k]])
            return [title, ...statuses]
        }).flat()
    ]
    return compare_table
}

const reducer = (state = initialState, action) => {
    let newState
    const value = action.payload
    switch (action.type) {
        case SET_REPORT:
            const orders_table = action.payload.table.map(line => {
                const keys = Object.keys(line).sort()
                return keys.map(k => line[k])
            })
            const compare_table = getCompareTable(action.payload.table)
            newState = {...value, orders_table, compare_table}
            return {...state, ...newState}

        case SET_REPORT_STATISTIC_LISTS:
            newState = {...state, statistic: {...value}}
            return newState

        case SET_REPORT_VIEW:
            return {...state, view: value}
        case SET_REPORT_CHART_TYPE:
            const chartTypes = Object.values(CHART_TYPES)
            const chartType = chartTypes.filter(c => c.name === value)[0]
            return {...state, chartType}
        case CHANGE_REPORT_LAYER_STATUS:
            const updatedLayers = state.layers.map(l =>
                l.name === value ? {...l, checked: !l.checked} : l)
            return {...state, layers: updatedLayers}
        default:
            return state
    }
}

export default reducer