import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
//import { /* Field, */ reduxForm } from 'redux-form';
//import renderTextField from '../../components/renderTextField';
//import { firebaseConnect } from 'react-redux-firebase';




const styles = {
    root: {
        flexGrow: 1
    }
}

class SendNotification extends Component {

    render() {
        const { classes } = this.props;
        return (
            <Grid container spacing={16} className={classes.root}>
                <h1>this where you send notifications</h1>
            </Grid>
        )
    }
}

export default compose(
    withStyles(styles),
    /* reduxForm({
        form: 'Notifications'
    }) */
)(SendNotification);