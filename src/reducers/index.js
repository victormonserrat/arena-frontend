import { combineReducers } from 'redux';
import ui from './ui';
import auth from './auth';
import sports from './sports';
import activities from './activities';
import activity from './activity';
import activityForm from './activityForm';

const reducer = combineReducers({
    ui,
    auth,
    sports,
    activities,
    activityForm,
    activity,
});

export default reducer;
