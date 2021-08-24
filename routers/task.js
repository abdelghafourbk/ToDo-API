const express = require("express"),
    {AddTask, ShowTasks, ShowCompletedTasks, UpdateTask, DeleteTask,ShowSpecificTask} = require("../middlewares/task"),
    {isLoggedIn} = require("../middlewares/auth");
    router = express.Router();
    router.route("/AddTask").post(isLoggedIn,AddTask);
    router.route("/ShowTasks").get(isLoggedIn,ShowTasks);
    router.route("/ShowCompletedTasks").get(isLoggedIn, ShowCompletedTasks);
     router.route("/UpdateTasks/:id").put(isLoggedIn, UpdateTask);
     router.route("/DeleteTask/:id").delete(isLoggedIn,DeleteTask);
     router.route("/ShowSpecificTask/:id").get(isLoggedIn,ShowSpecificTask);
    module.exports = router;        