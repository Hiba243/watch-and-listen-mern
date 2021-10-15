import React, {useContext} from 'react'
import VideoContext from  '../../context/video/videoContext';

const VideoItem = ({ video }) => {
    const videoContext=useContext(VideoContext);
    const {deleteVideo,setCurrent, clearCurrent, setCurrentVideo}=videoContext;
    const { _id, name, videoId, category } = video;
    const onDelete = () => {
        console.log(
            "here"
        )
        deleteVideo(_id);
        clearCurrent();
    }
    return (
        <div className="card bg-light">
            <h3 className="text-left">{name}{' '}</h3>
            <ul className="list">
                {category && (<li>{category}
                </li>)}
            </ul>
            <button className="btn btn-dark btn-sm" onClick={()=>setCurrent(video)}>Edit</button>
            <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
        </div>
    )
}

export default VideoItem
