const express = require("express");
let {get_data, add_data, verify_product, remove_item} = require("../controllers/other_controllers");

let {decode_user_id} = require("../middlewares/decodeer");
let {send_response } = require("../middlewares/response");

let router = express.Router();



router.post("/getdata", decode_user_id ,get_data, send_response);
router.post("/addproduct",decode_user_id, add_data, send_response);
router.post("/verifyProduct",decode_user_id, verify_product, send_response);
router.post("/remove_item", remove_item, send_response);

module.exports = router;