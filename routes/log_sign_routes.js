const express = require("express");
let { login_post, signup_post } = require("../controllers/log_signup_controller");

let log_signup_router = express.Router();

//router for handeling login , signup post requests

log_signup_router.post("/login", login_post);
log_signup_router.post("/signup", signup_post);

module.exports = { log_signup_router };