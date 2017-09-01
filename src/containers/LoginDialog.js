import { connect } from 'react-redux';

import { hideLogin } from '../actions/ui';
import LoginDialog from '../components/LoginDialog';

const mapStateToProps = state => ({
    isOpen: state.ui.loginDialog,
});

const mapDispatchToProps = dispatch => ({
    hideAction: () => dispatch(hideLogin()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginDialog);
