import React, { useContext, useRef, useEffect } from 'react'
import VideoContext from '../../context/video/videoContext';
const VideoFilter = () => {
    const videoContext = useContext(VideoContext);

    const text = useRef('');

    const { filterVideos, clearFilter, filtered } = videoContext;

    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
    });

    const onChange = e => {
        if (text.current.value !== '') {
            filterVideos(e.target.value);
        } else {
            clearFilter();
        }
    };

    return (
        <form>
            <input
                ref={text}
                type='text'
                placeholder='Filter...'
                onChange={onChange}
            />
        </form>
    );
};

export default VideoFilter
