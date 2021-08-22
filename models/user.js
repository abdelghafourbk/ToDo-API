const mongoose = require("mongoose"),
jwt = require("jsonwebtoken"),
bcrypt = require("bcrypt");
// user schema

//     "name": String,
//     "email": “@gmail.com",
//     "password": String,
//     "image": String,

let userSchema = new mongoose.Schema({
    username:
    {
    type : String ,
    required : true
    },
    password :
    {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image:{
        type:String
    }

});
module.exports = mongoose.model("user", userSchema);