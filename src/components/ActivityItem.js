import React, { Component, PropTypes } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Col } from 'react-grid-system';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import Delete from 'material-ui/svg-icons/action/delete';
import Edit from 'material-ui/svg-icons/image/edit';
import Accept from 'material-ui/svg-icons/navigation/check';
import Refuse from 'material-ui/svg-icons/navigation/close';

const styles = {
    container: {
        padding: 0,
    },
    card: {
        marginBottom: '5mm',
    },
    avatar: {
        marginTop: -5,
    },
    a: {
        color: '#000000',
    },
    right: {
        textAlign: 'right',
        fontWeight: 300,
    },
    teal: {
        color: '#00897B',
    },
    seats: {
        fontSize: 14,
        fontWeight: 300,
        textAlign: 'right',
        paddingTop: 10,
        paddingRight: 10,
        marginBottom: -10,
    },
};

export default class ActivityItem extends Component {
    static propTypes = {
        expandable: PropTypes.bool,
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        startsAt: PropTypes.object.isRequired,
        duration: PropTypes.number,
        location: PropTypes.string,
        description: PropTypes.string,
        seats: PropTypes.number,
        owner: PropTypes.object.isRequired,
        sport: PropTypes.object.isRequired,
        status: PropTypes.string.isRequired,
        accepted: PropTypes.number.isRequired,
    };

    static defaultProps = {
        expandable: false,
    };

    state = {
        openDialog: false,
        isRedirectable: false,
    };

    handleOpen = () => {
        this.setState({openDialog: true});
    };

    handleClose = () => {
        this.setState({openDialog: false});
    };

    render()
    {
        const {
            expandable, id, title, startsAt, duration, location, description, seats, owner, sport,
            status, accepted, applyActivity, acceptActivity, refuseActivity, cancelActivity, deleteActivity,
        } = this.props;
        const {
            openDialog, isRedirectable,
        } = this.state;
        const actions = [
            <FlatButton
                label="Cancelar"
                keyboardFocused={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Eliminar"
                labelStyle={{color: '#F44336'}}
                onTouchTap={() => {
                        this.handleClose();
                        deleteActivity(id);
                        if (!expandable) {
                            this.setState({
                                isRedirectable: true,
                            });
                        }
                    }
                }
            />,
        ];
        return (
            <div>
                { isRedirectable &&
                    <Redirect to={'/actividades'}/>
                }
                <Dialog
                    title='¿Realmente quieres borrar esta actividad?'
                    actions={actions}
                    open={ openDialog }
                    onRequestClose={ this.handleClose }
                >
                    Esta acción no se podrá deshacer.
                </Dialog>
                <Card style={ styles.card }>
                    { seats !== null ?
                        <div style={styles.seats}>
                            <strong style={styles.teal}>{seats - accepted} </strong>
                            plaza{((seats - accepted) > 1 || (seats - accepted) === 0) && 's'}
                        </div>
                        :
                        <div style={styles.seats}>
                            <strong style={styles.teal}> </strong>
                        </div>
                    }
                    <CardHeader
                        showExpandableButton={ expandable }
                        title={
                            <a style={ styles.a }
                               href={ id.replace('activities', 'actividades') }
                            >
                                { title }.
                            </a>
                        }
                        subtitle={ owner.fullName + '.' }
                        avatar={
                            owner.avatar ?
                                <Avatar style={ styles.avatar }
                                    src={ owner.avatar }
                                />
                                :
                                <Avatar style={ styles.avatar }>
                                    { owner.fullName ? owner.fullName[0].toUpperCase() : owner.email[0].toUpperCase() }
                                </Avatar>
                        }
                    />
                    <CardText>
                        <Container style={ styles.container }
                                   fluid
                        >
                            <Col style={ styles.container }
                                 xs={6} sm={6} md={6} lg={6} xl={6}
                             >
                                <strong style={ styles.teal }>
                                    { sport.name }.
                                </strong>
                            </Col>
                            <Col style={ styles.container }
                                 xs={6} sm={6} md={6} lg={6} xl={6}
                            >
                                <div style={ styles.right }>
                                    { startsAt.format("DD/MM/YYYY") } a las { startsAt.format("HH:mm") }
                                </div>
                            </Col>
                            <Col style={ styles.container }
                                 xs={9} sm={9} md={9} lg={9} xl={9}
                            >
                                { location }.
                            </Col>
                            <Col style={ styles.container }
                                 xs={3} sm={3} md={3} lg={3} xl={3}
                            >
                                <div style={ styles.right }>
                                    <strong>{ duration } </strong>
                                    min.
                                </div>
                            </Col>
                        </Container>
                    </CardText>
                    <CardText
                        expandable={ expandable }
                    >
                        { description }.
                    </CardText>
                    { status === 'not_logged' &&
                        <CardActions>
                            <FlatButton
                                fullWidth
                                label={ 'Inicia sesión para poder participar' }
                                disabled
                            />
                        </CardActions>
                    }
                    { status === 'owner' &&
                        <CardActions>
                            <Container style={ styles.container }
                                       fluid
                            >
                                <Col style={ styles.container }
                                     xs={6} sm={6} md={6} lg={6} xl={6}
                                >
                                    <FlatButton
                                        fullWidth
                                        label={'Editar'}
                                        href={ id.replace('/activities/', '/actividades/') + '/editar' }
                                        icon={
                                            <Edit/>
                                        }
                                    />
                                </Col>
                                <Col style={ styles.container }
                                     xs={6} sm={6} md={6} lg={6} xl={6}
                                >
                                    <FlatButton
                                        fullWidth
                                        labelStyle={ {color: '#F44336'} }
                                        label={ 'Eliminar' }
                                        onTouchTap={ this.handleOpen }
                                        icon={
                                            <Delete color="#F44336"/>
                                        }
                                    />
                                </Col>
                            </Container>
                        </CardActions>
                    }
                    { status === 'registered' &&
                        <CardActions>
                            <FlatButton
                                fullWidth
                                labelStyle={ {color: '#F44336'} }
                                label={ 'Eliminar mi participación' }
                                onTouchTap={ () => cancelActivity(id) }
                            />
                        </CardActions>
                    }
                    { status === 'applicant' &&
                        <CardActions>
                            <FlatButton
                                fullWidth
                                labelStyle={ {color: '#F44336'} }
                                label={ 'Eliminar mi solicitud' }
                                onTouchTap={ () => cancelActivity(id) }
                            />
                        </CardActions>
                    }
                    { status === 'invited' &&
                        <CardActions>
                            <Container style={ styles.container }
                                       fluid
                            >
                                <Col style={ styles.container }
                                     xs={6} sm={6} md={6} lg={6} xl={6}
                                >
                                    { !seats || seats - accepted > 0 ?
                                        <FlatButton
                                            fullWidth
                                            labelStyle={{color: '#00897B'}}
                                            label={'Aceptar invitación'}
                                            icon={
                                                <Accept color="#00897B"/>
                                            }
                                            onTouchTap={ () => acceptActivity(id) }
                                        />
                                        :
                                        <FlatButton
                                            fullWidth
                                            label={'Sin plaza'}
                                            disabled
                                        />
                                    }
                                </Col>
                                <Col style={ styles.container }
                                     xs={6} sm={6} md={6} lg={6} xl={6}
                                >
                                    <FlatButton
                                        fullWidth
                                        labelStyle={ {color: '#F44336'} }
                                        label={ 'Rechazar invitación' }
                                        icon={
                                            <Refuse color="#F44336"/>
                                        }
                                        onTouchTap={ () => refuseActivity(id) }
                                    />
                                </Col>
                            </Container>
                        </CardActions>
                    }
                    { status === 'logged' &&
                        <CardActions>
                            <FlatButton
                                fullWidth
                                label={ 'Solicitar mi participación' }
                                onTouchTap={ () => applyActivity(id) }
                            />
                        </CardActions>
                    }
                </Card>
            </div>
        );
    }
}