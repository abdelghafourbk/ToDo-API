const express = require("express"),
    { updateUser, logoutUser,deleteUser,uploadImage,deleteUserImage} = require("../middlewares/user"),
    {isLoggedIn} = require("../middlewares/auth");
    router = express.Router();
    router.route("/updateUser").put(isLoggedIn,updateUser);
    router.route("/Logout/:id").get(isLoggedIn,logoutUser);
    router.route("/deleteUser").delete(isLoggedIn,deleteUser);
    router.route("/uploadImage").put(isLoggedIn,uploadImage);
    router.route("/deleteUserImage").delete(isLoggedIn,deleteUserImage);
module.exports = router;



