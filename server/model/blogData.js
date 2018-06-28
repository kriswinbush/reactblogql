let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let blogSchema = new Schema({
    title: String,
    author: String,
    content: String,
    timestamp: String,
    comments: Array,
    photoUrl: String
}, {collection: "blog"});

let DbBlogData = mongoose.model('DbBlogData', blogSchema);

module.exports = DbBlogData;