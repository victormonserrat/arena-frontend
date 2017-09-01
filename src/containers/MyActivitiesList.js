import axios from 'axios';
import { connect } from 'react-redux';

import { retrieveActivities } from '../actions/activities';
import ActivitiesList from '../components/ActivitiesList';

const getMyActivities = dispatch => {
    return () => {
        axios.get("/me/activities")
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
    hasNewButton: true,
    noActivitiesLabel: 'Aún no tienes actividades. Puedes crear una pulsando el botón de arriba.',
    documentTitle: 'Arena | Mis actividades'
});

const mapDispatchToProps = dispatch => ({
    getActivities: getMyActivities(dispatch),
    get: "/me/activities",
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ActivitiesList);
