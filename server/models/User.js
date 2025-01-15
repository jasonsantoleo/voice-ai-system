const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    apiKey:{type:String,required:true},
    callCredits:{type:Number,default:100}
})

const User=mongoose.model('User',userSchema)

module.exports=User