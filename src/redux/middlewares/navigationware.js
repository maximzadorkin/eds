import { ApiReport, ApiSpecsLabels, ApiStatistic, ApiTypes } from '../../Api.js'
import {
    setCategorySearches,
    setReport,
    setReportStatisticLists,
    setStatuses,
    setValueLayer
} from '../actions/actions.js'
import { NEXT_LAYER } from '../actions/actionTypes.js'
import { ADDRESSES, CLASSIFIERS, COMPANIES, DATE_RANGES, LOADING, REPORT, START, STATUSES} from '../../constants.js'
import {ApiReportXls} from '../../Api'

const downloadTable = async (state, requestBody) => {
    let responseData
    let request = {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(requestBody)
    }
    const response = await fetch(ApiReport(), request)
    if (response.ok) responseData = await response.json()
    else console.log('Cant download report. Error')

    return responseData
}
const downloadChartPoints = async state => {
    let responseData
    const rState = state.report
    const activeChartIndex = rState.chartTypes
        .map(c => c.name).indexOf(rState.chartType.name)
    const response = await fetch(ApiStatistic(activeChartIndex + 1, 'ЖЕУ-2', 'все'))
    if (response.ok) responseData = await response.json()
    else console.log('Cant download report. Error')
    return responseData
}
const downloadXlsLink = async (state, requestBody) => {
    let linkForDownload = []
    const paramsRequest = {method: 'POST', body: JSON.stringify(requestBody)}
    // const response = await fetch(ApiReportXls, paramsRequest)
    // const response = await fetch('https://dev.dcorpse.keenetic.pro/api/eds/test', paramsRequest)
    // if (response.ok) linkForDownload = await response.json()
    // else console.log('Cant download report link. Error')
    // return 'https://dev.dcorpse.keenetic.pro/api/eds/test'
}

const fromStartLayer = async (store) => {
    store.dispatch(setValueLayer(LOADING))

    let statuses = []
    const response = await fetch(ApiTypes(''), {method: 'GET'})
    if (response.ok) statuses = await response.json()
    else console.log('Cant download statuses. Error')

    store.dispatch(setStatuses(statuses))
    store.dispatch(setValueLayer(STATUSES))
}

const toReportLayer = async (store, state) => {
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
    console.log(requestBody)

    // download table
    const table = await downloadTable(state, requestBody)

    // console.log(table)
    // download chart points
    // const points = await downloadChartPoints(state, )
    // console.log(points)
    // download url for xls
    // const xlsLink = await downloadXlsLink(state, requestBody)
    // console.log(xlsLink)

    let data = {
        statistic: {
            list1: state.categories[COMPANIES].items,
            list2: state.categories[CLASSIFIERS].items
        },
        table,
        // url: xlsLink
    }

    // data.url = linkForDownload
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
            fromStartLayer(store).finally()
            break
        case STATUSES:
            const countOfSelect = state.statuses.selects.length
            const minSelects = 1
            if (countOfSelect >= minSelects) next(action)
            break
        case DATE_RANGES:
            toReportLayer(store, state).finally()
            break
        default:
            next(action)
    }
}