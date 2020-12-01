import { ApiReport, ApiSpecsLabels, ApiStatistic, ApiTypes } from '../../Api.js'
import {
    setCategorySearches,
    setReport,
    setReportStatisticLists,
    setStatuses,
    setValueLayer
} from '../actions/actions.js'
import { NEXT_LAYER } from '../actions/actionTypes.js'
import {
    ADDRESSES,
    CLASSIFIERS,
    COMPANIES,
    DATE_RANGES, ERROR,
    LOADING,
    REPORT,
    START,
    STATUSES
} from '../../constants.js'
import {downloadTable, downloadXlsLink} from '../downloaderReport'



const beforeStatusesLayer = async (store) => {
    store.dispatch(setValueLayer(LOADING))

    let statuses = []
    let response
    try {
        response = await fetch(ApiTypes(''), {method: 'GET'})
        statuses = await response.json()
    } catch (e) {
        console.log('Cant download statuses. Error')
        store.dispatch(setValueLayer(ERROR))
        return
    }
    store.dispatch(setStatuses(statuses))
    store.dispatch(setValueLayer(STATUSES))
}

const beforeReportLayer = async (store, state) => {
    const countOfDatesRanges = state.dateRanges.length
    const haveRanges = countOfDatesRanges > 0
    if (!haveRanges) {
        alert('Вы не выбрали период')
        return
    }

    store.dispatch(setValueLayer(LOADING))

    const requestBody = {
        Statuses: state.statuses.selects,
        Companies: state.categories[COMPANIES].items,
        Classifiers: state.categories[CLASSIFIERS].items,
        Addresses: state.categories[ADDRESSES].items,
        Periods: state.dateRanges.map(dr => ({
            From: `${dr.startDate.toLocaleDateString().split('.').reverse().join('-')}`,
            To: `${dr.endDate.toLocaleDateString().split('.').reverse().join('-')}`,
        }))
    }
    const table = await downloadTable(store, requestBody)
    const file = await downloadXlsLink(store, requestBody)
    // const points = await downloadChartPoints(store, requestBody)

    let data = {
        statistic: {
            list1: state.categories[COMPANIES].items,
            list2: state.categories[CLASSIFIERS].items
        },
        table,
        file
    }

    store.dispatch(setReportStatisticLists(data))
    store.dispatch(setReport(data))
    store.dispatch(setValueLayer(REPORT))
}

export const navigationware = store => next => action => {
    const layer = store.getState().navigation.active
    const state = store.getState()

    const isNavigation = action.type === NEXT_LAYER

    if (!isNavigation) {
        next(action)
        return
    }

    store.dispatch(setCategorySearches([]))

    switch (layer) {
        case START:
            beforeStatusesLayer(store).finally()
            break
        case STATUSES:
            const countOfSelect = state.statuses.selects.length
            const minSelects = 1
            if (countOfSelect >= minSelects) next(action)
            break
        case DATE_RANGES:
            beforeReportLayer(store, state).finally()
            break
        default:
            next(action)
    }
}