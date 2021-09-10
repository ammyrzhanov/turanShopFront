import { userConstants } from '../constants';
import { apiService } from '../services';
import { alertActions } from '.';
import { history } from '../helpers';
import { newsActions } from './news.actions';

export const userActions = {
    login,
    logout,
    getProfile,
    updateUser
};


function login(login, password, from) {
    return dispatch => {
        dispatch(request({ login }));

        apiService.login(login, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push(from);
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.LOGIN_REQUEST } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    apiService.logout();
    return { type: userConstants.LOGOUT };
}

function getProfile() {
    return dispatch => {
        dispatch(request());

        apiService.getProfile()
            .then(
                user => {
                    dispatch(success(user))
                    dispatch(newsActions.getNews())
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.GET_USER_REQUEST } }
    function success(user) { return { type: userConstants.GET_USER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GET_USER_FAILURE, error } }
}

function updateUser(user) {
    return dispatch => {
        dispatch(request());

        apiService.updateUser(user, user.id)
            .then(
                user => {
                    dispatch(success(user))
                    dispatch(userActions.getProfile())
                    
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.UPDATE_USER_REQUEST } }
    function success(user) { return { type: userConstants.UPDATE_USER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.UPDATE_USER_FAILURE, error } }
}