require("dotenv").config();


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


let { log_signup_router } = require("./routes/log_sign_routes");
let {other_router}  = require("./routes/other_routes");


const app = express();

//environment variables 

let port = process.env.PORT;
let dbURI = process.env.dbURI;

mongoose.set('useCreateIndex', true);          // to remove deprecation warning

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(port, () => {
            console.log(`server is listening at port ${port}`);
        })
    })
    .catch(err => {
        console.log(err);
    })




app.use(express.json());         //middelware for parsing json data to javascript object
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({
        message : "Hello dev!",
        success : true
    })
})
app.use(log_signup_router);
app.use(other_router);



app.use((req, res, next)=>{
    let error = new Error('Not found');
    error.status = 404;
    next(error);
})


app.use((error, res, next)=>{
   try{
       res.status(error.status).json({message : error.message, success : false});
   }
   catch(err){
       res.status(500).json({message: err.message, success : false});
   }
})

