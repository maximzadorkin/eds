import _ from 'lodash'
import { GET_REPORT } from '../actions/actionTypes.js'

const initialState = {
    comp_table: [],
    orders_table: [],
    graph: [],
    layers: [],
    types: ['Динамика', 'Классификаторы за период', 'Компании по классификаторам'],
    activeType: 0
}

const reducer = (state = initialState, action) => {
    let newState
    const value = action.payload
    switch (action.type) {
        case GET_REPORT:
            const comp_table = []
            const orders_table = []
            const graph = []
            const layers = _.uniq(graph.map(g => ({text: g.ZLabel, checked: false})))
            newState = {...state, layers, comp_table, orders_table, graph}
            return newState
        default:
            return state
    }
}

export default reducer