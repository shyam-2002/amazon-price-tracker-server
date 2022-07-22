let { Product } = require("../models/products_schema");


// controller for getting the product data a user has added

let get_data = async (req, res) => {
    console.log("hi");
    try {
        console.log(req.body);
        let products = await User.findOne({_id : req.body.userId}).populate({path : "tracking_list", select : "name url prices.$.last"});
        res.send({ products });
    }
    catch (err) {
        console.log(err);
    }
};


// controller to add a new product

let add_data = async (req, res) => {
    console.log("adding product");
    console.log(req.body);
    try{
        let product = await Product.findOne({url : req.body.url});
        if(product){
            await User.updateOne({_id : req.body.userId}, {"$push" : {"tracking_list" : {product_id : product._id, threshold_price : req.body.threshold_price}}});
            product.users.push(req.body.userId);
            await product.save();
        }else{
            let product = new Product({name : req.body.name, url : req.body.url, seller : req.body.seller});
            await User.updateOne({_id : userId}, {"$push" : {"tracking_list" : {product_id : product._id, threshold}}});
        }
        res.send(product);
    }
    catch (err) {
        console.log(err);
        // handle_product_err(err);
        res.send({ errors: err });
    }
}

//controller for checking if a product is available in tracking list or not

let verify_product = async (req, res)=>{
    console.log("came to verification");
    try{
         let product = await Product.findOne({"url" : req.body.url, "users" : req.body.userId});
         console.log(product);
         if(product){
             res.send({available : true});
         }
         else{
             res.send({available : false});
         }
    }
    catch(err){
       console.log(err);
    }
}

// controller for removing a product from tracking list

let remove_item = async (req, res)=>{
    console.log(req.body);
    try{
      await User.updateOne({_id : req.body.userId}, {"$pull" : {"tracking_list" : {"product_id" : req.body.product_id}}});
      
    }
    catch(err){
        console.log(err);
    }
}

module.exports = { get_data, add_data, verify_product, remove_item };