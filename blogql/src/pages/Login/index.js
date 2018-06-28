import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import compose from 'recompose/compose';
import { withRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import { Route } from 'react-router-dom';
import LoginAccount from './LoginAccount';
import CreateAccount from './CreateAccount';
import AuthProvider from '../../context/AuthProvider';
const styles = {
    root: {
        flexGrow: 1,
        marginTop: "64px"
    },
    title: {
        margin: "10px"
    },
    textField: {
        width: "100%"
    },
    button: {
        width:"100%"
    }
}

class Login extends Component {
    render() {
        const { classes, match } = this.props;
        return (
            <AuthProvider>
                <Grid container justify="center" className={classes.root} spacing={0}>
                    <Grid item xs={12}>
                        <Typography variant="display3" gutterBottom>
                            Accounts
                        </Typography>  
                    </Grid>
                    <Grid item xs={12}>
                        <Route exact path={match.url} component={LoginAccount} />
                        <Route path={match.url + "/create"} component={CreateAccount} />
                    </Grid>
                </Grid>
            </AuthProvider>
        )
    }
}

export default compose (
    withRouter,
    withStyles(styles)
)(Login);