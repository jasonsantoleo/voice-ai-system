const express=require('express')
const cors=require('cors')
require('dotenv').config()
const serviceRouter=require('./routes/service')

const app=express()

app.use(cors())
app.use(express.json())

app.get('/health',(req,res)=>{
    res.json({status:'ok',timestamp:new Date().toISOString()})
})
app.use('/service',serviceRouter)

app.listen(process.env.PORT || 3000,console.log(`app is listinging on ${process.env.PORT || 3000}`))