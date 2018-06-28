import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { firebaseConnect } from 'react-redux-firebase';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    list: {
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,   
    },
    button: {
        width: "100%"
    }
})

class BlogBlurb extends Component {
    render() {
        const { classes, blogPosts } = this.props;
        return (
            <Grid container spacing={16} className={classes.root} align="center" justify="center" alignItems="flex-end">
                <Grid item xs={11}>
                    <Button variant="raised" color="primary" className={classes.button} component={Link} to={"/blog"}>unWine Lounge blog</Button>
                </Grid>
                <Grid  item xs={11}>
                    <List className={classes.list} >
                        { blogPosts ? (Object.values(blogPosts).map( (post, index) => {       
                            return (
                                <ListItem dense button key={index} component={Link} to={'/blog/' + post.blogDate} >
                                    <Avatar>
                                        <RssFeedIcon />
                                    </Avatar>
                                    <ListItemText primary={post.blogTitle} secondary={new Date(post.blogDate).toLocaleString()}/>       
                                </ListItem> 
                            )
                        }) ) : null }
                    </List>
                </Grid>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        blogPosts: state.firebase.data['blogPosts']
    }
}

export default compose(
    firebaseConnect(['blogPosts']),
    connect(mapStateToProps),
    withStyles(styles)
)(BlogBlurb )