import { showDrawer, showLogin } from '../actions/ui';
import { connect } from 'react-redux';

import ToolbarComposition from '../components/ToolbarComposition';

const mapStateToProps = state => ({
    title: 'Arena',
    user: state.auth.me,
    isLogging: state.auth.isLogging,
});

const mapDispatchToProps = dispatch => ({
    iconAction: () => dispatch(showDrawer()),
    buttonAction: () => dispatch(showLogin()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ToolbarComposition);
