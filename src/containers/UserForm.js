import axios from 'axios';
import { connect } from 'react-redux';

import UserForm from '../components/UserForm';

const putMe = dispatch => {
    return (avatar, email, fullName) => {
        let me = {
            avatar,
            email,
            fullName,
        };
        axios.put('/me', me)
            .then(result => {
            })
            .catch(error => {
            });
    }
};

const deleteMe = dispatch => {
    return () => {
        axios.delete('/me', {})
            .then(result => {
            })
            .catch(error => {
            });
    }
};

const mapStateToProps = state => ({
    me: state.auth.me,
});

const mapDispatchToProps = dispatch => ({
    putMe: putMe(dispatch),
    deleteMe: deleteMe(dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserForm);