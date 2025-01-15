// ./server/service/socketService.js
const socketIO=require('socket.io')

const setupSocket=(server)=>{
    const io=socketIO(server,{
        cors:{
            origin:'http://localhost:3000',
            methods:['GET','POST'],
            credentials:true
        }
    })
    const activeCall=new Map();

    io.on('connection',(socket)=>{
        console.log('Client connected',socket.id);

        socket.on('join-call',({userId,callId})=>{
            //join the socket
            //store to call session 
            // let others know that you are in the call
            socket.join(callId);
            activeCall.set(callId,{
                userId,
                socketId:socket.id,
                startTime:Date.now()
            })
            socket.to(callId).emit('user-joined',{userId})
            console.log(`user ${userId} joined call having ${callId}`);
            
        })
        socket.on('audio-stream',({callId,audioData})=>{
            //get the call session data for the user 
            // check if call session exist 
                // if exist let others know the audio is recived
            const callSession=activeCall.get(callId);
            if (callSession){
                socket.to(callId).emit('audio-recived',{
                    audioData,
                    userId:callSession.userId
                })
            }
        })
        socket.on('end-call',({callId})=>{
            // check if callsession is there 
                // if there let others know that the user is ending 
                // delete it from active calls 
            const callSession=activeCall.get(callId)
            if (callSession){
                socket.to(callId).emit('call-ended',{callId})
                activeCall.delete(callId)
            }
        })
        // handelling disconnects 
        socket.on('disconnect',()=>{
            // loop through activecalls 
            // if call is found with the given soket id
                // make user leave and delete 
            for (const [callId,session] of activeCall.entries()){
                if (session.socketId==socket.id){
                    socket.to(userId).emit('user-disconnected',{userId:session.userId})
                    activeCall.delete(callId)
                }
            }
        })
        socket.on('error',()=>{
            socket.emit('error',{message:'Internal server error'})
        })
    })
    return io;
}

module.exports=setupSocket;