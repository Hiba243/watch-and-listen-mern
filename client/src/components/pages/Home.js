import React from 'react'
import Videos from '../videos/Videos'
import VideoForm from '../videos/VideoForm'
import VideoFilter from '../videos/VideoFilter'
import Navbar from '../layout/Navbar'
const Home = () => {
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
