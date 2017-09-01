import { connect } from 'react-redux';

import { showDrawer, hideDrawer } from '../actions/ui';
import DrawerComposition from '../components/DrawerComposition';

const mapStateToProps = state => ({
    isOpen: state.ui.drawer,
});

const mapDispatchToProps = dispatch => ({
    showAction: () => dispatch(showDrawer()),
    hideAction: () => dispatch(hideDrawer()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawerComposition);
