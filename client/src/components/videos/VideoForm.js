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
        <form onSubmit={onSubmit} className="VideoForm">
            <h2 className="text-primary">{current ? 'Edit' : 'Add'}</h2>
            <input type="text" placeholder="name" name="name" value={name} onChange={onChange}></input>
            <input type="text" placeholder="enter youtube video id or image link" name="videoId" value={videoId} onChange={onChange}></input>
            {/* <input type="text" placeholder="category" name="category" value={category} onChange={onChange}></input> */}
            <input
                type='radio'
                name='category'
                value='video'
                checked={category === 'video'}
                onChange={onChange}
            />{' '}
            Video{' '}
            <input
                type='radio'
                name='category'
                value='image'
                checked={category === 'image'}
                onChange={onChange}
            />{' '}
            Image
            <div>
                <input
                    type='submit'
                    value={current ? 'Update' : 'Add'}
                    className='btn btn-white btn-block'
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
