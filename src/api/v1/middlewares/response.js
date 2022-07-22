let send_response = (data, status, msg, error)=>{
    try{
        if(data){
            res.status(status).json({
                success : true,
                message : msg,
                data : data
            })
        }else if(error){
            res.status(status).json({
                success : false,
                message : msg,
                data : null
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