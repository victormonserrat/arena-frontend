import { combineReducers } from 'redux';
import * as constants from '../actions/activityForm/constants';

function sport(state = null, action) {
    switch (action.type) {
        case constants.UPDATE_SPORT:
            return action.sport;
        default:
            return state;
    }
}

function startDate(state = null, action) {
    switch (action.type) {
        case constants.UPDATE_START_DATE:
            return action.startDate;
        default:
            return state;
    }
}

function startTime(state = null, action) {
    switch (action.type) {
        case constants.UPDATE_START_TIME:
            return action.startTime;
        default:
            return state;
    }
}

function duration(state = null, action) {
    switch (action.type) {
        case constants.UPDATE_DURATION:
            return action.duration;
        default:
            return state;
    }
}

function title(state = null, action) {
    switch (action.type) {
        case constants.UPDATE_TITLE:
            return action.title;
        default:
            return state;
    }
}

function description(state = null, action) {
    switch (action.type) {
        case constants.UPDATE_DESCRIPTION:
            return action.description;
        default:
            return state;
    }
}

function location(state = null, action) {
    switch (action.type) {
        case constants.UPDATE_LOCATION:
            return action.location;
        default:
            return state;
    }
}

function seats(state = null, action) {
    switch (action.type) {
        case constants.UPDATE_SEATS:
            return action.seats;
        default:
            return state;
    }
}

function isRedirectable(state = false, action) {
    switch (action.type) {
        case constants.REDIRECT:
            return true;
        default:
            return state;
    }
}

const activityFormReducer = combineReducers({
    sport,
    startDate,
    startTime,
    duration,
    title,
    description,
    location,
    seats,
    isRedirectable,
});

export default activityFormReducer;
