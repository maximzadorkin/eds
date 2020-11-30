import { ApiSpecs } from '../../Api.js'
import { COMPANIES } from '../../constants.js'
import {
    ADD_CATEGORY_ITEM, ADD_DATE_RANGE, ADD_STATUSES_TO_SELECTS, CHANGE_REPORT_LAYER_STATUS, DELETE_DATE_RANGE,
    NEXT_LAYER, PREVIOUS_LAYER, REMOVE_CATEGORY_ITEM, REMOVE_STATUSES_FROM_SELECTS,
    SET_CATEGORY_SEARCHES, SET_CATEGORY_SUB_ITEM, SET_FIRST_LAYER, SET_REPORT,
    SET_REPORT_CHART_TYPE, SET_REPORT_VIEW, SET_STATUSES, SET_VALUE_LAYER
} from './actionTypes.js'
import {SET_REPORT_STATISTIC_LISTS} from './actionTypes'


export const addDateRange = ([{startDate, endDate}]) =>
    ({type: ADD_DATE_RANGE, payload: {startDate, endDate}})
export const deleteDateRange = (payload) => ({type: DELETE_DATE_RANGE, payload})


export const setCategorySubItem = (indexStep, item, activeLayer = COMPANIES) => ({
    type: SET_CATEGORY_SUB_ITEM,
    payload: {index: indexStep, item},
    activeLayer
})
export const addCategoryItem = (item, activeLayer) => ({
    type: ADD_CATEGORY_ITEM,
    payload: item,
    activeLayer
})
export const removeCategoryItem = (item, activeLayer) => ({
    type: REMOVE_CATEGORY_ITEM,
    payload: item,
    activeLayer
})
export const searchCategories = (stepIndex, value) => {
    return async (dispatch, getState) => {
        const state = getState()
        const category = state.navigation.active
        const items = state.categories[category].steps.map(p => p.item)
        const searchedValue =
            [...items.splice(0, stepIndex), value].join('-')
        const response = await fetch(ApiSpecs(category, searchedValue), {method: 'GET'})
        let searches = []
        if (response.ok) searches = await response.json()
        else console.log('Cant download labels. Error')
        dispatch(setCategorySearches(searches))
    }
}
export const setCategorySearches = payload => ({type: SET_CATEGORY_SEARCHES, payload})


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