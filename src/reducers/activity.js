import { combineReducers } from 'redux';
import * as constants from '../actions/activity/constants';

function isLoading(state = true, action) {
    switch (action.type) {
        case constants.RETRIEVE_ACTIVITY:
            return false;
        default:
            return state;
    }
}

function activity(state = {}, action) {
    switch (action.type) {
        case constants.RETRIEVE_ACTIVITY:
            return action.activity;
        default:
            return state;
    }
}

function usersLoading(state = true, action) {
    switch (action.type) {
        case constants.RETRIEVE_USERS:
            return false;
        default:
            return state;
    }
}

function users(state = {}, action) {
    switch (action.type) {
        case constants.RETRIEVE_USERS:
            return action.users;
        default:
            return state;
    }
}

const activityReducer = combineReducers({
    isLoading,
    activity,
    usersLoading,
    users,
});

export default activityReducer;
