let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    userName: String,
    password: String
}, {collection: "users"});

let DbUserData = mongoose.model('DbUserData', userSchema);

module.exports = DbUserData;