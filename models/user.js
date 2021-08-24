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
        required : true,
        unique: true,
    },
    password :
    {
        type:String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image:{
        type:String,
    }
    
});
userSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) this.password = await bcrypt.hash(this.password, 13);
        next();
    } catch (e) {
        next(e);
    }
    });
    userSchema.methods.comparePasswords = async function (passwordSent, next) {
    try {
        return await bcrypt.compare(passwordSent, this.password);
    } catch (e) {
        next(e);
    }
};
userSchema.methods.insertToken = function () {
    let user = this.toObject();
    delete user.password;
    user.token = jwt.sign(
        {
            id: user._id,
            username: user.username,
        },
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiWW91Y2VmIiwibGFzdE5hbWUiOiJNYWRhZGkifQ.Uv4mrLKQWkOjAps3m83Dle8YIU1wC37dFM3FNAKXugg",
        {
            expiresIn: "100h",
        }
    );
    return user;
    };
   
module.exports = mongoose.model("User", userSchema);