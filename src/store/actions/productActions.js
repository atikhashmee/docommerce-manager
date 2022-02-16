import * as TYPES from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStorage from '@/core/session/AuthStorage';
import * as RootNavigation from '@/navigations/RootNavigation';
import {CommonActions} from '@react-navigation/native';
import APIKit from '../../config/axios';


export const handleProductObjProperty = (value, key, callba = null) => (dispatch, getState) => {
    let product = {...getState().productReducer.product}
    product[key] = value
    dispatch({type: TYPES.SET_PRODUCT, payload: product})
};



export const saveToDraft = () => (dispatch, getState) => {
    let product = {...getState().productReducer.product}
    //minimum validation for not storing garbage in the storage
    if (product.name === "") {
        console.log('draft can not be saved with field empty')
    }
    AuthStorage.get('drafts').then(draftItems => {
        let draft_items = [];
        if (draftItems) {
            draft_items = [...JSON.parse(draftItems)]
        }
        draft_items.push({draft_id: Date.now(), draft_item: product});
        //store drafts item to redux
        dispatch({type: TYPES.SET_DRAFTS, payload: draft_items})
        //store to storage
        AsyncStorage.setItem('drafts', JSON.stringify(draft_items));
    })
    
    //reset state product variable after draft
    dispatch({type: TYPES.SET_PRODUCT, payload: TYPES.PRODUCT_OBJ})
    RootNavigation.navigateRoute({
        'name' : 'HomeScreenStack',
        'params': {
            'screen' : 'ProductCreateScreen',
            'params' : {
                'screen' : 'Products',
                'params' : {
                    'screen' : 'Drafts',
                },
            },
        },
      });
};


export const removeDraft = (item_id) => (dispatch, getState) => {
    AuthStorage.get('drafts').then(draftItems => {
        let draft_items = [];
        if (draftItems) {
            draft_items = [...JSON.parse(draftItems)]
        }
        if (draft_items.length > 0) {
            draft_items = draft_items.filter(item => item.draft_id !==  item_id)
            dispatch({type: TYPES.SET_DRAFTS, payload: draft_items})
            AsyncStorage.setItem('drafts', JSON.stringify(draft_items));
        }
    })
};


export const createOrEdit = ({modify_type, modify_source, modify_item}) => (dispatch, getState) => {
    if (modify_type === "edit" && modify_source === "draft") {
        dispatch({type: TYPES.SET_PRODUCT, payload: modify_item})
    }
};


export const setDraftItems = (items) => (dispatch, getState) => {
    dispatch({type: TYPES.SET_DRAFTS, payload: items})
};

export const cancelOrDiscard = (items) => (dispatch, getState) => {
    //reset state product variable after draft
    dispatch({type: TYPES.SET_PRODUCT, payload: TYPES.PRODUCT_OBJ})
    dispatch({type: TYPES.SET_PRODUCT_VALIDATION_ERRORS, payload: {}})
    RootNavigation.navigateRoute({
        'name' : 'HomeScreenStack',
        'params': {
            'screen' : 'ProductCreateScreen',
            'params' : {
                'screen' : 'Products',
                'params' : {
                    'screen' : 'Lists',
                },
            },
        },
      });
};

export const saveToServer = (user) => (dispatch, getState) => {
    let product = {...getState().productReducer.product}
    return new Promise((resolve, reject) => {
        APIKit.post('/api/products/store', product)
        .then((response) => {
            let responsedata = response.data;
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        });
    });
};



export const setValidationErrors = (errors) => (dispatch, getState) => {
    dispatch({type: TYPES.SET_PRODUCT_VALIDATION_ERRORS, payload: errors})
};
export const filterError = (key_name) => (dispatch, getState) => {
    let errors = {...getState().productReducer.errors}
    return errors[key_name]
};

