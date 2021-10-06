import React, { useContext, useEffect,useState } from 'react';
import YouTube from 'react-youtube';
import VideoContext from '../../context/video/videoContext';
import VideoOptions from './VideoOptions';

function VideoPlayer() {
    const [currentVideo, setCurrentVideo]=useState('');
    const _onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }
    const videoContext = useContext(VideoContext);

    const { videos, filtered, getVideos, loading } = videoContext;

    useEffect(() => {
        getVideos();
        
        setCurrentVideo(localStorage.getItem('Video')); console.log(currentVideo);
        // eslint-disable-next-line
    }, [localStorage.getItem('Video')]);

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            'autoplay': 0,
            'controls': 0,
            'rel': 0,
            'fs': 0,
        },
    };

    return <div className="VideoPlayer">
        {localStorage.getItem('Type')=="video" ? <YouTube videoId={localStorage.getItem('Video')} opts={opts}/> : <p>hello</p>}
        <div className="videoOptionsFlex">
        {videos !== null && !loading && videos.map(video => (
                
                <VideoOptions video={video}  key={video._id}/>             
            ))}
        </div>
    </div>
}

export default VideoPlayer
