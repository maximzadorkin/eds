import { ADDRESSES, CLASSIFIERS, COMPANIES } from '../../constants.js'
import {
    ADD_SPECIFICATION_ITEM,
    GET_LABELS_SPEC, REMOVE_SPECIFICATION_ITEM, SET_CATEGORY, SET_SPECIFICATION_SEARCHES,
    SET_SPECS_LABEL_ITEM
} from '../actions/actionTypes.js'



const initialState = {
    category: COMPANIES,
    categories: [COMPANIES, ADDRESSES, CLASSIFIERS],
    parts: [{label: '', item: ''}],
    items: [],
    searches: []
}

const reducer = (state = initialState, action) => {
    let parts
    let newState
    let items
    let item
    switch (action.type) {
        case GET_LABELS_SPEC:
            const stateParts = state.parts.map(p => p.label)
            const isEqual = action.payload.join('') === stateParts.join('')
            parts = action.payload.map(p => ({label: p, item: ''}))
            if (isEqual) newState = {...state}
            else newState = {...state, parts, items: [], searches: []}
            return newState
        case SET_SPECS_LABEL_ITEM:
            const indexUpdate = action.payload.index
            item = action.payload.item
            const filter = (part, ind) => {
                if (ind === indexUpdate) return {...part, item}
                if (ind > indexUpdate) return {...part, item: ''}
                return part
            }
            parts = state.parts.map(filter)
            return {...state, parts}
        case ADD_SPECIFICATION_ITEM:
            item = state.parts.map(l => l.item).join(', ')
            const alreadyHave = state.items.includes(item)
            const isEmpty = state.parts.map(l => l.item).join('').trim() === ''
            if (isEmpty) {
                alert('Вы не указали элемент')
                newState = {...state}
            } else if (alreadyHave) {
                alert('Уже есть в списке')
                newState = {...state}
            } else {
                newState = {
                    ...state,
                    parts: state.parts
                        .map(p => ({label: p.label, item: ''})),
                    items: [...state.items, item]
                }
            }
            return newState
        case REMOVE_SPECIFICATION_ITEM:
            items = state.items
            const removeItemIndex = items.indexOf(action.payload)
            items.splice(removeItemIndex, 1)
            return {...state, items: [...items]}
        case SET_SPECIFICATION_SEARCHES:
            return {...state, searches: action.payload}
        case SET_CATEGORY:
            return {...state, category: action.payload}
        default:
            return state
    }
}

export default reducer