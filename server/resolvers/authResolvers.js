let DbUserData = require('../model/userData.js');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

module.exports = {
    signUpUser: async ({userName, password}) => {
        try {
            var hash = await bcrypt.hash(password, 10);
        }
        catch(err) {
            console.log(err);
        };
        return new DbUserData({userName: userName, password: hash}).save();
    },
    signInUser: async ({userName, password}) => {
        try {
            var user = await DbUserData.where({userName: userName}).findOne();
    
            if(!user) {
                throw new Error("No User with that username");
            }
            var result = await bcrypt.compare(password, user.password);
            
            if(result) {
                const JWTToken = jwt.sign({
                    userName: user.userName,
                    _id: user._id
                },'secret',{expiresIn: "1h"});
                user.token = JWTToken;
                return user;
            }
        } catch(err) {
            console.log(err)
            return err;
        }
    }

}