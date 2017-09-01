import React, { Component } from 'react';
import areIntlLocalesSupported from 'intl-locales-supported';

import DatePicker from 'material-ui/DatePicker';

let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['es-Es'])) {
    DateTimeFormat = global.Intl.DateTimeFormat;
} else {
    const IntlPolyfill = require('intl');
    DateTimeFormat = IntlPolyfill.DateTimeFormat;
    require('intl/locale-data/jsonp/es-ES');
}

export default class DatePickerComposition extends Component {
    render() {
        const { ...rest } = this.props;
        return (
            <DatePicker
                DateTimeFormat={ DateTimeFormat }
                locale="es-ES"
                cancelLabel="Cancelar"
                fullWidth
                autoOk
                { ...rest }
            />
        );
    }
}