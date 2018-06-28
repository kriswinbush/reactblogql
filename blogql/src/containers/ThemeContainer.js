import React, { Component } from 'react';
import indigo from '@material-ui/core/colors/indigo';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppContainer from './AppContainer';

class ThemeContainer extends Component {
    state = {
        theme: createMuiTheme({
            palette: {type: "light", indigo: indigo}
        })
    }

    render() {
        return (
            <MuiThemeProvider theme={this.state.theme}>
                <AppContainer />
            </MuiThemeProvider>
        )
    }
}
export default ThemeContainer;