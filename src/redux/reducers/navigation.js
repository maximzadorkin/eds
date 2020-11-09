import {
    NEXT_LAYER,
    PREVIOUS_LAYER,
    SET_FIRST_LAYER,
    SET_VALUE_LAYER
} from '../actions/actionTypes.js'
import { CATEGORY, DATE_RANGES, REPORT, SPECIFICATION, START, STATUSES } from '../../constants.js'

const initialState = {
    active: START,
    layers: [START, STATUSES, CATEGORY, SPECIFICATION, DATE_RANGES, REPORT]
}

const reducer = (state = initialState, action) => {
    const firstLayerIndex = 0
    switch (action.type) {
        case NEXT_LAYER:
            let nextLayerIndex = state.layers.indexOf(state.active) + 1
            if (nextLayerIndex > state.layers.length - 1) nextLayerIndex = 0
            const nextLayer = state.layers[nextLayerIndex]
            return {...state, active: nextLayer}
        case PREVIOUS_LAYER:
            let previousLayerIndex = state.layers.indexOf(state.active) - 1
            if (previousLayerIndex < firstLayerIndex) previousLayerIndex = 0
            const previousLayer = state.layers[previousLayerIndex]
            return {...state, active: previousLayer}
        case SET_FIRST_LAYER:
            return {...state, active: state.layers[firstLayerIndex]}
        case SET_VALUE_LAYER:
            return {...state, active: action.payload}
        default:
            return state
    }
}

export default reducer