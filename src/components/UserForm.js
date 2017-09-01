import React, { Component } from 'react';
import { Container, Col } from 'react-grid-system';
import { Redirect } from 'react-router-dom';
import hello from '../../node_modules/hellojs/dist/hello.all.js';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Save from 'material-ui/svg-icons/content/save';
import Delete from 'material-ui/svg-icons/action/delete';

const styles = {
    container: {
        padding: 0,
        margin: 0,
    },
    paper: {
        margin: '1cm 0px 5mm 0px',
        padding: '1cm',
    },
    buttons: {
        marginBottom: '1cm',
    },
    avatar: {
        width: '100%',
        height: 'auto',
        borderRadius: '100%',
    },
};

export default class UserForm extends Component {
    state = {
        firstName: this.props.me.fullName.split(' ')[0],
        lastName: this.props.me.fullName.split(' ').splice(1).join(' '),
        firstNameError: null,
        lastNameError: null,
        disabled: false,
        openSnackbar: false,
        openDialog: false,
        isRedirectable: false,
    };

    componentWillMount() {
        document.title = 'Arena | ' + this.props.me.fullName;
    }

    handleUpdateFirstName = (event, firstName) => {
        if (firstName === '') {
            this.setState({
                firstNameError: '* Este campo es obligatorio.',
                firstName: firstName,
                disabled: true,
            });
        } else {
            this.setState({
                firstName: firstName,
                firstNameError: null,
                disabled: false,
            });
        }
    };

    handleUpdateLastName = (event, lastName) => {
        if (lastName === '') {
            this.setState({
                lastNameError: '* Este campo es obligatorio.',
                lastName: lastName,
                disabled: true,
            });
        } else {
            this.setState({
                lastName: lastName,
                lastNameError: null,
                disabled: false,
            });
        }
    };

    handleActionTouchTap = () => {
        const { putMe, me } = this.props;
        const { avatar, email, fullName } = me;
        putMe(avatar, email, fullName);
        this.setState({
            firstName: fullName.split(' ')[0],
            lastName: fullName.split(' ').splice(1).join(' '),
            openSnackbar: false,
        });
    };

    handleOpen = () => {
        this.setState({openDialog: true});
    };

    handleClose = () => {
        this.setState({openDialog: false});
    };

    render() {
        const { me, putMe, deleteMe } = this.props;
        const {
            firstName, lastName, firstNameError, lastNameError,
            disabled, openSnackbar, openDialog, isRedirectable
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
                        hello('google').logout();
                        deleteMe();
                        this.setState({
                            isRedirectable: true,
                        });
                    }
                }
            />,
        ];
        return (
            <div>
                { isRedirectable &&
                    <Redirect to={'/'}/>
                }
                <Dialog
                    title='¿Realmente quieres borrar tu cuenta?'
                    actions={actions}
                    open={ openDialog }
                    onRequestClose={ this.handleClose }
                >
                    Esta acción no se podrá deshacer.
                </Dialog>
                <Container style={ styles.container }
                           fluid
                >
                    <Col style={ styles.container }
                         xs={11} sm={11} md={10} lg={8} xl={8}
                         offset={ {xs: 0.5, sm: 0.5, md: 1, lg: 2, xl: 2} }
                    >
                        <Paper style={ styles.paper }>
                            <Container style={ styles.container }
                                       fluid
                            >
                                <Col style={ styles.container }
                                     xs={9} sm={3.5} md={3.5} lg={3.5} xl={3.5}
                                     offset={ {xs: 1.5, sm: 0, md: 0, lg: 0, xl: 0} }
                                >
                                    <img style={ styles.avatar }
                                         alt="me"
                                         src={ me.avatar.slice(0, -2) + '500' }
                                    />
                                </Col>
                                <Col style={ styles.container }
                                     xs={12} sm={7.5} md={7.5} lg={5.7} xl={7.5}
                                     offset={ {xs: 0, sm: 1, md: 1, lg: 1, xl: 1} }
                                >
                                    <TextField
                                        type="text"
                                        fullWidth
                                        floatingLabelText="Correo electrónico"
                                        value={ me.email }
                                        disabled
                                    />
                                    <TextField floatingLabelFocusStyle={ styles.teal }
                                               errorStyle={ styles.error }
                                        type="text"
                                        fullWidth
                                        floatingLabelText="Nombre"
                                        value={ firstName }
                                        onChange={ this.handleUpdateFirstName }
                                        errorText={ firstNameError }
                                    />
                                    <TextField
                                        type="text"
                                        fullWidth
                                        floatingLabelText="Apellidos"
                                        value={ lastName }
                                        onChange={ this.handleUpdateLastName }
                                        errorText={ lastNameError }
                                    />
                                </Col>
                            </Container>
                        </Paper>
                        <Col style={ styles.container }
                             xs={12} sm={5.5} md={5.5} lg={5.5} xl={5.5}
                        >
                            <RaisedButton
                                fullWidth
                                label={'Guardar cambios'}
                                backgroundColor="#009688"
                                labelColor="#ffffff"
                                disabled={ disabled }
                                icon={
                                    <Save/>
                                }
                                onTouchTap={() => {
                                    putMe(
                                        me.avatar,
                                        me.email,
                                        firstName + ' ' + lastName,
                                    );
                                    this.setState({
                                        openSnackbar: true,
                                    });
                                }
                                }
                            />
                        </Col>
                        <Col style={ styles.container }
                             xs={12} sm={5.5} md={5.5} lg={5.5} xl={5.5}
                             offset={ {xs: 0, sm: 1, md: 1, lg: 1, xl: 1} }
                        >
                            <RaisedButton
                                          fullWidth
                                          label={'Eliminar cuenta'}
                                          backgroundColor="#F44336"
                                          labelColor="#ffffff"
                                          icon={
                                              <Delete/>
                                          }
                                          onTouchTap={ this.handleOpen }
                            />
                        </Col>
                    </Col>
                </Container>
                <div style={styles.buttons}></div>
                <Snackbar
                    open={ openSnackbar }
                    message='Cambios guardados con éxito'
                    action="Deshacer"
                    autoHideDuration={4000}
                    onActionTouchTap={ this.handleActionTouchTap }
                />
            </div>
        );
    }
}