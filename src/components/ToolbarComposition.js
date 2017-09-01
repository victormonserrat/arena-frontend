import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import IconMenuComposition from './IconMenuComposition';
import FlatButton from 'material-ui/FlatButton';

const styles = {
    toolbar: {
        backgroundColor: '#009688',
    },
    iconButton: {
        marginLeft: 10,
    },
    icon: {
        color: '#ffffff',
    },
    title: {
        marginLeft: 10,
        color: '#ffffff',
        fontWeight: 100,
    },
    button: {
        color: '#ffffff',
        fontWeight: 300,
    },
    link: {
        textDecorationLine: 'none',
    },
};

export default class ToolbarComposition extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        user: PropTypes.object,
        iconAction: PropTypes.func.isRequired,
        buttonAction: PropTypes.func.isRequired,
    };

    render() {
        const { title, user, isLogging, iconAction, buttonAction } = this.props;
        return (
            <Toolbar style={ styles.toolbar }>
                <ToolbarGroup
                    firstChild
                >
                    <IconButton style={ styles.iconButton }
                                disabled={ !user }
                                iconStyle={ styles.icon }
                                onTouchTap={ iconAction }
                    >
                        <Menu/>
                    </IconButton>
                    <Link style={ styles.link }
                          to="/"
                    >
                        <ToolbarTitle style={ styles.title }
                            text={ title }
                        />
                    </Link>
                </ToolbarGroup>
                <ToolbarGroup
                    lastChild
                >
                    { !isLogging && (
                        user ?
                            <IconMenuComposition
                                user={ user }
                            />
                            :
                            <FlatButton
                                label="Iniciar sesión"
                                labelStyle={ styles.button }
                                onTouchTap={ buttonAction }
                                hoverColor="#00897B"
                            />
                        )
                    }
                </ToolbarGroup>
            </Toolbar>
        );
    }
}