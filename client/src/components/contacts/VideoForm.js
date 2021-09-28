import React, { useContext, useState, useEffect } from 'react'
import VideoContext from '../../context/video/videoContext';

const VideoForm = () => {
    const videoContext=useContext(VideoContext);
    const {addVideo, current, clearCurrent, updateVideo}=videoContext;

    useEffect(()=>{
        if(current!==null){
            setVideo(current);
        }
        else{
            setVideo({
                name: '',
                videoId: '',
                category: ''
    
            });
        }
    },[videoContext,current]);
    const [video, setVideo] = useState({
        name: '',
        videoId: '',
        category: ''
    });

    const onChange = e =>
    setVideo({ ...video, [e.target.name]: e.target.value });

    const clearAll = () => {
        clearCurrent();
    }

    const onSubmit = e => {
        e.preventDefault();
        if(current === null){
            addVideo(video);
        }
        else{
            updateVideo(video);
        }
        clearAll();
    }
    const { name, videoId, category } = video;

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? 'Edit Video' : 'Add Video'}</h2>
            <input type="text" placeholder="name" name="name" value={name} onChange={onChange}></input>
            <input type="text" placeholder="videoId" name="videoId" value={videoId} onChange={onChange}></input>
            <input type="text" placeholder="category" name="category" value={category} onChange={onChange}></input>
           
            <div>
                <input
                    type='submit'
                    value={current ? 'Update Video' : 'Add Video'}
                    className='btn btn-primary btn-block'
                />
            </div>
            {current && <div>
                <button className="btn btn-white btn-block" onClick={clearAll}>Clear
                </button>
                </div>}
        </form>
    )
}

export default VideoForm
