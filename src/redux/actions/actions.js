import {
    ADD_DATE_RANGE,
    ADD_SPECIFICATION_ITEM, ADD_STATUSES_TO_SELECTS,
    DELETE_DATE_RANGE, DOWNLOAD_REPORT,
    GET_LABELS_SPEC, GET_REPORT,
    NEXT_LAYER,
    PREVIOUS_LAYER,
    REMOVE_SPECIFICATION_ITEM, REMOVE_STATUSES_FROM_SELECTS,
    SET_AND_SEARCH, SET_CATEGORY,
    SET_FIRST_LAYER, SET_REPORT_GRAPH_TYPE,
    SET_SPECIFICATION_SEARCHES,
    SET_SPECS_LABEL_ITEM, SET_STATUSES,
    SET_VALUE_LAYER
} from './actionTypes.js'

export function addDateRange([{startDate, endDate}]) {
    const action = {
        type: ADD_DATE_RANGE,
        payload: {startDate, endDate}
    }
    return action
}

export function deleteDateRange(payload) {
    const action = {
        type: DELETE_DATE_RANGE,
        payload
    }
    return action
}

export function setAndSearch(whatSearch, value, searches) {
    const action = {
        type: SET_AND_SEARCH,
        payload: {[whatSearch]: value, searches}
    }
    return action
}


export function setCategory(value) {
    const action = {type: SET_CATEGORY, payload: value}
    return action
}

export function getLabelsSpec(labels) {
    const action = {type: GET_LABELS_SPEC, payload: labels}
    return action
}

export function setSpecsLabelItem(index, item) {
    const action = {type: SET_SPECS_LABEL_ITEM, payload: {index, item}}
    return action
}

export function addSpecificationItem(value) {
    const action = {
        type: ADD_SPECIFICATION_ITEM,
        payload: value
    }
    return action
}

export function removeSpecificationItem(value) {
    const action = {
        type: REMOVE_SPECIFICATION_ITEM,
        payload: value
    }
    return action
}

export function setSpecificationSearches(searches) {
    const action = {type: SET_SPECIFICATION_SEARCHES, payload: searches}
    return action
}



export function nextLayer() {
    const action = {type: NEXT_LAYER}
    return action
}

export function previousLayer() {
    const action = {type: PREVIOUS_LAYER}
    return action
}

export function setFirstLayer() {
    const action = {type: SET_FIRST_LAYER}
    return action
}

export function setValueLayer(value) {
    const action = {type: SET_VALUE_LAYER, payload: value}
    return action
}






export function addStatusesToSelects(value) {
    const action = {type: ADD_STATUSES_TO_SELECTS, payload: value}
    return action
}
export function removeStatusesFromSelects(value) {
    const action = {type: REMOVE_STATUSES_FROM_SELECTS, payload: value}
    return action
}
export function setStatuses(value) {
    const action = {type: SET_STATUSES, payload: value}
    return action
}

export const getReport = (value) => ({type: GET_REPORT, payload: value})
export const setReportGraphType = (value) => ({type: SET_REPORT_GRAPH_TYPE, payload: value})
export const downloadReport = () => ({type: DOWNLOAD_REPORT})