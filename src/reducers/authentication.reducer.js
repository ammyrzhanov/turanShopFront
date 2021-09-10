import { userConstants } from '../constants';

let token = JSON.parse(localStorage.getItem('user'));
const initialState = token ? { loggedIn: true, token } : {};

export function user(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingInLoad: true
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        token: action.user.token,
        data: action.user.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    case userConstants.GET_USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GET_USER_SUCCESS:
      return {
        ...state,
        data: action.user
      };
    case userConstants.GET_USER_FAILURE:
      return {
        error: action.error
      };
    case userConstants.UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.UPDATE_USER_SUCCESS:
      return {
        ...state,
        data: action.user
      };
    case userConstants.UPDATE_USER_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}