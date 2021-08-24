const express = require("express"),
 {AddTask} = require("../middlewares/task"),
{isLoggedIn} = require("../middlewares/auth");
    router = express.Router();
    router.route("/AddTask").post(isLoggedIn,AddTask);
    module.exports = router;
