import axios from 'axios';
import { connect } from 'react-redux';

import { retrieveActivities } from '../actions/activities';
import ActivitiesList from '../components/ActivitiesList';

const getInvitations = dispatch => {
    return () => {
        axios.get("/me/activities/invited")
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
    noActivitiesLabel: 'No tienes invitaciones pendiendes.',
    documentTitle: 'Arena | Invitaciones'
});

const mapDispatchToProps = dispatch => ({
    getActivities: getInvitations(dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ActivitiesList);
