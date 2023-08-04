import React,{useContext} from 'react'
import VideoContext from  '../../context/video/videoContext';
function VideoOptions({video}) {
    const videoContext=useContext(VideoContext);
    const {deleteVideo,setCurrent, clearCurrent, setCurrentVideo}=videoContext;
    const setPlayer = () => {
        setCurrentVideo(video);
    }
    return (
        <div >
            <p className="videoOptions" onClick={setPlayer}>{video.name}</p>
        </div>
    )
}

export default VideoOptions
