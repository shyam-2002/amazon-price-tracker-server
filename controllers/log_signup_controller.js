require("dotenv").config();

let { userModel } = require("../models/user_schema");
let { handle_err } = require("../error_handeling");


let secret_key = process.env.jwtSecret;

let jwt = require("jsonwebtoken");


//controller for logging the user in

let login_post = async (req, res) => {
    console.log(req.body);
    try {
        let user = await userModel.login(req.body.email, req.body.password);
        let userId = user._id;
        let encoded_user_id = jwt.sign({userId}, secret_key);
        res.send({id : encoded_user_id, username : user.username});
    }
    catch (err) {
        console.log(err);
        let errors = handle_err(err);
        res.send({ errors });
    }
}


//controller for signing the user up

let signup_post = async (req, res) => {
    console.log("came to signup");
    console.log(req.body);
    let user = new userModel(req.body);
    try {
        let us = await user.save();
        let userId = us._id;
        let encoded_user_id = jwt.sign({userId}, secret_key);
        res.send({id : encoded_user_id, username : us.username});
    }
    catch (err) {
        console.log(err);
        let errors = handle_err(err);
        console.log(errors);
        res.send({ errors })
    }
}


module.exports = { login_post, signup_post };
