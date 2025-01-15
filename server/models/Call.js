const mongoose=require('mongoose')

const callScheema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    customerPhone:{
        type:String,
        required:true,
        validate:{
            validator:function(v){
                return /^\d{10}$/.test(v)
            },
            message:props=>`${props.value} is not a valid phone number `
        }
    },
    status:{
        type:String,
        enum:['completed','pending','active','failed'],
        default:'pending'
    },
    duration:{
        type:Number,
        default:0
    },
    notes:{
        type:String,
    },
    startTime:{
        type:Date,
    },
    endTime:{
        type:Date,
    }
},{timestamps:true})

const Call=mongoose.model('Call',callScheema)

module.exports=Call