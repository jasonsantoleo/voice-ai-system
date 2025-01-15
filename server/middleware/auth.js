const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{
    try {
        const token=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()
    } catch (error) {
        res.status(404).json({error:'Auth Fail'})
    }
}

module.exports=auth;