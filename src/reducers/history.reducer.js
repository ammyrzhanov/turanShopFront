import { historyConstants } from '../constants';

const initialState = [];

export function history(state = initialState, action) {
  switch (action.type) {
    case historyConstants.GET_HISTORY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case historyConstants.GET_HISTORY_SUCCESS:
      return {
        ...state,
        data: action.history
      }; 
    case historyConstants.GET_HISTORY_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}