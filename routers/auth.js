const express = require("express"),
    {createUser, logUser} = require("../middlewares/user");
router = express.Router();
router.route("/Register").post(createUser);
router.route("/Login").post(logUser);

module.exports = router;