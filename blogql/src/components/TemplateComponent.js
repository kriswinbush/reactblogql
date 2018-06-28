import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import compose from 'recompose/compose';

const styles = {
    root: {
        flexGrow: 1
    }
}
class TemplateComponent extends Component {

    render() {
        const { classes } = this.props;
        return (
            <Grid container spacin={0} className={classes.root}>
                <Grid item xs={12}>
                    <h1>template component</h1>
                </Grid>
            </Grid>
        )
    }
}

export default compose(
    withStyles(styles)
)(TemplateComponent);