import { combineReducers } from 'redux';
import * as constants from '../actions/auth/constants';

function me(state = null, action) {
    switch (action.type) {
        case constants.RETRIEVE_ME:
            return action.me;
        default:
            return state;
    }
}

function isLogging(state = false, action) {
    switch (action.type) {
        case constants.LOGIN:
            return true;
        case constants.RETRIEVE_ME:
            return false;
        default:
            return state;
    }
}

const authReducer = combineReducers({
    me,
    isLogging,
});

export default authReducer;