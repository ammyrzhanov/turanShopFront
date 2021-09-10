import { newsConstants } from '../constants';
import { apiService } from '../services';
import { alertActions } from '.';

export const newsActions = {
    getNews
};

function getNews() {
    return dispatch => {
        dispatch(request());

        apiService.getNews()
            .then(
                data => dispatch(success(data.results)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: newsConstants.GET_NEWS_REQUEST } }
    function success(news) { return { type: newsConstants.GET_NEWS_SUCCESS, news } }
    function failure(error) { return { type: newsConstants.GET_NEWS_FAILURE, error } }
}