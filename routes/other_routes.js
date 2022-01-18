const express = require("express");
let {get_data, add_data, verify_product, remove_item} = require("../controllers/other_controllers");

let {decode_user_id} = require("../middlewares/decodeer");

let other_router = express.Router();



other_router.post("/getdata", decode_user_id ,get_data);
other_router.post("/addproduct",decode_user_id, add_data);
other_router.post("/verifyProduct",decode_user_id, verify_product);
other_router.post("/remove_item", remove_item);

module.exports = {other_router};