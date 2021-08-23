const User = require("../models/user");

module.exports = {
    createUser: async (req, res,next) => {
       
        const { username, password, email, image } = req.body;
        try {
            const user = await User.create({ username, password, email, image });
            res.status(201).json(user.insertToken());
        } catch (e) {
            next({ message: e.message, status: 500 });
        }
    },
    logUser: async (req, res,next) => {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ username });
            if (!user) return next({
                message: "we didn,t find any user with this username!: "+username,
                status: 401,
            });
            if (!(await user.comparePasswords(password)))
                throw Error("Wrong Password,Try again !!");
            res.status(201).json(user.insertToken());
        } catch (e) {
            next({ message: e.message, status: 500 });
        }
    },
    updateUser: async (req, res,next) => {
        const { username, password } = req.body,
            id = req.params.id;
        try {
            if (!(id.toString()==(req.user._id).toString()))
            return next({
                message: "You aren't allowed to update other Users infos.",
                status: 401,
            });
            const u = await User.findById(id);
            u.username = username ? username : u.username;   
            u.password = password ? password : u.password;
            await u.save();
            res.status(201).send(u);
        } catch (e) {
            next({ message: e.message, status: 500 });
        }
    },

    // deleteUser: async(req, res, next) => {
    //     const{username, password} = req.body,
    //         id=req.params.id;
    //     try{
    //         if (!(id.toString()==(req.user._id).toString()))
    //         return next({
    //             message: "You aren't allowed to delete other Users.",
    //             status: 401, 
    //         });
    //     const u = await User.findById(id);
    //     u.username = username ? username : u.username;   
    //     u.password = password ? password : u.password;
    //     await u.delete();
    // },

    // deleteImage : async(req,res,next)=>
    // {

        
    // }
    // ,


    

};