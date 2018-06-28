import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
//import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom';
//import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { BlogContext } from '../../context/BlogProvider';
import ResolvePost from './ResolvePost';
const styles = {
    root: {
        flexGrow: 1
    },
    card : {
        height: "80%"
    }
}

class BlogItem extends Component {
    render() {
        const { classes, history, match } = this.props;
        return (
            <BlogContext.Consumer>

                {blogCtx => {
                    return (<Grid container spacing={16} className={classes.root} justify="center">
                        <ResolvePost ctx={blogCtx} {...this.props} />
                    </Grid>)
                    } 
                }

            </BlogContext.Consumer>
        )
    }
}

export default compose(
    withStyles(styles)
)(BlogItem)

/* 

return (<Grid container spacing={16} className={classes.root} justify="center">
                            {blogCtx.blogPostList.filter(post => post._id === match.params.blog).map( (post) => {       
                                return (
                                    <Grid key={post._id} item xs={10}>
                                    <Card>
                                        <CardContent>
                                            <h3>{post.title}</h3>
                                            <h4>{new Date(+post.timestamp).toLocaleString()}</h4>
                                            <p>{post.content}</p>
                                        </CardContent>
                                        <CardActions>
                                            <Button onClick={history.goBack}>Back</Button>
                                            <Button component={Link} to={"/blog"}>Blog</Button>
                                        </CardActions>
                                        
                                    </Card>
                                    </Grid>
                                )
                            })}
                        </Grid>)

*/