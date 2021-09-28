import React from 'react'
import Videos from '../videos/Videos'
import VideoForm from '../videos/VideoForm'
import VideoFilter from '../videos/VideoFilter'
const Home = () => {
    return (
        <div className="grid-2">
            <div>
                <VideoForm/>
            </div>
            <div>
                <VideoFilter/>
            <Videos/>
            </div>    
        </div>
    )
}

export default Home
