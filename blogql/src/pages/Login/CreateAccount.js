import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Button from '@material-ui/core/Button';
import compose from 'recompose/compose';
import  RenderTextField  from '../../components/RenderTextField';
//import { withFirebase } from 'react-redux-firebase';
import Grid from '@material-ui/core/Grid';
const styles = {
    root: {
        flexGrow: 1
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

class CreateAccount extends Component {
    submitHandler = (value) => {
        console.log(value);
        /* this.props.firebase.createUser(
            {email: value.userName, password: value.userPassword},
            {username: value.userName, something: "someval"})
            .then( user => {
                console.log(user)
                this.props.reset();
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err)
            }); */
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container justify="center" className={classes.root} spacing={0}>
                    <Grid item xs={11}>
                        <Card className={classes.nest}>
                            <Typography className={classes.title} variant="headline" component="h2" align="center">
                                Create An Account
                            </Typography>
                            <form onSubmit={this.submitHandler}>
                                <CardContent>
                                    <RenderTextField className={classes.textField} label="e-mail" name="userName" type="text" />
                                    <RenderTextField className={classes.textField} label="Password" name="userPassword" type="text" />
                                </CardContent>
                                <CardActions>
                                    <Button className={classes.button} type="submit" variant="raised">Create Account</Button>
                                </CardActions>
                            </form>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default compose (
   /*  withFirebase, */
    /* reduxForm({form: 'createUser'}), */
    withStyles(styles)
)(CreateAccount);