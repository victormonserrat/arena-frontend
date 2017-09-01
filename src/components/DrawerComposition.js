import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const styles = {
    link: {
        textDecorationLine: 'none',
    },
};

export default class DrawerComposition extends Component {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        showAction: PropTypes.func.isRequired,
        hideAction: PropTypes.func.isRequired,
    };

    render() {
        const { isOpen, showAction, hideAction } = this.props;
        return (
            <Drawer
                open={ isOpen }
                docked={false}
                onRequestChange={ open => open ? showAction() : hideAction() }
            >
                <Link style={ styles.link }
                      to="/"
                >
                    <MenuItem
                        primaryText="Participa"
                        onTouchTap={ hideAction }
                    />
                </Link>
                <Link style={ styles.link }
                      to="/actividades"
                >
                    <MenuItem
                        primaryText="Actividades"
                        onTouchTap={ hideAction }
                    />
                </Link>
                <Link style={ styles.link }
                      to="/participaciones"
                >
                    <MenuItem
                        primaryText="Participaciones"
                        onTouchTap={ hideAction }
                    />
                </Link>
                <Link style={ styles.link }
                      to="/solicitudes"
                >
                    <MenuItem
                        primaryText="Solicitudes"
                        onTouchTap={ hideAction }
                    />
                </Link>
                <Link style={ styles.link }
                      to="/invitaciones"
                >
                    <MenuItem
                        primaryText="Invitaciones"
                        onTouchTap={ hideAction }
                    />
                </Link>
                <Link style={ styles.link }
                      to="/perfil"
                >
                    <MenuItem
                        primaryText="Perfil"
                        onTouchTap={ hideAction }
                    />
                </Link>
            </Drawer>
        );
    }
}
