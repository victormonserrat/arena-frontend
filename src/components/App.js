import React, { Component } from 'react';
import axios from 'axios';
import hello from '../../node_modules/hellojs/dist/hello.all.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'normalize.css';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import ToolbarComposition from '../containers/ToolbarComposition';
import LoginDialog from '../containers/LoginDialog';
import DrawerComposition from '../containers/DrawerComposition';
import ActivitiesList from '../containers/ActivitiesList';
import MyActivitiesList from '../containers/MyActivitiesList';
import MyRegistrationsList from '../containers/MyRegistrationsList';
import MyApplicationsList from '../containers/MyApplicationsList';
import InvitationsList from '../containers/InvitationsList';
import ActivityForm from '../containers/ActivityForm';
import ActivityEditForm from '../containers/ActivityEditForm';
import Activity from '../containers/Activity';
import UserForm from '../containers/UserForm';

import NotFound from '../components/NotFound';

function authenticate(network, socialToken) {
    return new Promise((resolve, reject) => {
        axios.post('/auth', {
            network: network,
            socialToken: socialToken
        })
            .then(response => {
                resolve(response.data.token);
            })
            .catch(error => {
                reject(error);
            });
    });
}

const styles = {
    loading: {
        position: 'relative',
        margin: '0px auto 80px auto',
    },
};

export default class App extends Component {
    componentWillMount() {
        const token = sessionStorage.getItem('arenaJwt');
        if (token) {
            this.props.login();
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            this.props.getMe();
        }

        hello.init({
            google: '1034225217551-14ov53kad3d0a5acggehjsd126162di2.apps.googleusercontent.com',
        }, {
            scope: 'email',
            redirect_uri: '/redirect.html',
            display: 'page',
        });

        hello.on('auth.login', auth => {
            let socialToken = auth.authResponse.access_token;

            authenticate(auth.network, socialToken)
                .then(token => {
                    const refresh = sessionStorage.getItem('arenaJwt') === null;
                    sessionStorage.setItem('arenaJwt', token);
                    if (refresh) {
                        window.location.reload();
                    }
                })
                .catch(e => console.log(e));
        }, e => {
            alert('Log in error: ' + e.error.message);
        });

        hello.on('auth.logout', auth => {
            delete axios.defaults.headers.common['Authorization'];
            sessionStorage.removeItem('arenaJwt');
            window.location.reload();
        }, e => {
            alert('Log out error: ' + e.error.message);
        });
    }

    render() {
        const { user, isLogging } = this.props;
        return (
            <Router>
                <div>
                    <ToolbarComposition/>
                    <LoginDialog/>
                    <DrawerComposition/>
                    { isLogging ?
                        <RefreshIndicator style={ styles.loading }
                                          left={0}
                                          top={40}
                                          status="loading"
                        />
                        :
                        <div>
                            { user ?
                                <Switch>
                                    <Route exact path="/" component={ActivitiesList}/>
                                    <Route exact path="/actividades" component={MyActivitiesList}/>
                                    <Route exact path="/participaciones" component={MyRegistrationsList}/>
                                    <Route exact path="/solicitudes" component={MyApplicationsList}/>
                                    <Route exact path="/invitaciones" component={InvitationsList}/>
                                    <Route exact path="/actividades/nueva" component={ActivityForm}/>
                                    <Route exact path="/actividades/:id" component={Activity}/>
                                    <Route exact path="/actividades/:id/editar" component={ActivityEditForm}/>
                                    <Route exact path="/perfil" component={UserForm}/>
                                    <Route path="/" component={NotFound}/>
                                </Switch>
                                :
                                <Switch>
                                    <Route exact path="/" component={ActivitiesList}/>
                                    <Route exact path="/actividades/:id" component={Activity}/>
                                    <Route path="/" component={NotFound}/>
                                </Switch>
                            }
                        </div>
                    }
                </div>
            </Router>
        )
    }
}
