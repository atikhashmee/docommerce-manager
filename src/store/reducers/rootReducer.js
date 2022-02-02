import {combineReducers} from 'redux';
import userReducer from './userReducer';
import snackbarReducer from './snackbarReducer';
import productReducer from './productReducer';

const rootReducer = combineReducers({
    snackbarReducer,
    userReducer,
    productReducer,
});

export default rootReducer;
