const express=require('express');
const router=express.Router();
const mlservice=require('../services/MLservice');

router.post('/analyze',async (req,res)=>{
try {
    const {item}=req.body;
    console.log(item)
    if (!item.name || !item.category || !item.expiryDate){
        return res.status(400).json({message:'Please fill all the fields'})
    }
    if (isNaN(new Date(item.expiryDate).getTime())){
        return res.status(400).json({message:'date not correct'})
    }
    const analyze=await mlservice.analyzeItem(item);

    if (!analyze){
        return res.status(500).json({
            message:"failed to analze"
        })
    }
    res.json({analyze,success:true})
} catch (error) {
    console.error(error);
    return res.status(500).json({message:"failed to analze"})
}
})

module.exports=router