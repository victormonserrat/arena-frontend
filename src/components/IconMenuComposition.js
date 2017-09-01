import React, { Component, PropTypes } from 'react';
import hello from '../../node_modules/hellojs/dist/hello.all.js';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import AvatarComposition from './AvatarComposition';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Exit from 'material-ui/svg-icons/action/exit-to-app';

const styles = {
    iconButton: {
        margin: '0px 30px 8px 0px',
    },
    listItem: {
        marginBottom: 20,
    },
    firstItem: {
        marginTop: 15,
    },
    link: {
        textDecorationLine: 'none',
    },
};

export default class IconMenuComposition extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
    };

    logout = () => hello('google').logout();

    render() {
        const { user } = this.props;
        return (
            <IconMenu style={ styles.iconButton }
                      iconButtonElement={
                            <IconButton>
                                <AvatarComposition user={ user }/>
                            </IconButton>
                      }
                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <List>
                    <ListItem style={ styles.listItem }
                        disabled={true}
                        leftAvatar={
                            user.avatar ?
                                <Avatar src={ user.avatar }/>
                                :
                                <Avatar>
                                    { user.fullName ? user.fullName[0].toUpperCase() : user.email[0].toUpperCase() }
                                </Avatar>
                        }
                    >
                        { user.fullName ? user.fullName : user.email }
                    </ListItem>
                    <Divider/>
                    <ListItem
                        onTouchTap={ this.logout }
                        primaryText="Cerrar sesión"
                        rightIcon={
                            <Exit/>
                        }
                    />
                </List>
            </IconMenu>
        );
    }
}
