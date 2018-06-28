let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let commentSchema = new Schema({
    content: String,
    author: String,
    postId: String,
    rating: String
}, {collection: "comments"});

let DbCommentData = mongoose.model('DbCommentData', commentSchema);

module.exports = DbCommentData;
