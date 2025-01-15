// client/services/socketServer
import io from 'socket.io-client'

class socketService{
    constructor(){
        this.socket=null;
    }
    connect(){
        this.socket=io('http://localhost:3001',{
            credentials:true,
            reconnection: true, // Enable automatic reconnection
            reconnectionAttempts: 5, // Limit reconnection attempts
            reconnectionDelay: 1000, // Delay between attempts
        });
        console.log('Socket connection established:', this.socket.connected);

        this.socket.on('connect',()=>{
            console.log('connected to the server');
        })
        this.socket.on('error',()=>{
            console.log('error connecting the server');
        })
    }
    joinCall(callId,userId){
        if(this.socket){
            this.socket.emit('join-call',{callId,userId})
        }
    }
    sendAudio(callId,audioData){
        if(this.socket){
            this.socket.emit('audio-stream',{callId,audioData})
        }
    }
    endCall(callId){
        if(this.socket){
            this.socket.emit('end-call',{callId})
        }
    }
    onAudioRecived(callback){
        if(this.socket){
            this.socket.on('audio-received', callback);
        }
    }
    onCallEnded(callback){
        if(this.socket){
            this.socket.on('call-ended',callback)
        }
    }
    disconnect(){
        if(this.socket){
            this.socket.disconnect()
        }
    }
}
const socketInstance=new socketService();
export default socketInstance