import * as constants from './constants';

export const fetchSports = () => ({type: constants.FETCH_SPORTS});

export const retrieveSports = sports => ({
    type: constants.RETRIEVE_SPORTS,
    sports,
});
