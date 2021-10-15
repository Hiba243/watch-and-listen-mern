import React, { useContext, useState, useEffect } from 'react'
import VideoContext from '../../context/video/videoContext';
import AlertContext from '../../context/alert/alertContext';
const VideoForm = () => {
    const videoContext=useContext(VideoContext);
    const alertContext=useContext(AlertContext);
    const {addVideo, current, clearCurrent, updateVideo}=videoContext;
    const{setAlert}=alertContext;
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
    },[current]);
    const [video, setVideo] = useState({
        name: '',
        videoId: '',
        category: ''
       
    });

    const onChange = e =>{
        setVideo({ ...video, [e.target.name]: e.target.value });
    }

    const clearAll = () => {
        clearCurrent();
    }

    const onSubmit = e => {
        e.preventDefault();
        if(current === null){
            if(!name){
                setAlert("please enter a name","danger")
            }
            if(!videoId){
                setAlert("please enter a youtube url or image url","danger")
            }
            if(!category){
                setAlert("please select a category","danger")
            }
            if(category=='video'){
                var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                    var match = videoId.match(regExp);
                    if (match && match[2].length == 11) {
                        let s=match[2];
                        let vid = { ...video };
                        vid.videoId=s;
                        addVideo(vid);
                    } else {
                        setVideo({ ...video, videoId: '' });
                        setAlert("please enter a valid youtube url","danger");
                    }
            }
            else{
                console.log(video);
            addVideo(video);
            }
        }
        else{
            if(!name){
                setAlert("please enter a title","danger")
            }
            if(!videoId){
                setAlert("please enter a youtube url or image url","danger")
            }
            if(!category){
                setAlert("please select a category","danger")
            }
            updateVideo(video);
        }
        clearAll();
        setVideo({
            name: '',
            videoId: '',
            category: ''
           
        });
    }
    const { name, videoId, category } = video;
    return (
        <form onSubmit={onSubmit} className="VideoForm">
            <h2 className="text-primary">{current ? 'Edit' : 'Add'}</h2>
            <input type="text" placeholder="title" name="name" value={name} onChange={onChange}></input>
            <input type="text" placeholder="enter youtube url or image url" name="videoId" value={videoId} onChange={onChange}></input>
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
