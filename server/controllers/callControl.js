const mongoose=require('mongoose')
const Call = require('../models/Call')

const createCallControl=async(req,res)=>{
    const {userId,customerPhone,notes}=req.body
    try {
        const call=new Call({
            userId:userId,
            customerPhone:customerPhone,
            notes:notes,
            startTime:Date.now()
        })
        await call.save()
        res.status(200).json({
            message:"Call created successfully",
            success:true
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}
const getAllCalls=async(req,res)=>{
    try {
        const getAllCalls=await Call.find({userId:req.body.userId})
        console.log(req.userId)
        res.json(getAllCalls)
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })       
    }
}
const getCallsonID=async(req,res)=>{
    try {
        console.log(req.params.id)
        const getcall=await Call.findById({_id:req.params.id})
        if(!getcall){
            return res.status(404).json({
                message:"Call not found",
                success:false
            })
        }
        res.status(200).json(getcall)
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })       
    }
}
const updateCall=async(req,res)=>{
    try {
        console.log(req.params.id)
        const getCall=await Call.findOne({_id:req.params.id})
        if(!getCall){
            return res.status(404).json({
                message:"Call not found",
                success:false
            })
        }
        getCall.status=req.body.status;
        if(req.body.status=='Completed'){
            getCall.endTime=Date.now()
            getCall.duration=Math.floor((getCall.endTime-getCall.startTime)/1000) //converting milli second to seconds
        }
        await getCall.save()
        res.status(200).json({
            message:'call Updated',
            success:true,
            call:getCall
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })              
    }
}

module.exports={createCallControl,getAllCalls,getCallsonID,updateCall}