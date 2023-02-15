const axios = require('axios');
const cheerio = require('cheerio');
const { User, Product } = require('../models');
let send_mail = require('./nodemailer');


let fetch_markup = async (url)=>{
    try{
        let html = await axios.get(url);
        let markup = cheerio.load(html.data);
        return markup;
    }
    catch(err){
        console.log(err.message);
    }
}


let find_price = (price_str)=>{
    try{
        if(price_str === undefined || price_str === "unavailable"){
            return null;
        }else{
            return Math.floor(parseFloat(price_str.substr(1).replaceAll(",", "")));
        }
    }
    catch(err){
        console.log(err.message);
    }
}


let find_price_str = (seller, markup) => {
    try{
        let price_str;
        if (seller === 'flipkart') {
            price_str = markup('._30jeq3').html();
        } else if (seller === 'amazon') {
            price_str = markup('.a-offscreen').html();
        }
        return price_str;
    }
    catch(err){
        console.log(err.message);
    }
}


let find_target_users_and_send_mails = async (product, price)=>{
    try{
        let users = await User.find({_id : {"$in" : product.users}, "tracking_list" : {"$elemMatch" : {"product_id" : product._id, "threshold_price" : {"$gte" : price}}}}, {"email" : 1});
        for(let i =0; i<users.length; i++){ 
            let subject = `Price decreased on product ${product.name}`;
            let html = `Hi, <br> Price of the product <a href = ${product.url}>${product.name}</a> has gone below the threshold value set by you. <br> Current Price : ${price} <br><br> Thanks & Regards <br> Price Tracker Support`;
            await send_mail(process.env.sender_email, users[i].email, subject, html);
        }
    }
    catch(err){
        console.log(err.message);
    }
}

function isNumeric(str) {
    if (typeof str == "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }



let is_job_running = false;

async function check_price() {
    try {
        if(!is_job_running){
            is_job_running = true;
            console.log("hi every 10th minute");
            let products = await Product.find({});
            let productCount = products.length;
            for (let i = 0; i < productCount; i++) {
                let product = products[i];
                console.log(`checking price for product : ${product.name}`);
                let markup = await fetch_markup(product.url);
                let price_str = find_price_str(product.seller, markup);
                console.log(price_str);
                let price = find_price(price_str);
                console.log(price);
                
                if(isNumeric(price)){
                    console.log("hi");
                    let len = product.prices.length;
                    if(len >0 && price < product.prices[len-1].price){
                        console.log(`price decreased for product id : ${product._id}`);
                        await find_target_users_and_send_mails(product, price);
                    }
                    if(len == 0 || price != product.prices[len-1].price) {
                        await Product.updateOne({_id : product._id}, {'$push' : {"prices" : {price : price, date : new Date()}}});
                    }
                }
                console.log(`done for product ${product.name}`);
            }
            is_job_running = false;
        }
    }
    catch (err) {
        console.log(err.message);
        is_job_running = false;
    }
};


setInterval(check_price, 300000);
