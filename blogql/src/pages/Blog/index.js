import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Route } from 'react-router-dom';
import BlogList from './BlogList';
import BlogItem from './BlogItem';
import BlogProvider from '../../context/BlogProvider';
const styles = {
    root: {
        flexGrow: 1
    }
};

class Blog extends Component {
    
    render() {
        const { classes, match } = this.props;
        return (
            <BlogProvider>
                <Grid container justify="center" className={classes.root} spacing={0}>
                    <Grid item xs={12}>
                        <Typography variant="display3" gutterBottom>
                            Blog
                        </Typography>  
                    </Grid>
                    
                    <Grid item xs={11}>
                            <Route exact path={match.url} component={BlogList} />
                            <Route path={match.url + "/:blog"} component={BlogItem} />

                    </Grid>
                </Grid>
            
            </BlogProvider>
        )
    }
}

export default withStyles(styles)(Blog);
