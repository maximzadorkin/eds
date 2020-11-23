import { ApiSpecs } from '../../Api.js'
import { SPECIFICATION } from '../../constants.js'
import { setSpecificationSearches } from '../actions/actions.js'
import { SET_SPECS_LABEL_ITEM } from '../actions/actionTypes.js'

export const specificationware = store => next => async action => {
    const layer = store.getState().navigation.active
    const state = store.getState()

    if (layer === SPECIFICATION && action.type === SET_SPECS_LABEL_ITEM) {
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
    }

    next(action)
}