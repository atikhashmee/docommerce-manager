import * as TYPES from '../actions/types';

const initialState ={
    products: [],
    product: {...TYPES.PRODUCT_OBJ}
}

const productReducer = (state=initialState, action) => {
    switch(action.type) {
        case TYPES.SET_PRODUCT:
            return {
                ...state, 
                product: {...action.payload}
            };
        case TYPES.RESET_STATE:
            return initialState;
        default:
            return state;
    }
}

export default productReducer;