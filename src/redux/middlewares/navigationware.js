import { ApiSpecsLabels, ApiStatistic, ApiTypes } from '../../Api.js'
import {getLabelsSpec, setReport,setReportStatisticLists, setStatuses, setValueLayer} from '../actions/actions.js'
import { NEXT_LAYER } from '../actions/actionTypes.js'
import {CATEGORY, DATE_RANGES, LOADING, mapCategoryToProperty, REPORT, SPECIFICATION, START, STATUSES} from '../../constants.js'
import {ApiReportXls} from '../../Api'


const fromStartLayer = async (store, state) => {
    store.dispatch(setValueLayer(LOADING))

    let statuses = []
    const response = await fetch(ApiTypes(''), {method: 'GET'})
    if (response.ok) statuses = await response.json()
    else console.log('Cant download statuses. Error')

    store.dispatch(setStatuses(statuses))
    store.dispatch(setValueLayer(STATUSES))
}

const fromCategory = async (store, state) => {
    store.dispatch(setValueLayer(LOADING))

    let labels = []
    const response = await fetch(ApiSpecsLabels(state.specification.category), {method: 'GET'})
    if (response.ok) labels = await response.json()
    else console.log('Cant download labels. Error')

    store.dispatch(getLabelsSpec(labels))
    store.dispatch(setValueLayer(SPECIFICATION))
}

const toReportLayer = async (store, state) => {
    const countOfDatesRanges = state.dateRanges.length
    const haveRanges = countOfDatesRanges > 0
    if (!haveRanges) {
        alert('Вы не выбрали период')
        return
    }

    store.dispatch(setValueLayer(LOADING))

    // скачиваем статистику
    const getCurrentNumFormat = (num, count) => {
        const length = count - String(num).length
        return length > 0
            ? '0'.repeat(length) + num
            : num
    }
    const getCurrentDateFormat = (date) =>
        `${getCurrentNumFormat(date.getFullYear(), 4)}-` +
        `${getCurrentNumFormat(date.getMonth() + 1, 2)}-` +
        `${getCurrentNumFormat(date.getDate(), 2)}`

    const specs = {
        name: mapCategoryToProperty(state.specification.category),
        data: state.specification.items
    }
    const request = {
        Statuses: state.statuses.selects,
        [specs.name]: specs.data,
        Periods: state.dateRanges.map(dr => ({
            From: `${getCurrentDateFormat(dr.startDate)}`,
            To: `${getCurrentDateFormat(dr.endDate)}`,
        }))
    }
    let paramsRequest = {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(request)
    }

    const rState = state.report
    let data = []
    const activeChartIndex = rState.chartTypes.indexOf(rState.chartType)
    // let response = await fetch(ApiStatistic(activeChartIndex + 1, 'ЖЕУ-2', 'все'), paramsRequest)
    // if (response.ok) data = await response.json()
    // else console.log('Cant download report. Error')

    // получаем ссылку на скачивание
    let linkForDownload = []
    // paramsRequest = {method: 'POST', body: JSON.stringify(data)}
    // let response = await fetch(ApiReportXls, paramsRequest)
    // if (response.ok) linkForDownload = await response.json()
    // else console.log('Cant download report link. Error')

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

    switch (layer) {
        case START:
            fromStartLayer(store, state).finally()
            break
        case STATUSES:
            const countOfSelect = state.statuses.selects.length
            const minSelects = 1
            if (countOfSelect >= minSelects) next(action)
            break
        case CATEGORY:
            fromCategory(store, state).finally()
            break
        case DATE_RANGES:
            toReportLayer(store, state).finally()
            break
        default:
            next(action)
    }
}