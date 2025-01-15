
const errorHandeller=(err,req,res,next)=>{
    console.error(err.stack);

    if(err.name=='ValidationError'){
        return res.status(400).json({error:err.message});
    }
    if(err.name='UnauthorizedError'){
        return res.status(400).json({error:err.message})
    }
    res.status(400).json({
        error:'something went wrong'
    })
}

module.exports=errorHandeller;