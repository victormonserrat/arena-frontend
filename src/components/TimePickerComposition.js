import React, { Component } from 'react';

import TimePicker from 'material-ui/TimePicker';

export default class TimePickerComposition extends Component {
    render() {
        const { ...rest } = this.props;
        return (
            <TimePicker
                format="24hr"
                okLabel="Aceptar"
                cancelLabel="Cancelar"
                autoOk
                fullWidth
                { ...rest }
            />
        );
    }
}