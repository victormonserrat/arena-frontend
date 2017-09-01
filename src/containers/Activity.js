import axios from 'axios';
import { connect } from 'react-redux';

import { retrieveActivity, retrieveUsers } from '../actions/activity';
import Activity from '../components/Activity';

const getActivity = dispatch => {
    return id => {
        axios.get("/activities/" + id)
            .then(result => {
                const activity = result.data;
                dispatch(retrieveActivity(activity));
            })
            .catch();
    };
};

const getUsers = dispatch => {
    return () => {
        axios.get("/users")
            .then(result => {
                const users = result.data['hydra:member'];
                dispatch(retrieveUsers(users));
            })
            .catch();
    };
};

const deleteRegistration = (dispatch, registration, activity) => {
    axios.delete(registration, {})
        .then(result => {
            axios.get(activity)
                .then(result => {
                    const activity = result.data;
                    dispatch(retrieveActivity(activity));
                })
                .catch();
        })
        .catch();
};

const acceptApplication = (dispatch, registration, activity) => {
    axios.patch(registration + "/accept", {})
        .then(result => {
            axios.get(activity)
                .then(result => {
                    const activity = result.data;
                    dispatch(retrieveActivity(activity));
                })
                .catch();
        })
        .catch();
};

const refuseApplication = (dispatch, registration, activity) => {
    axios.patch(registration + "/refuse", {})
        .then(result => {
            axios.get(activity)
                .then(result => {
                    const activity = result.data;
                    dispatch(retrieveActivity(activity));
                })
                .catch();
        })
        .catch();
};

const invite = (dispatch, user, activity) => {
    let registration = {
        user,
        activity,
    };
    axios.post("/registrations", registration)
        .then(result => {
            axios.get(activity)
                .then(result => {
                    const activity = result.data;
                    dispatch(retrieveActivity(activity));
                })
                .catch();
        })
        .catch();
};

const mapStateToProps = state => ({
    isLoading: state.activity.isLoading,
    activity: state.activity.activity,
    usersLoading: state.activity.usersLoading,
    users: state.activity.users,
});

const mapDispatchToProps = dispatch => ({
    getActivity: getActivity(dispatch),
    getUsers: getUsers(dispatch),
    deleteRegistration: (registration, activity) => deleteRegistration(dispatch, registration, activity),
    acceptApplication: (registration, activity) => acceptApplication(dispatch, registration, activity),
    refuseApplication: (registration, activity) => refuseApplication(dispatch, registration, activity),
    invite: (user, activity) => invite(dispatch, user, activity),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Activity);
