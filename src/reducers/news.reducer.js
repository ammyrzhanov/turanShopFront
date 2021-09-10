import { newsConstants } from '../constants';

const initialState = [];

export function news(state = initialState, action) {
  switch (action.type) {
    case newsConstants.GET_NEWS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case newsConstants.GET_NEWS_SUCCESS:
      return {
        ...state,
        data: action.news
      }; 
    case newsConstants.GET_NEWS_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}