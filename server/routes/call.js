const express=require('express')
const { getAllCalls, getCallsonID, createCallControl, updateCall } = require('../controllers/callControl')
const router=express.Router()

router.get('/',getAllCalls)
router.get('/:id',getCallsonID)
router.post('/create',createCallControl)
router.put('/status/:id',updateCall)

module.exports=router