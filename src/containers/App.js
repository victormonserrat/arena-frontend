import axios from 'axios';
import { connect } from 'react-redux';

import { retrieveMe, login } from '../actions/auth';
import App from '../components/App';

const getMe = dispatch => {
    return () => {
        axios.get("/me")
            .then(result => {
                const me = result.data;
                dispatch(retrieveMe(me));
            })
            .catch();
    };
};

const mapStateToProps = state => ({
    user: state.auth.me,
    isLogging: state.auth.isLogging,
});

const mapDispatchToProps = dispatch => ({
    getMe: getMe(dispatch),
    login: () => dispatch(login()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);