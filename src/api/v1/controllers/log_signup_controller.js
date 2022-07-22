require("dotenv").config();

let { User } = require("../../../models/");
let { handle_err } = require("../../../error_handeling");



let secret_key = process.env.jwtSecret;

let jwt = require("jsonwebtoken");


//controller for logging the user in

let login_post = async (req, res) => {
    console.log(req.body);
    try {
        let user = await User.login(req.body.email, req.body.password);
        let userId = user._id;
        let encoded_user_id = jwt.sign({userId}, secret_key);
        next({id : encoded_user_id, username : user.username}, 200, "successfully logged in", null);
    }
    catch (err) {
        console.log(err);
        let errors = handle_err(err);
        next(null, 400, "error logging in the user", err.message);
    }
}


//controller for signing the user up

let signup_post = async (req, res) => {
    console.log("came to signup");
    console.log(req.body);
    let user = new User(req.body);
    try {
        let us = await user.save();
        let userId = us._id;
        let encoded_user_id = jwt.sign({userId}, secret_key);
        next({id : encoded_user_id, username : us.username}, 200, "successfully signed up", null);
    }
    catch (err) {
        console.log(err);
        let errors = handle_err(err);
        console.log(errors);
        next(errors, 400, "could not sign up user", err.message);
    }
}


module.exports = { login_post, signup_post };
