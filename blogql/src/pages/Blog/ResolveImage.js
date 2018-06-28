import React, { Component } from 'react';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { BlogContext } from '../../context/BlogProvider';

const styles = {
    root: {
        flexGrow: 1
    },
    image : {
        maxWidth: "100%",
        height: "auto"
    }
}
class ResolveImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageUrl: ""
        }
    }
    //componentDidMount() {
        //const { ctx, post} = this.props
        ///console.log(ctx)
        /* if(post.photoUrl.length > 0 ) {
           var file = ctx.getBlogImage(post.photoUrl)
           file.then(data => {
            var fileURL = URL.createObjectURL(data); 
            this.setState({imageUrl: fileURL})
           });
           
        } */
   //}
    /* componentWillReceiveProps(nextProps) {
        console.log("next props getting called")
        if(nextProps.post.comments[0].length > 0) {
            console.log('length has val')
            this.setState({imageUrl: nextProps.post.comments[0]})
        }
        
    } */
    render() {
        const { post, classes } = this.props;
        return (
            <BlogContext.Consumer>
                {blogCtx => {
                        return (<img className={classes.image} src={blogCtx.blogPost.comments && blogCtx.blogPost.comments[0]} alt={post.title} />)
                    }
                }
            </BlogContext.Consumer>    )
        //return null
    }
}

export default compose(
    withStyles(styles)
)(ResolveImage);
