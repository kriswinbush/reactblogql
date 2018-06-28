let DbCourseData = require('../model/courseData.js');

module.exports = {
    getAllCourses: (args, req) => {
        console.log(req.user)
        if(!req.user) {
            throw new Error('users token is expired')
        }
        return DbCourseData.find();
    },
    getCourse: (args) => DbCourseData.where({_id: args._id}).findOne(),
    getCourses: (args, req) => {
        console.log(req.user);
        /* if(!req.user) {
            throw new Error('user must login')
        } */
        return DbCourseData.where({topic: args.topic}).find();
    },
    updateCourseTopic: ({_id, topic}) => DbCourseData.findOneAndUpdate({_id:_id},{$set:{topic: topic}}, {new: true})
}