import axios from 'axios';
import { connect } from 'react-redux';

import { fetchSports, retrieveSports } from '../actions/sports';
import {
    updateSport, updateStartDate, updateStartTime, updateDuration, updateTitle,
    updateDescription, updateLocation, updateSeats, redirect,
} from '../actions/activityForm';
import ActivityForm from '../components/ActivityForm';

const getSports = dispatch => {
    return () => {
        dispatch(fetchSports());
        axios.get('/sports')
            .then(result => {
                const sports = result.data['hydra:member'];
                dispatch(retrieveSports(sports));
            })
            .catch();
    };
};

const postActivity = dispatch => {
    return (title, startsAt, duration, location, description, seats, sport) => {
        let activity = {
            title,
            startsAt,
            duration,
            sport,
        };
        if (location) {
            activity.location = location;
        }
        if (description) {
            activity.description = description;
        }
        if (seats) {
            activity.seats = seats;
        }
        axios.post('/activities', activity)
            .then(result => {
                dispatch(redirect());
            })
            .catch(error => {
            });
    }
};

const mapStateToProps = state => ({
    sports: state.sports.sports,
    isLoading: state.sports.isLoading,
    sport: state.activityForm.sport,
    startDate: state.activityForm.startDate,
    startTime: state.activityForm.startTime,
    duration: state.activityForm.duration,
    title: state.activityForm.title,
    description: state.activityForm.description,
    location: state.activityForm.location,
    seats: state.activityForm.seats,
    isRedirectable: state.activityForm.isRedirectable,
});

const mapDispatchToProps = dispatch => ({
    getSports: getSports(dispatch),
    updateSport: sport => dispatch(updateSport(sport)),
    updateStartDate: startDate => dispatch(updateStartDate(startDate)),
    updateStartTime: startTime => dispatch(updateStartTime(startTime)),
    updateDuration: duration => dispatch(updateDuration(duration)),
    updateTitle: title => dispatch(updateTitle(title)),
    updateDescription: description => dispatch(updateDescription(description)),
    updateLocation: location => dispatch(updateLocation(location)),
    updateSeats: seats => dispatch(updateSeats(seats)),
    postActivity: postActivity(dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ActivityForm);