const User=require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const registerUser=async (req,res)=>{
    function generateApiKey(){
        return require('crypto').randomBytes(32).toString('hex')
    }
    try {
        const {username,email,password}=req.body;
        const userExist=await User.findOne({$or:[{username},{email}]})
        if(userExist){
            return res.status(400).json({message:'user is alreadfy present found',success:false})
        }
        const hashPassword=await bcrypt.hash(password,12)

        const user=new User({
            username,
            email,
            password:hashPassword,
            apiKey:generateApiKey(),
        })
        await user.save()
        const  token=jwt.sign({userId:user._id,username:user.userName,email:user.email},process.env.JWT_SECRET,{expiresIn:'24h'})

        res.status(201).json({token,user:{id:user._id,username,email},mesaage:'user successfully registered',success:true})
    } catch (error) {
        console.error('error registering user ')
        res.status(500).json({
            message:"Internal Server Error",
            success:false
        })
    }
}

const loginUser=async(req,res)=>{
    try {
        const {password,email}=req.body;
        const userExist=await User.findOne({email});
        if(!userExist){
            return res.status(400).json({message:'user is not found',success:false})
        }
        const isMatch=await bcrypt.compare(password,userExist.password)
        if(!isMatch){
            return res.status(400).json({message:'password is not correct',success:false})
        }
        const token=jwt.sign({userId:userExist._id,username:userExist.userName,email:userExist.email},process.env.JWT_SECRET,{
            expiresIn:'24h'
        })
        res.status(200).json({token,user:{id:userExist._id,username:userExist.username,email}})
    } catch (error) {
        console.error('error logging user ')
        res.status(500).json({
            message:"Internal Server Error",
            success:false
        })
    }
}

module.exports={registerUser,loginUser}