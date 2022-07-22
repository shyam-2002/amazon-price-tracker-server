const express = require("express");
let { login_post, signup_post } = require("../controllers/log_signup_controller");
let {send_response } = require("../middlewares/response");

let router = express.Router();

//router for handeling login , signup post requests

router.post("/login", login_post, send_response);
router.post("/signup", signup_post, send_response);

module.exports =  router ;