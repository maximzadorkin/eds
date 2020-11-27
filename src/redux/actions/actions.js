import {
    ADD_DATE_RANGE,
    ADD_SPECIFICATION_ITEM,
    ADD_STATUSES_TO_SELECTS,
    CHANGE_REPORT_LAYER_STATUS,
    DELETE_DATE_RANGE,
    GET_LABELS_SPEC,
    NEXT_LAYER,
    PREVIOUS_LAYER,
    REMOVE_SPECIFICATION_ITEM,
    REMOVE_STATUSES_FROM_SELECTS,
    SET_AND_SEARCH,
    SET_CATEGORY,
    SET_FIRST_LAYER,
    SET_REPORT,
    SET_REPORT_CHART_TYPE,
    SET_REPORT_VIEW,
    SET_SPECIFICATION_SEARCHES,
    SET_SPECS_LABEL_ITEM,
    SET_STATUSES,
    SET_VALUE_LAYER
} from './actionTypes.js'
import {SET_REPORT_STATISTIC_LISTS} from './actionTypes'

export const addDateRange = ([{startDate, endDate}]) =>
    ({type: ADD_DATE_RANGE, payload: {startDate, endDate}})
export const deleteDateRange = (payload) => ({type: DELETE_DATE_RANGE, payload})
export const setAndSearch = (whatSearch, value, searches) =>
    ({type: SET_AND_SEARCH, payload: {[whatSearch]: value, searches}})

export const setCategory = payload => ({type: SET_CATEGORY, payload})
export const getLabelsSpec = payload => ({type: GET_LABELS_SPEC, payload})
export const setSpecsLabelItem = (index, item) => ({type: SET_SPECS_LABEL_ITEM, payload: {index, item}})
export const addSpecificationItem = payload => ({type: ADD_SPECIFICATION_ITEM, payload})
export const removeSpecificationItem = payload => ({type: REMOVE_SPECIFICATION_ITEM, payload})
export const setSpecificationSearches = payload => ({type: SET_SPECIFICATION_SEARCHES, payload})

export const nextLayer = () => ({type: NEXT_LAYER})
export const previousLayer = () => ({type: PREVIOUS_LAYER})
export const setFirstLayer = () => ({type: SET_FIRST_LAYER})
export const setValueLayer = payload => ({type: SET_VALUE_LAYER, payload})

export const addStatusesToSelects = payload => ({type: ADD_STATUSES_TO_SELECTS, payload})
export const removeStatusesFromSelects = payload => ({type: REMOVE_STATUSES_FROM_SELECTS, payload})
export const setStatuses = payload => ({type: SET_STATUSES, payload})

export const setReport = payload => ({type: SET_REPORT, payload})
export const setReportStatisticLists = (list1, list2) => ({type: SET_REPORT_STATISTIC_LISTS, payload: {list1, list2}})
export const setReportView = view => ({type: SET_REPORT_VIEW, payload: view})
export const setReportChartType = chartType => ({type: SET_REPORT_CHART_TYPE, payload: chartType})
export const changeReportLayerStatus = layer => ({type: CHANGE_REPORT_LAYER_STATUS, payload: layer})
