import * as TYPES from './types';
export const handleProductObjProperty = (value, key) => (dispatch, getState) => {
    let product = {...getState().productReducer.product}
    product[key] = value
    dispatch({type: TYPES.SET_PRODUCT, payload: product})
};