import React, { Component, PropTypes } from 'react';
import { Container, Col } from 'react-grid-system';
import Moment from 'moment';

import RefreshIndicator from 'material-ui/RefreshIndicator';
import ActivityItem from '../containers/ActivityItem';
import FlatButton from 'material-ui/FlatButton';

const styles = {
    container: {
        padding: 0,
    },
    loading: {
        position: 'relative',
        margin: '0px auto 80px auto',
    },
    activities: {
        padding: 0,
        marginBottom: '5mm',
        marginTop: '1cm',
    },
};

export default class ActivitiesList extends Component {
    static propTypes = {
        activities: PropTypes.array.isRequired,
    };

    static defaultProps = {
        hasNewButton: false,
    };

    componentWillMount() {
        document.title = this.props.documentTitle;
        this.props.getActivities();
    }

    render() {
        const { activities, isLoading, get, hasNewButton, noActivitiesLabel } = this.props;
        return (
            <Container style={ styles.container }
                       fluid
            >
                { hasNewButton &&
                    <FlatButton
                        href="/actividades/nueva"
                        backgroundColor="#00897B"
                        label="Crear una nueva actividad"
                        hoverColor="#00796B"
                        labelStyle={ {color: "#ffffff"} }
                        fullWidth
                    />
                }
                { isLoading ?
                    <RefreshIndicator style={ styles.loading }
                                      left={0}
                                      top={40}
                                      status="loading"
                    />
                    :
                    <Col style={ styles.activities }>
                        { activities.length > 0 ?
                            activities.map(
                                activity => {
                                    const {
                                        title, startsAt, duration, location, description,
                                        seats, owner, sport, status, acceptedRegistrationsCount,
                                    } = activity;
                                    return (
                                        <Col style={ styles.container }
                                             key={ activity['@id'] }
                                             xs={11} sm={11} md={11} lg={5.25} xl={5.25}
                                             offset={{xs: 0.5, sm: 0.5, md: 0.5, lg: 0.5, xl: 0.5}}
                                        >
                                            <ActivityItem
                                                expandable
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
                                                get={ get }
                                            />
                                        </Col>
                                    );
                                }
                            )
                            :
                            <Col style={ styles.container }
                                 xs={11} sm={11} md={11} lg={11} xl={11}
                                 offset={{xs: 0.5, sm: 0.5, md: 0.5, lg: 0.5, xl: 0.5}}
                            >
                                <p>{ noActivitiesLabel }</p>
                            </Col>
                        }
                    </Col>
                }
            </Container>
        );
    }
}
