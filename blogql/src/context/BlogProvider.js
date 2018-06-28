import React, {Component} from 'react';
import { httpReq, httpUpload, httpGetPhoto } from "../services/qlHttpReq";
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';

export const BlogContext = React.createContext();

class BlogProvider extends Component {
    state = {
        postForm: {
            title:"",
            content:"",
            postImage:""
        },
        blogPost: {},
        blogPostList: [],
        getBlogImage: async (id) => {
            let response = await ( await httpGetPhoto(id)).arrayBuffer();
            console.log(response)
            console.log(new Uint8Array(response))
            return new Blob([new Uint8Array(response)])
        },
        getBlogPost: async (id) => {
            let qlReq ={query: `{
                getBlogPost(_id: "5b292abddacfa68e36ba6597") {
                    _id
                    title
                    timestamp
                    content
                    comments
                  }
                }`}
                let result = await (await httpReq(qlReq)).json();
                //console.log(result.data.getBlogPost.comments[0])
                //console.log( Uint8Array.from(result.data.getBlogPost.comments[0]) )
                let r = atob(result.data.getBlogPost.comments);
                console.log(r)
                let bl = new Blob([r],{ type: 'image/png' });
                console.log(bl)
                let blURL = URL.createObjectURL(bl)
                console.log(blURL)
            result.data.getBlogPost.comments[0] = blURL/* URL.createObjectURL(new Blob([r])) */;
            this.setState({blogPost: result.data.getBlogPost})
        },
        getAllBlogPost: async () => {
            let qlReq = {query: `{ allBlogPost {title _id timestamp author content photoUrl } }`};
            let response = await httpReq(qlReq);
            let result = await response.json();
            if(result.errors && result.errors.length) {
                console.log(result)
            } else {
                console.log(result)
                this.setState({blogPostList: result.data.allBlogPost})
            }
        },
        handlePostChange: (event) => {
            const {name, value, files } = event.target;
            let form = this.state.postForm;
            files ? form[name] = files : form[name] = value; 
            this.setState({postForm: form});
            console.log(this.state);
        },
        submitPost: async () => {
            let {title, content, postImage} = this.state.postForm;
            const formData = new FormData();
            formData.append('postImage', postImage[0]);
            let photoResult = await (await httpUpload(formData)).json();
            console.log(photoResult);
            let qlReq = {query: `mutation {createBlogPost(title:"${title}",content:"${content}",photoUrl:"${photoResult.id}",timestamp:"${Date.now()}",author:"${"kris j winbush"}"){
                _id,
                title,
                content,
                photoUrl,
                timestamp,
                author,
                comments {
                  _id
                }
              }
            }`};
            let result = await (await httpReq(qlReq)).json();
            console.log(result);
        }
    }

    componentDidMount() {
        this.state.getAllBlogPost();
        this.state.getBlogPost('456');
    }

    render() {
        return (
            <BlogContext.Provider value={this.state}>
                {this.props.children}
            </BlogContext.Provider>
        )
    }
}

export default compose(
    withRouter
)(BlogProvider);