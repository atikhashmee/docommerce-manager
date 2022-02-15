import * as TYPES from '../actions/types';

const initialState ={
    products: [],
    draft_products: [],
    product: {...TYPES.PRODUCT_OBJ}
}

const productReducer = (state=initialState, action) => {
    switch(action.type) {
        case TYPES.SET_PRODUCT:
            return {
                ...state, 
                product: {...action.payload}
            };
        case TYPES.SET_DRAFTS:
            return {
                ...state, 
                draft_products: [...action.payload]
            };
        case TYPES.RESET_STATE:
            return initialState;
        default:
            return state;
    }
}

export default productReducer;