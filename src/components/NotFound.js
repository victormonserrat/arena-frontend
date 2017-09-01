import React, { Component } from 'react';

const styles = {
    img: {
        width: '100%',
        height: 'auto',
        marginBottom: -7,
    },
};

export default class NotFound extends Component {
    componentWillMount() {
        document.title = 'Arena | Not found'
    }

    render() {
        return (
            <div>
                <img style={ styles.img }
                     src="/images/notfound.png" alt="notfound"
                />
            </div>
        )
    }
}
