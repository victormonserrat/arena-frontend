import React, { Component } from 'react';
import Moment from 'moment';
import { Container, Col } from 'react-grid-system';

import AutoComplete from 'material-ui/AutoComplete';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import ActivityItem from '../containers/ActivityItem';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Check from 'material-ui/svg-icons/navigation/check';

const styles = {
    container: {
        padding: 0,
        margin: 0,
    },
    loading: {
        position: 'relative',
        margin: '0px auto 80px auto',
    },
    activity: {
        marginTop: '1cm',
        marginBottom: '1cm',
    },
    paper: {
        marginBottom: '5mm',
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '4mm 4mm 4mm 4mm',
    },
    chip: {
        margin: '1mm 1mm 1mm 1mm',
    },
    title: {
        color: '#00897B',
        fontWeight: 300,
        marginLeft: 20,
    },
    marginBottom: {
        marginBottom: '5mm',
    },
    check: {
        marginLeft: 5,
        marginBottom: -7,
    },
    red: {
        color: '#F44336',
    },
};

export default class Activity extends Component {
    state = {
        searchText: '',
    };

    handleOnNewInvitation = (chosenRequest) => {
        if (chosenRequest['@id']) {
            this.props.invite(chosenRequest['@id'], this.props.activity['@id']);
            setTimeout( () => {
                this.refs['autocomplete'].setState({searchText:''});
            }, 500);
        }
    };

    componentWillMount() {
        this.props.getUsers();
        this.props.getActivity(this.props.match.params.id);
    }

    render() {
        const { searchText } = this.state;
        const {
            users, usersLoading, activity, isLoading, deleteRegistration, acceptApplication, refuseApplication,
        } = this.props;
        const {
            title, startsAt, duration, location, description,
            seats, registrations, owner, sport, status, acceptedRegistrationsCount,
        } = activity;
        let invitables = [];
        if (status === 'owner' && !usersLoading && !isLoading) {
            const invited = registrations.filter(registration =>
                (registration.status === 'waiting' &&
                registration.type === 'invitation') ||
                registration.status === 'accepted'
            );
            for (let u = 0; u < users.length; u++) {
                let invitable = true;
                for (let i = 0; i < invited.length; i++) {
                    if (users[u]['@id'] === invited[i].user['@id']) {
                        invitable = false;
                        break;
                    }
                }
                if (invitable) {
                    invitables.push(users[u]);
                }
            }
        }
        return (
            <Container style={ styles.container }
                       fluid
            >
                { isLoading ?
                    <RefreshIndicator style={ styles.loading }
                                      left={0}
                                      top={40}
                                      status="loading"
                    />
                    :
                    <Col style={ styles.container }
                         xs={11} sm={11} md={11} lg={10} xl={10}
                         offset={{xs: 0.5, sm: 0.5, md: 0.5, lg: 1, xl: 1}}
                    >
                        <div style={ styles.activity }>
                            <ActivityItem
                                id={ activity['@id'] }
                                title={ title }
                                startsAt={ Moment(startsAt) }
                                duration={ duration }
                                location={ location }
                                description={ description }
                                seats={ seats }
                                owner={ owner }
                                sport={ sport }
                                status={ status }
                                accepted={ acceptedRegistrationsCount }
                            />
                            { (status === 'registered' || status === 'owner') &&
                                registrations.filter(
                                    registration => registration.status === 'accepted'
                                ).length > 0 &&
                                <Paper style={ styles.paper}>
                                    <Toolbar>
                                        <ToolbarGroup
                                            firstChild
                                        >
                                            <ToolbarTitle style={ styles.title }
                                                text={"Participaciones"}
                                            />
                                        </ToolbarGroup>
                                    </Toolbar>
                                    <div style={ styles.chips }>
                                        {
                                            registrations.filter(
                                                registration => registration.status === 'accepted'
                                            ).map(
                                                registration => {
                                                    return (
                                                        <Chip style={ styles.chip }
                                                              key={ registration['@id'] }
                                                              onRequestDelete={ () => deleteRegistration(
                                                                  registration['@id'],
                                                                  activity['@id']
                                                              )}
                                                        >
                                                            <Avatar src={ registration.user.avatar }/>
                                                            { registration.user.fullName }
                                                        </Chip>
                                                    );
                                                }
                                            )
                                        }
                                    </div>
                                </Paper>
                            }
                            { status === 'owner' &&
                                <div>
                                    <Col style={ styles.container }
                                        lg={5.75} xl={5.75}
                                    >
                                        <Paper style={ styles.paper}>
                                            <Toolbar>
                                                <ToolbarGroup
                                                    firstChild
                                                >
                                                    <ToolbarTitle style={ styles.title }
                                                        text={"Solicitudes"}
                                                    />
                                                </ToolbarGroup>
                                            </Toolbar>
                                            <div style={ styles.chips }>
                                                { registrations.filter(
                                                    registration => registration.status === 'waiting' &&
                                                    registration.type === 'application'
                                                ).length > 0 ?
                                                    registrations.filter(
                                                        registration =>
                                                            registration.status === 'waiting' &&
                                                            registration.type === 'application'
                                                    ).map(
                                                        registration => {
                                                            return (
                                                                <div
                                                                    key={ registration['@id'] }
                                                                >
                                                                    <Chip style={ styles.chip }
                                                                          onRequestDelete={ () => refuseApplication(
                                                                              registration['@id'],
                                                                              activity['@id']
                                                                          )}
                                                                    >
                                                                        <Avatar src={ registration.user.avatar }/>
                                                                        { registration.user.fullName }
                                                                            <Check style={ styles.check }
                                                                                color="#a6a6a6"
                                                                                hoverColor="#009688"
                                                                                onTouchTap={ () => acceptApplication(
                                                                                    registration['@id'],
                                                                                    activity['@id']
                                                                                )}
                                                                            />
                                                                    </Chip>
                                                                </div>
                                                            );
                                                        }
                                                    )
                                                    :
                                                    <p>No existen solicitudes pendientes.</p>
                                                }
                                                {   registrations.filter(
                                                        registration => registration.status === 'waiting' &&
                                                        registration.type === 'application'
                                                    ).length > 0 &&acceptedRegistrationsCount >= seats &&
                                                    <p style={styles.red}>
                                                        Antes de aceptar más solicitudes, debes eliminar
                                                        participantes.
                                                    </p>
                                                }
                                            </div>
                                        </Paper>
                                    </Col>
                                    <Col style={ styles.container }
                                         offset={{lg: 0.5, xl: 0.5}}
                                         lg={5.75} xl={5.75}
                                    >
                                        <Paper style={ styles.paper }>
                                            <Toolbar>
                                                <ToolbarGroup
                                                    firstChild
                                                >
                                                    <ToolbarTitle style={ styles.title }
                                                        text={"Invitaciones"}
                                                    />
                                                </ToolbarGroup>
                                            </Toolbar>
                                            <div style={ styles.chips }>
                                                {
                                                    registrations.filter(
                                                        registration =>
                                                            registration.status === 'waiting' &&
                                                            registration.type === 'invitation'
                                                    ).map(
                                                        registration => {
                                                            return (
                                                                <Chip style={ styles.chip }
                                                                      key={ registration['@id'] }
                                                                      onRequestDelete={ () => deleteRegistration(
                                                                          registration['@id'],
                                                                          activity['@id']
                                                                      )}
                                                                >
                                                                    <Avatar src={ registration.user.avatar }/>
                                                                    { registration.user.fullName }
                                                                </Chip>
                                                            );
                                                        }
                                                    )
                                                }
                                                { !usersLoading && invitables.length > 0 &&
                                                <AutoComplete ref={'autocomplete'}
                                                    fullWidth
                                                    floatingLabelText={'Añadir invitaciones'}
                                                    filter={ AutoComplete.fuzzyFilter }
                                                    dataSource={ invitables }
                                                    dataSourceConfig={ {text: 'email', value: '@id'} }
                                                    maxSearchResults={5}
                                                    searchText={ searchText }
                                                    onNewRequest={ this.handleOnNewInvitation.bind(this) }
                                                />
                                                }
                                            </div>
                                        </Paper>
                                    </Col>
                                    <Col style={ styles.marginBottom }>
                                    </Col>
                                </div>
                            }
                        </div>
                    </Col>
                }
            </Container>
        );
    }
}
