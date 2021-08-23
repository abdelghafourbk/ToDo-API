const express = require("express"),
    { updateUser} = require("../middlewares/user"),
    {isLoggedIn} = require("../middlewares/auth");
    router = express.Router();
    router.route("/updateUser/:id").put(isLoggedIn,updateUser);
    router.route("/showusers").get();
    // createUser
module.exports = router;



