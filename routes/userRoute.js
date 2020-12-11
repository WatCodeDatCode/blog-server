const express = require("express");
const router = express.Router();
const userHandlers = require("../controllers/userController.js");

router.post("/tasks", userHandlers.loginRequired, userHandlers.profile);

router.post("/register", userHandlers.register);

router.post("/login", userHandlers.login);

module.exports = router;
