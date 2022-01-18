let { productModel } = require("../models/products_schema");


// controller for getting the product data a user has added

let get_data = async (req, res) => {
    console.log("hi");
    try {
        console.log(req.body);
        let products = await productModel.find(req.body);
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
    let product = new productModel(req.body);
    try {
        let data = await product.save()
        res.send(data);
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
         let products = await productModel.find(req.body);
         console.log(products);
         if(products.length){
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
      let a = await productModel.findByIdAndDelete(req.body.id);
      console.log(a);
      res.send(a);
    }
    catch(err){
        console.log(err);

    }
}

module.exports = { get_data, add_data, verify_product, remove_item };