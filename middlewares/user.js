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
    logoutUser: async (req, res, next)=>{
        id= req.params.id;
        try{
            const user = await User.findById(id);
            // maybe we will replace the token with an empty string and then make it expired
            //after 1ms or make the old token expire directly but it's not supported with 
            //jwt .
            //we must delete the token here or make it expired after 1 ms or something
             //res.json({loggout: "successfully"});
             res.redirect('http://localhost:3000/auth/Login');
        }catch(e){
            next({ message: e.message, status: 500 });
            }
    },

    deleteUser: async(req,res,next)=>{
            id = req.params.id;
        try {
            const u = await User.findById(id);
            console.log(u.username);
            await u.remove();
            res.json({ deleted: "successfully" });
        } catch (e) {
            next({ message: e.message, status: 500 });
        }
    },

    uploadImage: async (req, res,next) => {
        const { image } = req.body,
            id = req.params.id;
        try {
            const u = await User.findById(id);
            u.image = image ? image : u.image;   
            await u.save();
            res.status(201).json(u);
        } catch (e) {
            next({ message: e.message, status: 500 });
        }
    },

    deleteUserImage: async(req,res,next)=>{
        id = req.params.id;
    try {
        const u = await User.findById(id);
         u.image="";
        await u.save();
        console.log(u.image);
        res.json({  deleted: "successfully" });
    } catch (e) {
        next({ message: e.message, status: 500 });
    }
},

    

};
