import React,{useContext,useEffect} from 'react'
import Videos from '../videos/Videos'
import VideoForm from '../videos/VideoForm'
import VideoFilter from '../videos/VideoFilter'
import Navbar from '../layout/Navbar'
import VideoContext from '../../context/video/videoContext'
const Home = () => {
    const videoContext=useContext(VideoContext);
    const {getVideos}=videoContext;
    useEffect(() => {
        getVideos();
    }, []);
    return (
        <div className="Home">
        
            <div>
                <VideoForm/>
            </div>
            <div className="VideoFilter">
                <VideoFilter/>
            <Videos/>
            </div>    
        
        <Navbar/>
        </div>
    )
}

export default Home
