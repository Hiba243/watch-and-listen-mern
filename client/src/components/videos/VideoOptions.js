import React,{useContext} from 'react'
import VideoContext from  '../../context/video/videoContext';
function VideoOptions({video}) {
    const videoContext=useContext(VideoContext);
    const {deleteVideo,setCurrent, clearCurrent, setCurrentVideo}=videoContext;
    return (
        <div >
            <p className="videoOptions" onClick={() => setCurrentVideo(video.videoId)}>{video.name}</p>
        </div>
    )
}

export default VideoOptions
