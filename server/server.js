const express=require('express')
const connectDB = require('./config/db');
const helmet=require('helmet')
const cors=require('cors')
require('dotenv').config()

const app=express()

app.use(express.json())
app.use(helmet())
app.use(cors())

connectDB();

app.get('/',()=>{
    console.log({message:'ther voice over api is running '});
})

let PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log('the app is runnnning on '+PORT);
})