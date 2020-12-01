import {ApiReport, ApiReportXls, ApiStatistic} from '../Api'
import {setValueLayer} from './actions/actions'
import {ERROR} from '../constants'

export const downloadTable = async (store, requestBody) => {
    const state = store.getState()
    let responseData
    let request = {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(requestBody)
    }
    let response
    try {
        response = await fetch(ApiReport(), request)
        responseData = await response.json()
    } catch (e) {
        console.log('Cant download report. Error')
        store.dispatch(setValueLayer(ERROR))
        return []
    }
    return responseData
}


export const downloadChartPoints = async (store, requestBody) => {
    const state = store.getState()
    let responseData
    const rState = state.report
    const activeChartIndex = rState.chartTypes
        .map(c => c.name).indexOf(rState.chartType.name)
    const response = await fetch(ApiStatistic(activeChartIndex + 1, 'ЖЕУ-2', 'все'))
    if (response.ok) responseData = await response.json()
    else {
        console.log('Cant download report. Error')
        store.dispatch(setValueLayer(ERROR))
    }
    return responseData
}


export const downloadXlsLink = async (store, requestBody) => {
    const paramsRequest = {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(requestBody)
    }
    const nameOfReport = 'Report'
    let response
    let blob
    try {
        response = await fetch(ApiReportXls(nameOfReport), paramsRequest)
        blob = await response.blob()
    } catch (e) {
        console.log('Cant download report link. Error')
        store.dispatch(setValueLayer(ERROR))
        return []
    }
    const file = {
        blob,
        url: window.URL.createObjectURL(blob),
        name: 'Отчет.xlsx'
    }

    console.log(file)
    return file
}