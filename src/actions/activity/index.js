import * as constants from './constants';

export const retrieveActivity = activity => ({
    type: constants.RETRIEVE_ACTIVITY,
    activity,
});

export const retrieveUsers = users => ({
   type: constants.RETRIEVE_USERS,
   users,
});