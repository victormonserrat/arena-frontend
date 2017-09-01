import { combineReducers } from 'redux';
import * as constants from '../actions/activities/constants';

function isLoading(state = true, action) {
    switch (action.type) {
        case constants.RETRIEVE_ACTIVITIES:
            return false;
        default:
            return state;
    }
}

function activities(state = [], action) {
    switch (action.type) {
        case constants.RETRIEVE_ACTIVITIES:
            return action.activities;
        default:
            return state;
    }
}

const activitiesReducer = combineReducers({
    isLoading,
    activities,
});

export default activitiesReducer;
