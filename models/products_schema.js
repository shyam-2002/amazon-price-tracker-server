const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let productSchema = new Schema({
    productName : {
        type : String,
        required : true
    },
    productUrl : {
        type : String,
        required : true,
    },
    currentPrice : {
        type : Number,
        required : true
    },
    thresholdPrice : {
        type : Number,
        required : true
    },
    userId : {
       type : String,
       required : true
    }
}, {timestamps : true});

let productModel = mongoose.model("product", productSchema);

module.exports = {productModel};

