import React, { useContext, useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import VideoContext from '../../context/video/videoContext';
import VideoOptions from './VideoOptions';
import Navbar from '../layout/Navbar';
function VideoPlayer() {
    const [currentVideo, setCurrentVideo] = useState('');
    const [currentType, setCurrentType] = useState('');
    const _onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }
    const videoContext = useContext(VideoContext);

    const { videos, filtered, getVideos, loading,images } = videoContext;

    useEffect(() => {
        getVideos();

        setCurrentVideo(localStorage.getItem('Video')); 
        setCurrentType(localStorage.getItem('Type')); 
        // eslint-disable-next-line
    }, [localStorage.getItem('Type')]);

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
        {localStorage.getItem('Type') == "video" ? <YouTube videoId={localStorage.getItem('Video')} opts={opts} /> : <img src={localStorage.getItem('Video')} alt="myimg" className="img-format"></img>}
        <div className="videoOptionsFlex">
            <div className="sidebar">
                <Navbar />
                <div className="scroll">
                    {videos !== null && !loading && videos.map(video => (

                        <VideoOptions video={video} key={video._id} />
                    ))}
                </div>
                <div className="scroll">
                    {images !== null && !loading && images.map(video => (

                        <VideoOptions video={video} key={video._id} />
                    ))}
                </div>
            </div>

        </div>

    </div>
}

export default VideoPlayer
