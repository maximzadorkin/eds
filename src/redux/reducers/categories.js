import { ADDRESSES, CLASSIFIERS, COMPANIES } from '../../constants.js'
import { ADD_CATEGORY_ITEM, REMOVE_CATEGORY_ITEM,
    SET_CATEGORY_SEARCHES, SET_CATEGORY_SUB_ITEM } from '../actions/actionTypes.js'


const initialState = {
    [COMPANIES]: {
        steps: [{label: 'Компании', item: ''}],
        items: []
    },
    [ADDRESSES]: {
        steps: [
            {label: 'Выбрасть область', item: ''},
            {label: 'Выбрать г.о.', item: ''},
            {label: 'Выбрать город', item: ''},
            {label: 'Выбрать улицу', item: ''}
        ],
        items: []
    },
    [CLASSIFIERS]: {
        steps: [
            {label: 'Классификаторы'}
        ],
        items: []
    },
    searches: []
}

const reducer = (state = initialState, action) => {
    const activeLayer = action.activeLayer
    let steps
    let newState
    let items
    let item
    switch (action.type) {
        case SET_CATEGORY_SUB_ITEM:
            const indexUpdate = action.payload.index
            item = action.payload.item
            const filter = (step, ind) => {
                if (ind === indexUpdate) return {...step, item}
                if (ind > indexUpdate) return {...step, item: ''}
                return step
            }
            steps = state[activeLayer].steps.map(filter)
            return {
                ...state,
                [activeLayer]: { ...state[activeLayer], steps }
            }
        case ADD_CATEGORY_ITEM:
            const activeCat = state[activeLayer]
            item = activeCat.steps.map(l => l.item).join(', ')
            const alreadyHave = activeCat.items.includes(item)
            const isEmpty = activeCat.steps.map(l => l.item).join('').trim() === ''
            if (isEmpty) {
                alert('Вы не указали элемент')
                newState = {...state}
            } else if (alreadyHave) {
                alert('Уже есть в списке')
                newState = {...state}
            } else {
                newState = {
                    ...state,
                    [activeLayer]: {
                        steps: activeCat.steps
                            .map(p => ({label: p.label, item: ''})),
                        items: [...activeCat.items, item]
                    }
                }
            }
            return newState
        case REMOVE_CATEGORY_ITEM:
            items = state[activeLayer].items
            const removeItemIndex = items.indexOf(action.payload)
            items.splice(removeItemIndex, 1)
            return {
                ...state, [activeLayer]: {
                    ...state[activeLayer], items: [...items]
                }
            }
        case SET_CATEGORY_SEARCHES:
            return {...state, searches: action.payload}
        default:
            return state
    }
}

export default reducer