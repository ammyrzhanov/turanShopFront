import { alertConstants } from '../constants';

export const alertActions = {
    success,
    error,
    warn,
    clear
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function warn(message) {
    return { type: alertConstants.WARN, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}