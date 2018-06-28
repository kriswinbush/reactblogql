import React, {Component} from 'react';
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
        flexGrow: 1
    }
}

class ResolvePost extends Component {

    componentDidMount() {
        this.props.ctx.getBlogPost('345');
        console.log(this.props.ctx.blogPost)

    }
    render() {
        const { classes, history, match } = this.props;
        return (
            <BlogContext.Consumer>
                {blogCtx => {
                    console.log(blogCtx.blogPost)
                    return(
                        <Grid item xs={10}>
                            <ResolveImage ctx={blogCtx} post={blogCtx.blogPost} />
                            <Card>
                                <CardContent>
                                    <h3>{blogCtx.blogPost.title}</h3>
                                    <h4>{new Date(+blogCtx.blogPost.timestamp).toLocaleString()}</h4>
                                    <p>{blogCtx.blogPost.content}</p>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={history.goBack}>Back</Button>
                                    <Button component={Link} to={"/blog"}>Blog</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                }}
            </BlogContext.Consumer>        
        )
    }
}

export default compose(
    withStyles(styles)
)(ResolvePost);