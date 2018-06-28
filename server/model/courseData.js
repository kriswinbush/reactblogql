let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let courseSchema = new Schema({
    courseId: Number,
    title: String,
    author: String,
    description: String,
    topic: String,
    url: String
}, {collection: "courses"});

let DbCourseData = mongoose.model('DbCourseData', courseSchema);

module.exports = DbCourseData;