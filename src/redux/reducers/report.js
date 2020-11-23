import _ from 'lodash'
import { CHART, CHART_TYPES, COMP_TABLE, ORDERS_TABLE } from '../../constants.js'
import {
    CHANGE_REPORT_LAYER_STATUS,
    SET_REPORT,
    SET_REPORT_CHART_TYPE,
    SET_REPORT_VIEW
} from '../actions/actionTypes.js'

const initialState = {
    comp_table: [],
    orders_table: [],
    chart: [],
    layers: [],
    chartTypes: [CHART_TYPES.DYNAMIC, CHART_TYPES.FOR_PERIOD, CHART_TYPES.COMPANIES],
    chartType: CHART_TYPES.DYNAMIC,
    views: [CHART, COMP_TABLE, ORDERS_TABLE],
    view: CHART
}

const reducer = (state = initialState, action) => {
    let newState
    const value = action.payload
    switch (action.type) {
        case SET_REPORT:
            const comp_table = []
            const orders_table = action.payload.map(line =>
                Object.keys(line).sort().map(k => line[k]))
            const chart = []
            const layers = _.uniq(chart.map(g => ({name: g.ZLabel, checked: false})))
            newState = {...state, layers, comp_table, orders_table, chart}
            return newState
        case SET_REPORT_VIEW:
            return {...state, view: value}
        case SET_REPORT_CHART_TYPE:
            return {...state, chartType: value}
        case CHANGE_REPORT_LAYER_STATUS:
            const updatedLayers = state.layers.map(l =>
                l.name === value ? {...l, checked: !l.checked} : l)
            return {...state, layers: updatedLayers}
        default:
            return state
    }
}

export default reducer