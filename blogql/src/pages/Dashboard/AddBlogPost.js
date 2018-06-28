import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core';
//import { Field, reduxForm } from 'redux-form';
import RenderTextField from '../../components/RenderTextField';
import RenderMultiField from '../../components/RenderMultiField';
//import { firebaseConnect } from 'react-redux-firebase';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ImageUpload from './ImageUpload';
import BlogProvider, { BlogContext } from '../../context/BlogProvider';

const styles = {
    root: {
        flexGrow: 1
    },
    textField: {
        width: "100%"
    },
    multiField: {
        width: "100%"
    },
    button: {
        width: "100%"
    },
    flex: {
        flex: 1
    },
    fileInput: {
        border: "2px dashed black",
        height: "100%"
    }
}

class AddBlogPost extends Component {
    render() {
        const { classes } = this.props; 
        //blogPost.blogUploadImage = 'https://www.google.com/images/spin-32.gif';
        return (
            <BlogProvider>
            <Grid className={classes.root} container spacing={0}>
                <Grid item xs={12}>
                    <Typography variant="headline" gutterBottom align="right">
                        Add a blog post
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <BlogContext.Consumer>
                   {blogCtx => (<form id="postForm" onSubmit={(event) => {
                        event.preventDefault();
                        blogCtx.submitPost()
                    }}>

                        <Grid container spacing={16} alignItems="center">
                            <Grid item xs={11} md={8}>
                                <RenderTextField 
                                    value={blogCtx.postForm.title}
                                    onChange={(event) => {
                                        blogCtx.handlePostChange(event);
                                    }}
                                    className={classes.textField} 
                                    label="Title" 
                                    id="post-title" 
                                    name="title"  
                                    type="text"
                                />
                                <br/>
                                <RenderMultiField
                                    value={blogCtx.postForm.content}
                                    onChange={(event) => {
                                        blogCtx.handlePostChange(event);
                                    }}
                                    className={classes.multiField} 
                                    label="Thoughts" 
                                    id="userEmail" 
                                    name="content"  
                                    type="text" 
                                />
                                <br/>  
                            </Grid>
                            <Grid item xs={11} md={4}>
                            <ImageUpload
                                onChange={(event) => {
                                    blogCtx.handlePostChange(event);    
                                }}   
                                name="postImage"  
                            />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" className={classes.button} variant="raised" color="primary">Post</Button>
                            </Grid>
                        </Grid>

                    </form>)} 
                    </BlogContext.Consumer>
                </Grid>
            </Grid>
            </BlogProvider>
        )
    }
}

export default compose(
    withStyles(styles)
)(AddBlogPost);