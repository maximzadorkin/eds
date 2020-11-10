import { ApiReportTable, ApiSpecs, ApiSpecsLabels, ApiTypes } from '../Api.js'
import { getLabelsSpec, setReport,
    setSpecificationSearches, setStatuses, setValueLayer } from './actions/actions.js'
import { NEXT_LAYER, SET_SPECS_LABEL_ITEM } from './actions/actionTypes.js'
import {
    ADDRESSES,
    CATEGORY, CLASSIFIERS,
    COMPANIES,
    DATE_RANGES,
    LOADING,
    REPORT,
    SPECIFICATION,
    START,
    STATUSES
} from '../constants.js'

export const navigationware = store => next => async action => {
    const layer = store.getState().navigation.active
    const state = store.getState()
    if (action.type === NEXT_LAYER && layer === START) {
        store.dispatch(setValueLayer(LOADING))
        const response = await fetch(ApiTypes(''), {method: 'GET'})
        let statuses = []
        if (response.ok) statuses = await response.json()
        else console.log('Cant download statuses. Error')
        store.dispatch(setStatuses(statuses))
        store.dispatch(setValueLayer(STATUSES))
        return
    }
    if (action.type === NEXT_LAYER && layer === STATUSES) {
        const countOfSelect = state.statuses.selects.length
        if (countOfSelect === 0) return
    }
    if (action.type === NEXT_LAYER && layer === DATE_RANGES) {
        store.dispatch(setValueLayer(LOADING))
        const specs = {}
        switch (state.specification.category) {
            case COMPANIES:
                specs.name = 'Companies'
                break
            case ADDRESSES:
                specs.name = 'Addresses'
                break
            case CLASSIFIERS:
                specs.name = 'Classifiers'
                break
        }
        specs.data = state.specification.items
        const request = {
            Statuses: state.statuses.selects,
            Classifiers: [],
            Companies: [],
            Addresses: [],
            [specs.name]: specs.data,
            Periods: state.dateRanges.map(dr => ({
                from: `${dr.startDate.getDate()}-${dr.startDate.getMonth() + 1}-${dr.startDate.getFullYear()}`,
                to: `${dr.endDate.getDate()}-${dr.endDate.getMonth() + 1}-${dr.endDate.getFullYear()}`,
            }))
        }
        // const response = await fetch(ApiReportTable, {method: 'POST', body: request})
        let data = []
        // if (response.ok) data = await response.json()
        // else console.log('Cant download report. Error')
        store.dispatch(setReport(data))
        store.dispatch(setValueLayer(REPORT))
        return
    }
    next(action)
}

export const specificationware = store => next => async action => {
    const layer = store.getState().navigation.active
    const state = store.getState()

    if (action.type === NEXT_LAYER && layer === CATEGORY) {
        store.dispatch(setValueLayer(LOADING))
        const response = await fetch(ApiSpecsLabels(state.specification.category), {method: 'GET'})
        let labels = []
        if (response.ok) labels = await response.json()
        else console.log('Cant download labels. Error')
        store.dispatch(getLabelsSpec(labels))
        store.dispatch(setValueLayer(SPECIFICATION))
        return
    }

    if (layer === SPECIFICATION && action.type === SET_SPECS_LABEL_ITEM) {
        next(action)
        const index = action.payload.index
        const items = state.specification.parts.map(p => p.item)
        const searchedValue =
            [...items.splice(0, index), action.payload.item].join('-')
        const category = state.specification.category
        const response = await fetch(ApiSpecs(category, searchedValue), {method: 'GET'})
        let searches = []
        if (response.ok) searches = await response.json()
        else console.log('Cant download labels. Error')
        store.dispatch(setSpecificationSearches(searches))
        return
    }

    next(action)
}