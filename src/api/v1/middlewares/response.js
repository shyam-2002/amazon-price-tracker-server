let send_response = (data, status, msg, error)=>{
    try{
        if(error === null){
            res.status(status).json({
                success : true,
                message : msg,
                error : null,
                data : data
            })
        }else{
            res.status(status).json({
                success : false,
                message : msg,
                error : error,
                data : data
            })
        }
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}


module.exports = {send_response}