import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ToolbarComposition from '../components/ToolbarComposition';

const user1 = {email:'email@email.com'};
const user2 = {email:'email@email.com', name:'Nombre Apellido1 Apellido2'};
const user3 = {email:'email@email.com', name:'Nombre Apellido1 Apellido2', avatar:'/avatar.jpg'};

storiesOf('Toolbar', module)
    .add('with not logged user', () => (
        <MuiThemeProvider>
            <ToolbarComposition title={ "Arena" } />
        </MuiThemeProvider>
    ))
    .add('with no name and no avatar', () => (
        <MuiThemeProvider>
            <ToolbarComposition title={ "Arena" } user= { user1 } />
        </MuiThemeProvider>
    ))
    .add('with no avatar', () => (
        <MuiThemeProvider>
            <ToolbarComposition title={ "Arena" } user= { user2 } />
        </MuiThemeProvider>
    ))
    .add('with avatar', () => (
        <MuiThemeProvider>
            <ToolbarComposition title={ "Arena" } user= { user3 } />
        </MuiThemeProvider>
    ));
