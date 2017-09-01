import axios from 'axios';
import { connect } from 'react-redux';
import Moment from 'moment';

import { fetchSports, retrieveSports } from '../actions/sports';
import { retrieveActivity } from '../actions/activity';
import {
    updateSport, updateStartDate, updateStartTime, updateDuration, updateTitle,
    updateDescription, updateLocation, updateSeats, redirect,
} from '../actions/activityForm';
import ActivityEditForm from '../components/ActivityEditForm';

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

const getActivity = dispatch => {
    return id => {
        axios.get("/activities/" + id)
            .then(result => {
                const activity = result.data;
                dispatch(updateSport(activity.sport));
                dispatch(updateStartDate(Moment(activity.startsAt)));
                dispatch(updateStartTime(Moment(activity.startsAt)));
                dispatch(updateDuration(activity.duration));
                dispatch(updateTitle(activity.title));
                dispatch(updateDescription(activity.description));
                dispatch(updateLocation(activity.location));
                dispatch(updateSeats(activity.seats));
                dispatch(retrieveActivity(activity));
            })
            .catch();
    };
};

const putActivity = dispatch => {
    return (id, title, startsAt, duration, location, description, seats, sport) => {
        let activity = {
            title,
            startsAt,
            duration,
            sport,
        };
        if (location) {
            activity.location = location;
        } else {
            activity.location = '';
        }
        if (description) {
            activity.description = description;
        } else {
            activity.description = '';
        }
        if (seats) {
            activity.seats = seats;
        } else {
            activity.seats = null;
        }
        axios.put('/activities/' + id, activity)
            .then(result => {
                dispatch(redirect());
            })
            .catch(error => {
            });
    }
};

const mapStateToProps = state => ({
    activityLoading: state.activity.isLoading,
    activity: state.activity.activity,
    sports: state.sports.sports,
    sportsLoading: state.sports.isLoading,
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
    getActivity: getActivity(dispatch),
    putActivity: putActivity(dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ActivityEditForm);