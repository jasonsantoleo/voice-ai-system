const express=require('express')
const connectDB = require('./config/db');
const helmet=require('helmet')
const cors=require('cors')
require('dotenv').config()
const authRouter=require('./routes/auth')
const callRouter=require('./routes/call')
const http=require('http')
const setupSocket=require('./services/socketService')

const app=express()
const server=http.createServer(app)
const io = setupSocket(server);
  

app.use(express.json())
// app.use(helmet())
app.use(cors({
    origin: 'http://localhost:3000',  // Allow your frontend to connect
    methods: ['GET', 'POST'],
    credentials: true  // Allow cookies and authentication headers
}));


connectDB();

app.set('io',io)

app.use('/api/auth',authRouter)
app.use('/api/call',callRouter)

app.get('/',()=>{
    console.log({message:'ther voice over api is running '});
    res.json({message:'ther voice over api is running '})
})

const PORT=process.env.PORT || 3001
server.listen(PORT,()=>{
    console.log('the app is runnnning on '+PORT);
})