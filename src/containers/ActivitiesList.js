import axios from 'axios';
import { connect } from 'react-redux';

import { retrieveActivities } from '../actions/activities';
import ActivitiesList from '../components/ActivitiesList';

const getActivities = dispatch => {
    return () => {
        axios.get("/activities")
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
    noActivitiesLabel: 'Aún no hay actividades. Puedes crear una en "Actividades".',
    documentTitle: 'Arena | Participa'
});

const mapDispatchToProps = dispatch => ({
    getActivities: getActivities(dispatch),
    get: "/activities",
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ActivitiesList);
