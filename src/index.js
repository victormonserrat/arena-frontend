import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './containers/App';
import injectTapEventPlugin from 'react-tap-event-plugin';

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render(
    <Provider
        store={ store }
    >
        <MuiThemeProvider>
            <App/>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
