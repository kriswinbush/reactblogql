const { signInUser, signUpUser } = require('./authResolvers.js');
const { getAllCourses, getCourse, getCourses, updateCourseTopic } = require('./courseResolvers.js');
const { getAllBlogPost, createBlogPost, getBlogPost } = require('./blogResolver.js');

module.exports = {
    allBlogPost: getAllBlogPost,
    allCourses: getAllCourses,
    course: getCourse,
    courses: getCourses,
    updateCourseTopic: updateCourseTopic,
    signUp: signUpUser,
    signIn: signInUser,
    createBlogPost: createBlogPost,
    getBlogPost: getBlogPost
}
