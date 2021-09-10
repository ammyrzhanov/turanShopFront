import { historyConstants } from '../constants';
import { apiService } from '../services';
import { alertActions } from '.';

export const historyActions = {
    getHistory
};

function getHistory() {
    return dispatch => {
        dispatch(request());

        apiService.getHistory()
            .then(
                data => dispatch(success(data)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: historyConstants.GET_HISTORY_REQUEST } }
    function success(history) { return { type: historyConstants.GET_HISTORY_SUCCESS, history } }
    function failure(error) { return { type: historyConstants.GET_HISTORY_FAILURE, error } }
}