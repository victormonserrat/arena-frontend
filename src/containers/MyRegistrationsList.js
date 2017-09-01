import axios from 'axios';
import { connect } from 'react-redux';

import { retrieveActivities } from '../actions/activities';
import ActivitiesList from '../components/ActivitiesList';

const getMyRegistrations = dispatch => {
    return () => {
        axios.get("/me/activities/accepted")
            .then(result => {
                const activities = result.data['hydra:member'];
                dispatch(retrieveActivities(activities));
            })
            .catch();
    };
};

const mapStateToProps = state => ({
    activities: state.activities.activities,
    isLoading: state.activities.isLoading,
    noActivitiesLabel: 'No participas en ninguna actividad. Puedes solicitar tu participación en "Participa".',
    documentTitle: 'Arena | Mis participaciones'
});

const mapDispatchToProps = dispatch => ({
    getActivities: getMyRegistrations(dispatch),
    get: "/me/activities/accepted",
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ActivitiesList);
