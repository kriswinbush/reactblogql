let { buildSchema } = require('graphql');

let schema = buildSchema(`
    type Query {
        course(_id: String!): Course
        courses(topic: String): [Course]
        allCourses: [Course]
        signIn(userName: String!, password: String!): TokenUser
        allBlogPost: [BlogPost]
        getBlogPost(_id: String!, photoUrl: String):BlogPost
    }
    type Mutation {
        updateCourseTopic(_id: String!, topic: String!): Course
        signUp(userName: String!, password: String!): User
        createBlogPost(title: String!, photoUrl:String,timestamp:String!, author: String!, content:String!, comments:CommentInput):BlogPost
    }
    type TokenUser {
        _id: String
        userName: String
        password: String
        token: String
    }
    type User {
        _id: String
        userName: String
        password: String
    }

    type Course {
        _id: String
        title: String
        author: String
        description: String
        topic: String
        url: String
    }

    type BlogPost {
        _id: String
        title: String
        timestamp: String
        author: String
        content: String
        comments: [String]
        photoUrl: String
    }
    input CommentInput {
        _id: String
        content: String
        postId: String
        author: String
        rating: String
    }
    type Comment {
        _id: String
        content: String
        postId: String
        author: String
        rating: String
    }
`);

module.exports = schema;