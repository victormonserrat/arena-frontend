import axios from 'axios';
import { connect } from 'react-redux';

import { retrieveActivities } from '../actions/activities';
import ActivitiesList from '../components/ActivitiesList';

const getMyApplications = dispatch => {
    return () => {
        axios.get("/me/activities/applied")
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
    noActivitiesLabel: 'No tienes solicitudes de participación. Puedes solicitar en "Participa".',
    documentTitle: 'Arena | Mis solicitudes'
});

const mapDispatchToProps = dispatch => ({
    getActivities: getMyApplications(dispatch),
    get: "/me/activities/applied"
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ActivitiesList);
