const {customApiError}=require('../error/custum-error');

const errorhandler=(err,req,res,next)=>{
    if(err instanceof customApiError)
    {
        return res.status(err.statusCode).json({msg:err.message});
    }
    return res.status(err.status).json({msg:err.message});
}

module.exports=errorhandler;