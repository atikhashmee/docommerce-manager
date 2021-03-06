import AsyncStorage from '@react-native-async-storage/async-storage';
import * as TYPES from './types';
import APIKit, {setClientToken} from '../../config/axios';
import {logError, LogRejectedMessage, logResponse} from '@/helpers';
import FCMService from '@/services/FCMService';
import profile from '../../../data/profile';
import {ToastAndroid} from 'react-native'

/*
 | ====================================================================================
 | User State Actions Started
 | ====================================================================================
*/
export const login = (obj) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        const fcm_token = await FCMService.getToken();
        APIKit.post('/auth/login', obj)
            .then((response) => {
                let responsedata = response.data;
                let user_token = responsedata.access_token;
                dispatch(setToken(user_token));
                dispatch(signInActions());
                resolve(response);
            })
            .catch((error) => {
                let error_status = error.response.status;
                let error_data = error.response.data;
                if (error_status === 422) {
                    for (const err in error_data) {
                        ToastAndroid.show(errors[err][0], ToastAndroid.SHORT);
                    }
                } else if (error_status === 401) {
                    ToastAndroid.show(error_data.error, ToastAndroid.SHORT);
                }
                reject(error);
                //logError(error);
            });
    });
};

export const logout = () => (dispatch) => {
    AsyncStorage.removeItem('token');
    dispatch(resetState());
    dispatch(signOutActions());
};

export const resetState = () => (dispatch) => {
    dispatch({type: TYPES.RESET_STATE});
    APIKit.post('/api/logout').then((response) => logResponse(response));
};

export const setToken = (token) => (dispatch, getState) => {
    if (token) {
        AsyncStorage.setItem('token', token);
    } else {
        dispatch(logout());
    }
    dispatch({type: TYPES.SET_TOKEN, payload: token});
    setClientToken(token);
};

export const loadProfile = () => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        APIKit.post('/api/me')
        .then((response) => {
            dispatch(setAuthUser(response.data));
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        });
    });
};

export const updateProfile = (user) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        APIKit.put('/profile/' + getState().userReducer.authUser.id, user)
            .then((response) => {
                logResponse(response);
                if (response.data.success) {
                    dispatch(setAuthUser(response.data.data));
                }
                resolve(response.data);
            })
            .catch((error) => {
                logError(error);
                reject(error);
            });
    });
};

export const setAuthUser = (user) => (dispatch, getState) => {
    dispatch({type: TYPES.SET_USER, payload: user});
};
/*
 | ====================================================================================
 | User State Actions End
 | ====================================================================================
*/

/*
 | ====================================================================================
 | Auth Actions Started
 | ====================================================================================
*/
export const signInActions = () => async (dispatch, getState) => {
    const token = getState().userReducer.token;
    if (token) {
        await dispatch(loadProfile());
        // await dispatch(setProfile()).catch(LogRejectedMessage);
    }
};

export const signOutActions = () => (dispatch) => {
    setClientToken(null);
};

export const setProfile = () => (dispatch, getState) => {
    const token = getState().userReducer.token;
    if (!token) {
        return;
    }
    APIKit.get('/me')
        .then((response) => {
            if (response.data.success) {
                dispatch({type: TYPES.SET_USER, payload: response.data.data});
                dispatch({
                    type: TYPES.SET_WALLET,
                    payload: response.data.wallet,
                });
                AsyncStorage.setItem('authUser', JSON.stringify(response.data.data));
                AsyncStorage.setItem('authUserWallet', JSON.stringify(response.data.wallet));
            }
        })
        .catch((error) => {
            logError(error);
        });
};
/*
 | ====================================================================================
 | Auth Actions End
 | ====================================================================================
*/
