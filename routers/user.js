const express = require("express"),
    { updateUser, logoutUser,deleteUser,uploadImage,deleteUserImage} = require("../middlewares/user"),
    {isLoggedIn} = require("../middlewares/auth");
    router = express.Router();
    router.route("/updateUser/:id").put(isLoggedIn,updateUser);
    router.route("/Logout/:id").get(isLoggedIn,logoutUser);
    router.route("/deleteUser/:id").delete(isLoggedIn,deleteUser);
    router.route("/uploadImage/:id").put(isLoggedIn,uploadImage);
    router.route("/deleteUserImage/:id").delete(isLoggedIn,deleteUserImage);
module.exports = router;





