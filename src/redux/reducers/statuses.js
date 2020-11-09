import {
    ADD_STATUSES_TO_SELECTS, REMOVE_STATUSES_FROM_SELECTS,
    SET_STATUSES
} from '../actions/actionTypes.js'

const initialState = {
    selects: [],
    statuses: []
}

const reducer = (state = initialState, action) => {
    let value = action.payload
    let newState
    switch (action.type) {
        case ADD_STATUSES_TO_SELECTS:
            newState = {...state, selects: [...state.selects, ...value].sort()}
            return newState
        case REMOVE_STATUSES_FROM_SELECTS:
            const selects = state.selects.filter(s => !value.includes(s))
            newState = {...state, selects}
            return newState
        case SET_STATUSES:
            newState = {...state, statuses: value.filter(s => s !== 'Все')}
            return newState
        default:
            return state
    }
}

export default reducer