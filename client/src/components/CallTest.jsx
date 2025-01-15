
import { useEffect } from 'react';
import socketService from '../services/socketServer';

const CallTest=()=>{
    useEffect(()=>{
        // connect->join->on getting somthing -> disconnect
        console.log('Attempting to connect...');
        socketService.connect();
        console.log('Joining call...');
        socketService.joinCall('test-call-id');
        socketService.onAudioRecived(({ audioData, userId })=>{
            console.log('Received audio data:', {
                from: userId,
                data: audioData,
                time: new Date().toISOString()
            });
        })
        return ()=>{
            socketService.disconnect();
        }
    },[])
    const testAudioStream=()=>{
        console.log('Testing audio stream');
        socketService.sendAudio('test-call-id','send-audio-stream')
    }
    return(
        <div>
            <h2>Call Test</h2>
            <button onClick={testAudioStream}>Test Audio Stream</button>
        </div>
    )
}

export default CallTest