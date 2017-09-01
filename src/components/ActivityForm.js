import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Col, Row } from 'react-grid-system';
import Moment from 'moment';

import Paper from 'material-ui/Paper';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import DatePickerComposition from './DatePickerComposition';
import TimePickerComposition from "./TimePickerComposition";
import TextField from 'material-ui/TextField';

const styles = {
    container: {
        padding: 0,
        margin: 0,
    },
    paper: {
        margin: '1cm 0px 1cm 0px',
    },
    loading: {
        position: 'relative',
        margin: '0px auto 80px auto',
    },
    checkbox: {
        margin: '5mm 0 1cm 0',
    },
    stepper: {
        paddingBottom: '1cm',
        paddingLeft: '5mm',
        paddingRight: '5mm',
        paddingTop: '5mm',
    },
};

export default class ActivityForm extends Component {
    state = {
        stepIndex: 0,
        sportError: '* Este campo es obligatorio.',
        startDateError: '* Este campo es obligatorio.',
        startTimeError: '* Este campo es obligatorio.',
        durationError: '* Este campo es obligatorio.',
        titleError: '* Este campo es obligatorio.',
    };

    handleNext = () => {
        const { stepIndex } = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
        });
    };

    handlePrev = () => {
        const { stepIndex } = this.state;
        this.setState({
            stepIndex: stepIndex - 1,
        });
        if (stepIndex === 1) {
            this.props.getSports();
        }
    };

    handleUpdateSport = (sportText, sports) => {
        if (sportText === '') {
            this.setState({
                sportError: '* Este campo es obligatorio.',
            });
        } else {
            const sport = sports.find(item => item.name === sportText);
            if (sport) {
                this.props.updateSport(sport);
                this.setState({
                    sportError: null,
                });
            } else {
                this.setState({
                    sportError: sportText + ' no es un deporte existente.',
                });
            }
        }
    };

    isStartDateTimeValid = (startDate, startTime) =>
    Moment(startDate.format('YYYY-MM-DD') + 'T' + startTime.format('HH:mm:ss')) > Moment();

    validateStartDateTime = (startDate, startTime) => {
        if (this.isStartDateTimeValid(startDate, startTime)) {
            this.setState({
                startDateError: null,
                startTimeError: null,
            });
        } else {
            this.setState({
                startTimeError: 'La hora de comienzo no es válida.',
            });
        }
    };

    handleUpdateStartDate = (event, startDate) => {
        startDate = Moment(startDate);
        this.props.updateStartDate(startDate);
        const { startTime } = this.props;
        if (startTime === null) {
            this.setState({
                startDateError: null,
            });
        } else {
            this.validateStartDateTime(startDate, startTime);
        }
    };

    handleUpdateStartTime = (event, startTime) => {
        startTime = Moment(startTime.setSeconds(0));
        this.props.updateStartTime(startTime);
        const { startDate } = this.props;
        if (startDate === null) {
            this.setState({
                startTimeError: null,
            });
        } else {
            this.validateStartDateTime(startDate, startTime);
        }
    };

    handleUpdateDuration = (event, duration) => {
        if (duration === '') {
            duration = null;
            this.setState({
                durationError: '* Este campo es obligatorio.',
            });
        } else {
            duration = Number(duration);
            if (duration > 0) {
                this.setState({
                    durationError: null,
                });
            } else {
                duration = null;
                this.setState({
                    durationError: '* Este campo es obligatorio.',
                });
            }
        }
        this.props.updateDuration(duration);
    };

    handleUpdateTitle = (event, title) => {
        if (title === '') {
            title = null;
            this.setState({
                titleError: '* Este campo es obligatorio.',
            });
        } else {
            this.setState({
                titleError: null,
            });
        }
        this.props.updateTitle(title);
    };

    handleUpdateDescription = (event, description) => {
        if (description === '') {
            description = null;
        }
        this.props.updateDescription(description);
    };

    handleUpdateLocation = (event, location) => {
        if (location === '') {
            location = null;
        }
        this.props.updateLocation(location);
    };

    handleUpdateSeats = (event, seats) => {
        if (seats === '') {
            seats = null;
        } else {
            seats = Number(seats);
            if (seats <= 0) {
                seats = null;
            }
        }
        this.props.updateSeats(seats);
    };

    componentWillMount() {
        document.title = 'Arena | Nueva actividad';
        this.props.getSports();
    }

    render() {
        const {
            stepIndex, sportError, startDateError, startTimeError, durationError, titleError, seatsError,
        } = this.state;
        const {
            sport, sports, isLoading, startDate, startTime, duration, title, description, location, seats,
            postActivity, isRedirectable,
        } = this.props;

        const now = Moment();
        const twoYearsLater = Moment().add(2, 'years');

        return (
            <Container style={ styles.container }
                       fluid
            >
                { isRedirectable &&
                    <Redirect to={'/actividades'}/>
                }
                <Col style={ styles.container }
                     xs={11} sm={11} md={8} lg={8} xl={6}
                     offset={ {xs: 0.5, sm: 0.5, md: 2, lg: 2, xl: 3} }
                >
                    <Paper style={ styles.paper }>
                        <Stepper style={styles.stepper}
                            activeStep={ stepIndex }
                            orientation="vertical"
                        >
                            <Step>
                                <StepLabel>¿Qué deporte se practicará?</StepLabel>
                                <StepContent>
                                    { isLoading ?
                                        <RefreshIndicator style={ styles.loading }
                                                          left={0}
                                                          top={40}
                                                          status="loading"
                                        />
                                        :
                                        <div>
                                            <AutoComplete
                                                fullWidth
                                                floatingLabelText={'Deporte'}
                                                filter={ AutoComplete.fuzzyFilter }
                                                dataSource={ sports }
                                                dataSourceConfig={ {text: 'name', value: '@id'} }
                                                searchText={ sport ? sport.name : '' }
                                                maxSearchResults={5}
                                                onUpdateInput={ this.handleUpdateSport }
                                                errorText={ sportError }
                                            />
                                            <RaisedButton
                                                backgroundColor="#009688"
                                                labelColor="#ffffff"
                                                fullWidth
                                                label="Siguiente"
                                                disabled={ sportError !== null }
                                                onTouchTap={ this.handleNext }
                                            />
                                        </div>
                                    }
                                </StepContent>
                            </Step>
                            <Step>
                                <StepLabel>¿Cuándo comenzará?</StepLabel>
                                <StepContent>
                                    <Row style={ styles.container }>
                                        <Col style={ styles.container }
                                             xs={12} sm={5.5} md={5.5} lg={5.5} xl={5.5}
                                        >
                                            <DatePickerComposition
                                                floatingLabelText="Fecha de inicio"
                                                minDate={ now.toDate() }
                                                maxDate={ twoYearsLater.toDate() }
                                                value={ startDate ? startDate.toDate() : null }
                                                errorText={ startDateError }
                                                onChange={ this.handleUpdateStartDate }
                                            />
                                        </Col>
                                        <Col style={ styles.container }
                                             xs={12} sm={5.5} md={5.5} lg={5.5} xl={5.5}
                                             offset={ { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 } }
                                        >
                                            <TimePickerComposition
                                                floatingLabelText="Hora de inicio"
                                                value={ startTime ? startTime.toDate() : null }
                                                errorText={ startTimeError }
                                                onChange={ this.handleUpdateStartTime }
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={ styles.container }>
                                        <Col style={ styles.container }>
                                            <TextField
                                                type="text"
                                                pattern="\d*"
                                                fullWidth
                                                floatingLabelText="Duración (en minutos)"
                                                value={ duration ? duration : '' }
                                                errorText={ durationError }
                                                onChange={ this.handleUpdateDuration }
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={ styles.container }>
                                        <Col style={ styles.container }
                                             xs={6} sm={5.5} md={5.5} lg={5.5} xl={5.5}>
                                            <FlatButton
                                                fullWidth
                                                label="Atrás"
                                                onTouchTap={ this.handlePrev }
                                            />
                                        </Col>
                                        <Col style={ styles.container }
                                             xs={6} sm={5.5} md={5.5} lg={5.5} xl={5.5}
                                             offset={ {xs: 0, sm: 1, md: 1, lg: 1, xl: 1} }
                                        >
                                            <RaisedButton
                                                fullWidth
                                                backgroundColor="#009688"
                                                labelColor="#ffffff"
                                                label="Siguiente"
                                                disabled={
                                                    startDateError !== null ||
                                                    startTimeError !== null ||
                                                    durationError !== null
                                                }
                                                onTouchTap={ this.handleNext }
                                            />
                                        </Col>
                                    </Row>
                                </StepContent>
                            </Step>
                            <Step>
                                <StepLabel>Ponga título a la actividad.</StepLabel>
                                <StepContent>
                                    <Row style={ styles.container }>
                                        <Col style={ styles.container }>
                                            <TextField
                                                fullWidth
                                                floatingLabelText="Título"
                                                value={ title ? title : '' }
                                                onChange={ this.handleUpdateTitle }
                                                errorText={ titleError }
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={ styles.container }>
                                        <Col style={ styles.container }
                                             xs={6} sm={5.5} md={5.5} lg={5.5} xl={5.5}>
                                            <FlatButton
                                                fullWidth
                                                label="Atrás"
                                                onTouchTap={ this.handlePrev }
                                            />
                                        </Col>
                                        <Col style={ styles.container }
                                             xs={6} sm={5.5} md={5.5} lg={5.5} xl={5.5}
                                             offset={ {xs: 0, sm: 1, md: 1, lg: 1, xl: 1} }
                                        >
                                            <RaisedButton
                                                fullWidth
                                                backgroundColor="#009688"
                                                labelColor="#ffffff"
                                                label="Siguiente"
                                                disabled={ titleError !== null }
                                                onTouchTap={ this.handleNext }
                                            />
                                        </Col>
                                    </Row>
                                </StepContent>
                            </Step>
                            <Step>
                                <StepLabel>Complete la información de la actividad.</StepLabel>
                                <StepContent>
                                    <Row style={ styles.container }>
                                        <Col style={ styles.container }>
                                            <TextField
                                                fullWidth
                                                floatingLabelText="Descripción"
                                                value={ description ? description : '' }
                                                onChange={ this.handleUpdateDescription }
                                                multiLine
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={ styles.container }>
                                        <Col style={ styles.container }>
                                            <TextField
                                                fullWidth
                                                floatingLabelText="Lugar"
                                                value={ location ? location : ''}
                                                onChange={ this.handleUpdateLocation }
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={ styles.container }>
                                        <Col style={ styles.container }>
                                            <TextField
                                                type="text"
                                                pattern="\d*"
                                                fullWidth
                                                floatingLabelText="Plazas (infinitas por defecto)"
                                                value={ seats ? seats : '' }
                                                errorText={ seatsError }
                                                onChange={ this.handleUpdateSeats }
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={ styles.container }>
                                        <Col style={ styles.container }
                                             xs={6} sm={5.5} md={5.5} lg={5.5} xl={5.5}>
                                            <FlatButton
                                                fullWidth
                                                label="Atrás"
                                                onTouchTap={ this.handlePrev }
                                            />
                                        </Col>
                                        <Col style={ styles.container }
                                             xs={6} sm={5.5} md={5.5} lg={5.5} xl={5.5}
                                             offset={ {xs: 0, sm: 1, md: 1, lg: 1, xl: 1} }
                                        >
                                            <RaisedButton
                                                fullWidth
                                                backgroundColor="#009688"
                                                labelColor="#ffffff"
                                                label="Crear actividad"
                                                onTouchTap={ () => postActivity(
                                                    title,
                                                    Moment(startDate.format('YYYY-MM-DD') + 'T' +
                                                        startTime.format('HH:mm:ss')).format(),
                                                    duration,
                                                    location,
                                                    description,
                                                    seats,
                                                    sport['@id'],
                                                )}
                                            />
                                        </Col>
                                    </Row>
                                </StepContent>
                            </Step>
                        </Stepper>
                    </Paper>
                </Col>
            </Container>
        );
    }
}
