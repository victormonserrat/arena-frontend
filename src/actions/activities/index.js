import * as constants from './constants';

export const retrieveActivities = activities => ({
    type: constants.RETRIEVE_ACTIVITIES,
    activities,
});