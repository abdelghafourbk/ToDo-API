const express = require("express"),
    {isLoggedIn} = require("../middlewares/auth"),
    {deleteProject, AddProject, addUsersToProject, addTaskToProject, isInProject,showProjects, deleteUserFromProject, deleteTaskFromProject}=require("../middlewares/project");
    router = express.Router();
    router.route("/AddProject").post(isLoggedIn,AddProject);
    router.route("/DeleteProject/:id").delete(isLoggedIn,isInProject,deleteProject);
    router.route("/AddUsersToProject/:id").put(isLoggedIn, isInProject, addUsersToProject);
    router.route("/AddTaskToProject/:id").put(isLoggedIn, isInProject, addTaskToProject);
    router.route("/showProjects").get(isLoggedIn,showProjects);
    router.route("/deleteUserFromProject/:id").delete(isLoggedIn,isInProject,deleteUserFromProject);
    router.route("/deleteTaskFromProject/:id").delete(isLoggedIn,isInProject,deleteTaskFromProject);
    module.exports = router;