let { Product } = require("../models/products_schema");


// controller for getting the product data a user has added

let get_data = async (req, res) => {
    console.log("hi");
    try {
        console.log(req.body);
        let user = await User.findOne({_id : req.body.userId}, {"tracking_list" : 1});
        let products = [];
        for(let i =0; i<user.tracking_list.length; i++) {
            let obj = Product.findOne({_id : user.tracking_list[i].product_id}, {"name" : 1, "url" : 1, "prices.$.last" : 1});
            products.push({
                _id : obj._id,
                name : obj.name,
                url : obj.url,
                currentPrice : obj.price,
                thresholdPrice : obj.threshold_price
            })
        }
        next(products, 200, "successfully fetched tracking list", null);
    }
    catch (err) {
        console.log(err);
        next(null, 400, "could not fetch tracking list", err.message);
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
            let product = new Product({name : req.body.name, url : req.body.url, seller : req.body.seller, prices : [{price : req.body.currentPrice, date : new Date()}]});
            await User.updateOne({_id : userId}, {"$push" : {"tracking_list" : {product_id : product._id, threshold}}});
        }
        next(true, 200, "successfully added product to tracking list", null);
    }
    catch (err) {
        console.log(err);
        next(null, 400, "could not add product to tracking list", err.message);
    }
}

//controller for checking if a product is available in tracking list or not

let verify_product = async (req, res)=>{
    console.log("came to verification");
    try{
         let product = await Product.findOne({"url" : req.body.url, "users" : req.body.userId});
         console.log(product);
         if(product){
            next({available : true}, 200, "product is available in tracking list", null);
         }
         else{
            next({available : false}, 200, "product is not available in tracking list", null);
         }
    }
    catch(err){
        next(null, 400, "could not check the availability of the product", err.message);
    }
}

// controller for removing a product from tracking list

let remove_item = async (req, res)=>{
    console.log(req.body);
    try{
      await User.updateOne({_id : req.body.userId}, {"$pull" : {"tracking_list" : {"product_id" : req.body.product_id}}});
      next(true, 200, "successfully removed product from tracking list", null);
    }
    catch(err){
        console.log(err);
        next(null, 400, "could not remove product from tracking list", err.message);
    }
}

module.exports = { get_data, add_data, verify_product, remove_item };