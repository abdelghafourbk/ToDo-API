const User = require("../models/user"),
    jwt = require("jsonwebtoken");
module.exports = {
    isLoggedIn: async (req, res, next) => {
        
        if (!req.headers.authorization)
            return res.status(400).send("You don't have the authorization");
        const token = req.headers.authorization.replace("Bearer ", "");
        try {
            let payload = jwt.verify(token, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiWW91Y2VmIiwibGFzdE5hbWUiOiJNYWRhZGkifQ.Uv4mrLKQWkOjAps3m83Dle8YIU1wC37dFM3FNAKXugg");
            req.user = await User.findById(payload.id).select({ password: 0 });
            if(req.user)
        {
            next();
        }else{
            res.status(404).json("User Not Found");
        }

          
        } catch (e) {
            switch (e.constructor) {
                case jwt.TokenExpiredError:
                    return res.status(401).send("Your token has been expired");
                case jwt.JsonWebTokenError:
                    return res.status(401).send("Your token is unvalid");
            }
        }
    },
   
};