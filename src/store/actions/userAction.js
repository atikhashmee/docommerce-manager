import AsyncStorage from '@react-native-async-storage/async-storage';
import * as TYPES from './types';
import APIKit, {setClientToken} from '../../config/axios';
import {logError, LogRejectedMessage, logResponse} from '@/helpers';
import FCMService from '@/services/FCMService';
import profile from '../../../data/profile';

/*
 | ====================================================================================
 | User State Actions Started
 | ====================================================================================
*/
export const login = (obj) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        const fcm_token = await FCMService.getToken();
        // const formData = new FormData();
        // formData.append("email", obj.email);
        // formData.append("password", obj.password);

        // const _this = this;
        // fetch(Api.fileStore, {
        //     method: 'POST',
        //     headers: {
		// 		'Content-Type': 'multipart/form-data',
        //         Accept: 'application/json',
        //         Authorization: `Bearer ${_this.state.token}`,
        //     },
        //     body: formData,
        // }).then((response) => response.json()).then((res) => {
        //     _this.setState({ spinner: false });

        //     if (res.success) {
        //         _this.getData();
        //         _this.setState({upload_file: null});
        //         _this.setState({note: ''});
        //     }
            
        //     _this.setState({ message: res.message });
        //     _this.setState({ showAlert: true });
        // }).catch(function(error) {
        //     _this.setState({ spinner: false });
        //     _this.setState({ message: error.message });
        //     _this.setState({ showAlert: true });
        // });
        APIKit.post('/auth/login', {email: "iffatalrokib639@gmail.com", password: "12345678"})
            .then((response) => {
                console.log('success: ', response);
                //logResponse(response);
            })
            .catch((error) => {
                console.log('error: ', error, obj);
                logError(error);
            });
        // setTimeout(() => {
        //     try {
        //         dispatch(setToken(fcm_token));
        //         dispatch(signInActions());
        //         resolve(profile);
        //     } catch (error) {
        //         reject(error);
        //     }
        // }, 1000);
    });
};

export const logout = () => (dispatch) => {
    AsyncStorage.removeItem('token');
    dispatch(resetState());
    dispatch(signOutActions());
};

export const resetState = () => (dispatch) => {
    dispatch({type: TYPES.RESET_STATE});
    // APIKit.post('/logout').then((response) => logResponse(response));
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
        setTimeout(() => {
            try {
                dispatch(setAuthUser(profile));
                resolve(profile);
            } catch (error) {
                reject(error);
            }
        }, 1000);
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
