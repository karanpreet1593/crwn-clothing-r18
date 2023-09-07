import { CATEGORIES_ACTION_TYPES } from "./category.types"
const CATEGORIES_INITIAL_STATE = {
    categoriesArray: []
}

export const categoryReducer = (state = CATEGORIES_INITIAL_STATE, action) => {
    const {type, payload} = action

    switch(type) {
        case(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_ARRAY) :
            return {
                ...state,
                categoriesArray: payload
            }
        default:
           return state
    }
}