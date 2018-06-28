import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { Link } from 'react-router-dom';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { BlogContext } from '../../context/BlogProvider';
import ResolveImage from './ResolveImage';

const styles = {
    root: {
        flexGrow: 1,
        width: "100%"
    },
    card: {
        maxWidth: "100%",
    },
    media: {
        height: "auto",
        maxWidth: "100%",
        paddingTop: '56.25%', // 16:9
    }
}

class BlogList extends Component {
    render() {
        const { classes, match } = this.props;
        return (
            <BlogContext.Consumer>
                {blogCtx => { 
                    return (<Grid container spacing={16} className={classes.root} alignContent="space-around">
                        {blogCtx.blogPostList.map((post, index) => { 
                            return (
                            <Grid key={index} item xs={12} sm={6} md={4}>
                            
                                <Card className={classes.card}>
                                    <CardHeader
                                        title={post.title}
                                        subheader={new Date(+post.timestamp).toLocaleString()}
                                    />
                                    {post.photoUrl.length > 0 && <CardMedia
                                        className={classes.media}
                                        image={post.title}
                                        component={() => <ResolveImage ctx={blogCtx} post={post} />}
                                        title={post.title}
                                    />}
                                    <CardContent>
                                        <Typography component="p">
                                            {post.content.substring(0, 200) + '...'}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button component={Link} to={match.url + '/' + post._id}>Read More</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })}
                        
                    </Grid>)
                    }
                }   
            </BlogContext.Consumer>
        )
    }
}

export default compose(
    withStyles(styles)
)(BlogList)