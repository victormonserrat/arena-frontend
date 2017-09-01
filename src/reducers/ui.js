import { combineReducers } from 'redux';

import * as constants from '../actions/ui/constants';

function drawer(state = false, action) {
    switch(action.type) {
        case constants.SHOW_DRAWER:
            return true;
        case constants.HIDE_DRAWER:
            return false;
        default:
            return state;
    }
}

function loginDialog(state = false, action) {
    switch(action.type) {
        case constants.SHOW_LOGIN:
            return true;
        case constants.HIDE_LOGIN:
            return false;
        default:
            return state;
    }
}

const uiReducer = combineReducers({
    drawer,
    loginDialog,
});

export default uiReducer;
