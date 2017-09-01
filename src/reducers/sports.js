import { combineReducers } from 'redux';
import * as constants from '../actions/sports/constants';

function isLoading(state = true, action) {
    switch (action.type) {
        case constants.FETCH_SPORTS:
            return true;
        case constants.RETRIEVE_SPORTS:
            return false;
        default:
            return state;
    }
}

function sports(state = [], action) {
    switch (action.type) {
        case constants.RETRIEVE_SPORTS:
            return action.sports;
        default:
            return state;
    }
}

const sportsReducer = combineReducers({
    isLoading,
    sports,
});

export default sportsReducer;
