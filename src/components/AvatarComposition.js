import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';

export default class AvatarComposition extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        size: PropTypes.number,
    };

    static defaultProps = {
        size: 40,
    };

    render() {
        const { user, size } = this.props;
        if (user.avatar) {
            return(
                <Avatar size={ size }
                        src={ user.avatar }
                />
            );
        } else {
            return(
                <Avatar size={ size }>
                    { user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase() }
                </Avatar>
            );
        }
    }
}
