import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppBar from '../components/AppBar';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';
import compose from 'recompose/compose';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Blog from '../pages/Blog';
import Dashboard from '../pages/Dashboard';
import AppProvider from '../context/AppProvider';

const styles = {
    root: {
        flexGrow: 1
    }
}

class AppContainer extends Component {

    render() {
        return (
            <Router>
            <AppProvider>
                <Grid container spacing={0} align="center">
                    <Grid item xs={12}>
                        <AppBar />
                    </Grid>
                    <Grid item xs={12}>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/home" component={Home} />
                            <Route exact path="/dashboard" component={Dashboard} />
                            <Route path="/blog" component={Blog} />
                        </Switch>
                    </Grid>
                </Grid>
            </AppProvider> 
            </Router>
        )
    }
}

export default compose(
    withStyles(styles)
)(AppContainer);